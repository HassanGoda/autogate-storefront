export interface IPost {
    id: number;
    title: string;
    image: string;
    categories: string[];
    date: string;
    officialPath?: string;
    summary?: string;
}
