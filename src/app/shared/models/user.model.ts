export interface User {
    name?: string;
    username: string;
    password: string;
}

export interface UserResponse {
    status: string;
    token: string;
    data: User;
}
