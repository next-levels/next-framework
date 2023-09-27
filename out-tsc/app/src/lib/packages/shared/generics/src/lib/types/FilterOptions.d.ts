export interface FilterOptions {
    page: number;
    limit: number;
    sortBy?: string;
    search?: string;
    [key: string]: any;
}
