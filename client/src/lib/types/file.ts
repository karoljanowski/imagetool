export type File = {
    id: string;
    url: string;
    status: FileStatus;
    name: string;
    size?: number;
    originalWidth?: number;
    originalHeight?: number;
    originalFormat?: string;
}

export type NewFilesSettings = {
    fileId: string;
    newFormat: string;
    newWidth: number;
    newHeight: number;
    removeBackground: boolean;
    compress: boolean;
}

export type FileStatus = 'UPLOADING' | 'UPLOADED' | 'PROCESSING' | 'PROCESSED';