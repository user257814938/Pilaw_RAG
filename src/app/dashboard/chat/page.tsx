import Chat from '@/components/dashboard/chat/chat';

export default function ChatPage() {
    return (
        <div className="h-full flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">Assistant Juridique</h1>
            <div className="flex-1 border rounded-lg bg-white dark:bg-neutral-900 overflow-hidden shadow-sm">
                <Chat />
            </div>
        </div>
    )
}
