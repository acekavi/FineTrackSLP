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

export interface Citizen {
    nicNumber: string;
    mobile: string;
    username: string;
    password: string;
    earnedScore: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface NIC {
    idNumber: string;
    firstName: string;
    middleName: string;
    surname: string;
    dob: Date;
    gender: 'Male' | 'Female' | 'Other';
    address1: string;
    address2: string;
    address3: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface DrLicence {
    licenceNumber: string;
    expiryDate: Date;
    nicNumber: string;
    spectaclesNeeded: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Evidence {
    fineId: number;
    evidenceLink: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Feedback {
    NIC: Citizen;
    feedback: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface FineRecord {
    fineId: number;
    NIC: Citizen;
    fineDescription?: string;
    totalFine: number;
    totalScore: number;
    fineDate: Date;
    fineTime: string;
    locationName: string | null;
    locationLink: string;
    isDriver: boolean;
    officerId: Officer;
    isPaid: boolean | null;
    payReferenceId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface IfDriver {
    fineId: number;
    vehicle: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Offence {
    offenceId: number;
    offenceType: 'Driver' | 'Pedestrian';
    description: string;
    score: number;
    enabled: boolean;
    fee: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface OffenceRecord {
    fineId: FineRecord;
    offenceId: Offence;
    offenceDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface Officer {
    officerId: number;
    username: string;
    nicNumber: string;
    stationId: Station;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface Station {
    stationId: string;
    username: string;
    password: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface VehicleType {
    licenceNumber: DrLicence;
    types: string[];
    createdAt: Date;
    updatedAt: Date;

}

export interface Violations {
    violator: NIC,
    violations: [
        'fineId', 'totalFine', 'totalScore', 'fineDate', 'fineTime',
        'locationName', 'locationLink', 'isDriver', 'isPaid', 'payReferenceId'
    ]
}

export interface FineRecordWithOffences extends FineRecord {
    Offences: Offence[];
}