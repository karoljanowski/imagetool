export type File = {
    id: string;
    token: string;
    url: string;
    status: FileStatus;
    name: string;
    size?: number;
    originalWidth?: number;
    originalHeight?: number;
    originalFormat?: string;
    originalPath?: string;
    processedFormat?: string;
    processedSize?: number;
    processedWidth?: number;
    processedHeight?: number;
    processedRemovedBackground?: boolean;
    processedCompressed?: boolean;
    processedPath?: string;
}

export type FileStatus = 'UPLOADING' | 'UPLOADED' | 'PROCESSING' | 'PROCESSED' | 'ERROR';

export enum FormatOptionsEnum {
    PNG = 'png',
    JPEG = 'jpeg',
    WEBP = 'webp',
    AVIF = 'avif'
}
