import { useEffect, useState } from "react"

export default function useImagePreview(watchImage: FileList) {
    const [preview, setPreview] = useState<string | null>(null)
    useEffect(() => {
        if (watchImage && watchImage[0]) {
            const objectUrl = URL.createObjectURL(watchImage[0])
            setPreview(objectUrl)

            // Limpa a URL criada para evitar vazamento de memória
            return () => URL.revokeObjectURL(objectUrl)
        } else {
            setPreview(null)
        }
    }, [watchImage])

    return preview
}