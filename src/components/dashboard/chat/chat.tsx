"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner"
import { nanoid } from "nanoid";

export default function Chat() {
    const [messages, setMessages] = useState<any[]>([
        { role: "assistant", content: "Hello! I am Pilaw, your global assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || loading) return;

        const userMessage = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const response = await fetch("/api/llm_ai-gateway/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: [...messages, userMessage] }),
            });

            if (!response.body) throw new Error("No response body");

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantMessage = { role: "assistant", content: "" };

            setMessages((prev) => [...prev, assistantMessage]);

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                assistantMessage.content += chunk;

                setMessages((prev) => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = { ...assistantMessage };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Chat error:", error);
            toast.error("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            console.log("🚀 Starting upload for:", file.name);
            const response = await fetch("/api/ingestion_unstructured", {
                method: "POST",
                body: formData,
            });

            console.log("📡 Response status:", response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("❌ Upload failed:", errorText);
                throw new Error("Upload failed: " + errorText);
            }

            const data = await response.json();
            console.log("✅ Upload success, data:", data);
            toast.success(`File uploaded: ${file.name}`);
            console.log("Indexed documents:", data.documents);

            // Add system message about upload
            setMessages(prev => [...prev, {
                role: "assistant",
                content: `✅ I have processed the file "${file.name}". You can now ask questions about it!`
            }]);

        } catch (error) {
            console.error("Upload error:", error);
            toast.error("Failed to upload file");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50 dark:bg-zinc-900 text-gray-900 dark:text-gray-100 font-sans">

            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                        P
                    </div>
                    <h1 className="text-xl font-bold tracking-tight">Pilaw Chat</h1>
                </div>
                <div className="text-xs text-gray-500">v1.0 • RAG Enabled</div>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
                <div className="max-w-3xl mx-auto space-y-6">

                    {messages.length === 0 && (
                        <div className="text-center text-gray-400 mt-20">
                            <p className="text-6xl mb-4">👋</p>
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
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area */}
            <footer className="p-4 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <div className="max-w-3xl mx-auto">
                    <form onSubmit={handleSubmit} className="flex gap-3 items-end">

                        {/* File Upload */}
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading || loading}
                            className="p-3 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-xl text-gray-500 transition-colors disabled:opacity-50"
                            title="Upload file (PDF, Docs, Images)"
                        >
                            {uploading ? (
                                <span className="animate-spin block">⏳</span>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                                </svg>
                            )}
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileUpload}
                            accept=".pdf,.doc,.docx,.txt,.md,.odt,.rtf,.csv,.xls,.xlsx,.tsv,.ppt,.pptx,.html,.epub,.eml,.msg,.jpg,.jpeg,.png,.bmp,.tiff,.heic,.mp3,.wav,.m4a"
                        />

                        {/* Text Input */}
                        <div className="flex-1 bg-gray-100 dark:bg-zinc-800 rounded-xl flex items-center px-4 py-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask anything..."
                                className="w-full bg-transparent border-none focus:ring-0 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
                                disabled={loading}
                            />
                        </div>

                        {/* Send Button */}
                        <button
                            type="submit"
                            disabled={!input.trim() || loading}
                            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all disabled:opacity-50 disabled:shadow-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                            </svg>
                        </button>
                    </form>

                    <div className="text-center mt-2">
                        <p className="text-xs text-gray-400">Supported: Docs, Tables, Slides, Images</p>
                    </div>
                </div>
            </footer>

        </div>
    );
}
