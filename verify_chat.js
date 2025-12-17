
// Verification script for Chat API
const run = async () => {
    try {
        console.log("Sending request to http://localhost:3000/api/llm_ai-gateway/chat...");

        // Use native fetch (Node 18+)
        const response = await fetch('http://localhost:3000/api/llm_ai-gateway/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [{ role: 'user', content: 'De quoi parle ce document ?' }],
                model: 'openai/gpt-4o',
                webSearch: false
            })
        });

        console.log('Response Status:', response.status);

        if (!response.ok) {
            const errText = await response.text();
            console.error('Error Body:', errText);
            return;
        }

        // Handle stream
        // specific to Node.js implementation of fetch stream
        for await (const chunk of response.body) {
            process.stdout.write(new TextDecoder().decode(chunk));
        }
        console.log("\nDone.");

    } catch (error) {
        console.error("Test execution failed:", error);
    }
};

run();
