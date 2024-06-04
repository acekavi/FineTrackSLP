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

export interface User {
    username: string;
    role: string;
}


export interface Citizen extends User {
    // Citizen-specific properties
    NIC: string;
    mobile: number;
    earned_score?: number;
}

export interface Officer extends User {
    // Officer-specific properties
    officer_ID: number;
    station_ID: string;
}

export interface Station extends User {
    // Station-specific properties
    station_ID: string;
    location: string;
}