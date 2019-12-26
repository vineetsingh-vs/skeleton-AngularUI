import { AsyncItem } from './async-state';

export const AVATARS: string[] = [
    'boy',
    'man'
];




export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    company: { name: string };
}

export type AsyncUserList = AsyncItem<User>[];
