export type File = {
    id: string;
    url: string;
    status: 'pending' | 'uploaded';
    name: string;
    width?: number;
    height?: number;
    size?: number;
    format?: string;
    createdAt?: string;
    updatedAt?: string;
}