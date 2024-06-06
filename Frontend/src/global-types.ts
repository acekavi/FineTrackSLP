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
    NIC: NIC;
    mobile: number;
    earned_score?: number;
}

export interface Officer extends User {
    // Officer-specific properties
    NIC: NIC;
    officer_ID: number;
    station_ID: string;
}

export interface Station extends User {
    // Station-specific properties
    station_ID: string;
    location: string;
}

export interface NIC {
    id_number: string;
    firstname: string;
    middlename: string;
    surname: string;
    DOB: Date;
    gender: string;
    add_1: string;
    add_2: string;
    add_3: string;
}

export interface NICResponse {
    NIC: NIC;
}

export interface LicenceResponse extends NICResponse {
    licence_number: string;
    expire_date: Date;
}