export interface IUser {
    _id: string
    username: String;
    password: String;
    roles: String[];
}

export interface IUserRole {
    value: String
}
