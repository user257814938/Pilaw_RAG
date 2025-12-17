"use client";

import { useState, useRef, useEffect } from "react";
// Using simple unicode character if lucide is not desired, but user likely has it. 
// Reverting to simple Emoji/Text to minimize dependency issues unless confirmed.
// Actually, earlier files used lucide-react. I'll use it for a polished look if possible, otherwise emoji.
// Let's stick to text/emoji for "Simple interface" to avoid "Module not found" if I'm unlucky, 
// but wait, I installed sonner earlier, likely lucide is there too.
// I'll check package.json first? No, let's just use text/emoji for maximum safety and simplicity as requested.
// "📎" is perfect.

export default function Home() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // Optimistic message
    setMessages(prev => [...prev, { role: "assistant", content: `📂 Uploading ${file.name}...` }]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/ingestion_unstructured", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      setMessages(prev => {
        const newMsgs = [...prev];
        // Replace last "Uploading..." message or add new one
        newMsgs[newMsgs.length - 1] = {
          role: "assistant",
          content: `✅ File "${file.name}" uploaded and indexed successfully.`
        };
        return newMsgs;
      });

    } catch (error) {
      console.error("Upload error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: `❌ Error uploading file: ${file.name}` }]);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user" as const, content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/llm_ai-gateway/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: "openai/gpt-4o",
          webSearch: false,
        }),
      });

      if (!response.ok) throw new Error("API call failed");
      if (!response.body) return;

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      // Initialize assistant message
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const dataStr = line.slice(6).trim();
            if (dataStr === "[DONE]") continue;

            try {
              const data = JSON.parse(dataStr);

              if (data.type === "text-delta" && data.delta) {
                setMessages((prev) => {
                  const newMessages = [...prev];
                  const lastIndex = newMessages.length - 1;
                  const lastMsg = { ...newMessages[lastIndex] };
                  if (lastMsg.role === "assistant") {
                    lastMsg.content += data.delta;
                    newMessages[lastIndex] = lastMsg;
                  }
                  return newMessages;
                });
              }
            } catch (e) {
              // Skip invalid JSON or markers
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "Error: Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4 dark:bg-zinc-900">
      <div className="w-full max-w-3xl flex flex-col h-[800px] bg-white rounded-xl shadow-xl overflow-hidden dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700">

        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Simple Chat + Upload</h1>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
          {messages.length === 0 && (
            <div className="flex h-full items-center justify-center text-gray-400 flex-col gap-2">
              <p>Type a message to start chatting...</p>
              <p className="text-sm">Or upload a document to ask questions about it.</p>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 ${msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 rounded-bl-none"
                  }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}

          {loading && messages[messages.length - 1]?.role === "user" && (
            <div className="flex justify-start">
              <div className="bg-gray-200 dark:bg-zinc-700 rounded-2xl px-4 py-2 rounded-bl-none">
                <span className="animate-pulse">Thinking...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
          <form onSubmit={handleSubmit} className="flex gap-2 items-center">

            {/* File Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || loading}
              className="p-3 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 rounded-lg text-gray-600 dark:text-gray-200 transition-colors disabled:opacity-50"
              title="Upload file"
            >
              {uploading ? "⏳" : "📎"}
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,.txt,.md,.docx"
            />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-600 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
