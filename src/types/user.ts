export interface User {
    id: number
    username: string
    email: string
    isAdmin: boolean
}

export interface UserLogin {
    username: string
}