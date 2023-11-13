export type FilterStateType = {
    searchValue: string
    currentPage: number
    categoryIndex: number
    sort: SortType
}

export type SortType ={
    name: 'популярности (DESC)'
        | 'популярности (ASC)'
        | 'цене (DESC)'
        | 'цене  (ASC)'
        | 'алфавиту (DESC)'
        | 'алфавиту (ASC)'
    sortProperty: 'rating'
        | '-rating'
        | 'price'
        | '-price'
        | 'title'
        | '-title'
}