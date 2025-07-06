export type SchoolType = 'GYMNASIUM' | 'LYCEUM' | 'ZZSO';

export interface School {
    id: number;
    name: string;
    edrpou: string;
    region: string;
    type: SchoolType;
    active: boolean;
}

export interface SchoolRequest {
    name: string;
    edrpou: string;
    region: string;
    type: SchoolType;
}
