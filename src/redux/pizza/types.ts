export type SearchParamsType ={
    order:string
    sortBy:string
    category:string
    search:string
    currentPage: number
}


export type PizzaType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

export type CartState = {
    items: PizzaType[];
    status: Status
}