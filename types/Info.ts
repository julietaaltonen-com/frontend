export type Info = {
    bio: string
    exhibitions: Event[]
    awards: Award[]
    collections: Collection[]
}

export type Event = {
    name: string
    location: string
    startDate: string
    endDate?: string
}

export type Award = {
    name: string
}

export type Collection = {
    name: string
}