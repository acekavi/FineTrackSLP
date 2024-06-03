export interface Citizen {
    NIC: string;
    mobile: number;
    username: string;
    earned_score?: number;
}

export interface CustomJWTpayload {
    username: string;
    role: string;
    iat: number;
    exp: number;
}

export interface MessageResponse {
    message: string;
}

export interface LoginResponse extends MessageResponse {
    token: string;
}