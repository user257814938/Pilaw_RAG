
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim().replace(/^"|"$/g, '');
    }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyPDFContent() {
    console.log("--- Verifying PDF Content in Supabase ---");

    // Search for documents with the PDF filename in metadata
    // Note: metadata is a JSONB column. We'll search for the filename inside it.
    // The filename was "A_Chronological_Overview_of_ Artificial_Intelligence.pdf" based on user logs
    // But specific UUID prefix might vary. We'll use ILIKE on the cast text of metadata.

    // Attempt 1: Fetch all and filter (safest for small chunk counts)
    const { data: rows, error } = await supabase
        .from('documents')
        .select('id, content, metadata');

    if (error) {
        console.error("Error fetching documents:", error);
        return;
    }

    const pdfChunks = rows.filter(r => {
        const meta = r.metadata || {};
        const filename = meta.filename || "";
        return filename.includes("Artificial_Intelligence.pdf");
    });

    if (pdfChunks.length === 0) {
        console.log("No chunks found for the AI PDF.");
        console.log("Found other files:", [...new Set(rows.map(r => r.metadata?.filename))]);
        return;
    }

    console.log(`Found ${pdfChunks.length} chunks for the PDF.`);

    // Use Unstructured metadata to sort chunks properly
    // Note: chunk indexes are sometimes available or page numbers
    pdfChunks.sort((a, b) => {
        // Simple sort by page number, then by checking if one is a continuation of another?
        // Unstructured provides 'parent_id' or simply relies on order.
        // We will try sorting by page number.
        const pA = a.metadata.page_number || 0;
        const pB = b.metadata.page_number || 0;
        return pA - pB;
    });

    let fullText = "";
    console.log(`\n\n--- DUMPING FULL TEXT (${pdfChunks.length} chunks) ---`);
    pdfChunks.forEach((chunk, i) => {
        console.log(`\n>>> CHUNK ${i + 1} (Page ${chunk.metadata.page_number}, Type: ${chunk.metadata.category})`);
        console.log(chunk.content);
        fullText += chunk.content;
    });

    console.log(`\n\n--- END OF TEXT ---`);
    console.log(`Total Length: ${fullText.length} characters.`);

    // Check for gaps (heuristic)
    // If pages are 1, 2, 4... we verify
}

verifyPDFContent();
