export type CartItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};


export type CartState = {
    totalPrice: number;
    items: CartItemType[];
}