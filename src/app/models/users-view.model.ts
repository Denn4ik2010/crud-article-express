export type UserViewModel = {
    _id: string;
    username: String;
    roles: String[];
};

export type RegisterModel = {message: string};
export type LoginUserModel = { token: string } | { message: string };
