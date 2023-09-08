export interface INewsParams {
    apikey: string
    sortBy: string
    from: string
    to: string
    language: string
    pageSize: number
    page: number
}


export type INews = {
    articles: {
        content: string
        description: string
        title: string
        url: string
        urlToImage: string
    }[]
}

export type NewsData = {
    content: string
    description: string
    title: string
    url: string
    urlToImage: string
}[]