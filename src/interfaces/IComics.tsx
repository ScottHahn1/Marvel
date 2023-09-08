export interface ComicParams {
    apikey: string | undefined,
    ts: string,
    hash: string,
    offset?: number
    orderBy?: string
}

export type ComicsData = {
    data: {
        count: number
        offset: number
        results: { 
            name: string
            id: number
            description: string
            thumbnail: {
                path: string
                extension: string
            }
            startYear: number
            start: number
            pageCount: number
            title: string
            dates: {
                type: string
                date: string
            }[]
        }[]
    } 
}

export type ComicDetails = {
    name: string
    id: number
    description: string
    thumbnail: {
        path: string
        extension: string
    }
    startYear: number
    start: number
    pageCount: number
    title: string
    dates: {
        type: string
        date: string
    }[]
}[]