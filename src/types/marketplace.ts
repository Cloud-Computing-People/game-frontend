export interface Item {
    id: number;
    name: string;
    price: number;
    imgURL: string;
    availableFrom: Date;
    availableTo: Date;
    transferable: boolean;
}
