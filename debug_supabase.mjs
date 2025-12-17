
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

async function checkSupabase() {
    console.log("Checking Supabase...");
    console.log(`URL: ${supabaseUrl}`);

    // 1. Check Storage Bucket 'user_uploads'
    console.log("\n--- Storage: user_uploads ---");
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    if (bucketError) console.error("Error listing buckets:", bucketError);
    else {
        const bucket = buckets.find(b => b.name === 'user_uploads');
        if (!bucket) console.error("Bucket 'user_uploads' NOT FOUND.");
        else {
            console.log("Bucket 'user_uploads' exists.");
            // List files in the bucket (root)
            const { data: files, error: filesError } = await supabase.storage.from('user_uploads').list('user_123'); // Assuming default folder from route.ts
            if (filesError) console.error("Error listing files:", filesError);
            else {
                console.log(`Found ${files.length} files in 'user_123' folder:`);
                files.forEach(f => console.log(` - ${f.name} (${f.metadata.mimetype})`));
            }
        }
    }

    // 2. Check Table 'documents'
    console.log("\n--- Table: documents ---");
    const { count, error: tableError } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true });

    if (tableError) console.error("Error checking 'documents' table:", tableError);
    else console.log(`Total rows in 'documents': ${count}`);

    // 3. Check specific document content
    const { data: dbRows } = await supabase.from('documents').select('id, metadata').limit(3);
    if (dbRows) {
        console.log("Sample rows metadata:");
        dbRows.forEach(r => console.log(JSON.stringify(r.metadata)));
    }

}

checkSupabase();
