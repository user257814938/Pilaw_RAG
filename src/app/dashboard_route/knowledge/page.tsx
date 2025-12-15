export default function KnowledgePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Base de Connaissance</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded bg-white dark:bg-neutral-800">
                    <h3 className="font-semibold mb-2">Connecteurs (Nango)</h3>
                    {/* TODO: List Connectors */}
                </div>
                <div className="p-4 border rounded bg-white dark:bg-neutral-800">
                    <h3 className="font-semibold mb-2">Fichiers Uploadés</h3>
                    {/* TODO: File Upload & List */}
                </div>
            </div>
        </div>
    )
}
