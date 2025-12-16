'use client';

import { FileUpload } from "@/components/dashboard/file_uploader/file_uploader";

export default function FileUploaderPage() {
    return (
        <div className="flex h-full flex-col items-center justify-center p-8">
            <h1 className="mb-8 text-2xl font-bold">Upload Documents</h1>
            <div className="w-full max-w-4xl border border-dashed border-neutral-200 dark:border-neutral-800 rounded-lg p-8">
                <FileUpload onChange={(files) => console.log(files)} />
            </div>
        </div>
    );
}
