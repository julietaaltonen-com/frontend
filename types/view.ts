export type View = {
    id: number
    attributes: {
        title: string
        url: string
        images: ImageType[]
    }
}

export type ImageType = {
    id: number
    title?: string
    description?: string
    year?: string
    size?: {
        width?: number
        height?: number
    }
    image: {
        data: {
            attributes: {
                url: string
                alternativeText?: string
                width: number
                height: number
                hash: string
                ext: string
                formats: {
                    thumbnail: {
                        url: string
                        alternativeText?: string
                        width: number
                        height: number
                        hash: string
                        ext: string
                    }
                }
            }
        }
    }
}
