export interface PostModel { 
    _id?: string;
    title: string;
    imageUrl: string;
    description: string;
    price: number;
    type: string;
    owner?: object;
    boughtBy?: any;
}
