export interface Iuser {
    _id?: string;
    email: string;
    username: string;
    password: string;
    accessToken?: string;
    basket?: [object];
}
