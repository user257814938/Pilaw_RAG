import { supabaseAdmin } from "./admin";
import { v4 as uuidv4 } from "uuid";

/**
 * Upload un fichier dans le bucket Supabase Storage
 * @param file Le fichier (Buffer ou File)
 * @param fileName Le nom original du fichier
 * @param userId L'ID de l'utilisateur (pour organiser les dossiers)
 */
export async function uploadFileToStorage(
    file: File | Blob,
    fileName: string,
    userId: string
) {
    // On nettoie le nom de fichier (enlève les caractères spéciaux)
    const sanitizedName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");

    // On crée un chemin unique : userId/uuid-nom_fichier
    const path = `${userId}/${uuidv4()}-${sanitizedName}`;

    const { data, error } = await supabaseAdmin.storage
        .from("user_uploads")
        .upload(path, file, {
            contentType: file.type,
            upsert: false,
        });

    if (error) {
        console.error("Erreur Upload Supabase:", error);
        throw new Error("Impossible d'uploader le fichier.");
    }

    return { path, fullPath: data.path };
}

/**
 * Récupère l'URL signée (temporaire) pour télécharger un fichier
 */
export async function getFileUrl(path: string) {
    const { data, error } = await supabaseAdmin.storage
        .from("user_uploads")
        .createSignedUrl(path, 60 * 60); // Valide 1 heure

    if (error) {
        throw new Error("Impossible de générer l'URL du fichier.");
    }

    return data.signedUrl;
}
