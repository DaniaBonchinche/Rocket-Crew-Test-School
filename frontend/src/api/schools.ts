import axios from 'axios';
import { School, SchoolRequest, SchoolType } from '../models/schools'

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

export const fetchSchools = (params: {
    region?: string;
    type?: SchoolType;
    isActive?: boolean;
    page?: number;
    size?: number;
}) => {
    const query = new URLSearchParams();

    if (params.region) query.append('region', params.region);
    if (params.type) query.append('type', params.type);
    if (params.isActive !== undefined) query.append('isActive', String(params.isActive));
    if (params.page !== undefined) query.append('page', String(params.page));
    if (params.size !== undefined) query.append('size', String(params.size));

    return api.get(`/schools?${query.toString()}`);
};


export const createSchool = (data: SchoolRequest) => {
    return api.post<School>('/schools', data);
};

export const deactivateSchool = (id: number) => {
    return api.patch(`/schools/${id}/deactivate`);
};
