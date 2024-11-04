export interface BlogPost {
    username: string;
    text: string;
    image: File | null;
    avatar: string;
    created_at: string;
}

export interface CreateBlogPost {
    username: string;
    text: string;
    image: File | null;
    avatar: string;
}