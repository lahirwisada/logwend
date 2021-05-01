import { Connection, ConnectionOptions } from 'typeorm';

export interface Daftardb{
    id?: number;
    dbName?: string;
    recordCount?: number;
    dbmsName?: string;
    dbPort?: number;
    conProp?: Connection | ConnectionOptions | string;
    createdDate?: string;
    createdBy?: string;
    modifiedDate?: string;
    modifiedBy?: string;
    recordActive?: boolean;
}