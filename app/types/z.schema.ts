import {z} from 'zod';

export const Status = [
    "PENDING",
    "ACTIVE",
    "DELETE"
] as const

z.enum(Status);