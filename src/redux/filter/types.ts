export type FilterStateType = {
    searchValue: string
    currentPage: number
    categoryIndex: number
    sort: SortType
}

export type SortType ={
    name: 'popularity (DESC)'
        | 'popularity (ASC)'
        | 'price (DESC)'
        | 'price  (ASC)'
        | 'alphabet (DESC)'
        | 'alphabet (ASC)'
    sortProperty: 'rating'
        | '-rating'
        | 'price'
        | '-price'
        | 'title'
        | '-title'
}