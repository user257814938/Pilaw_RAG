import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h2 className="text-2xl font-bold">Page Non Trouvée</h2>
            <p className="mb-4">Impossible de trouver la ressource demandée.</p>
            <Link href="/" className="text-blue-500 hover:underline">
                Retour à l'accueil
            </Link>
        </div>
    )
}
