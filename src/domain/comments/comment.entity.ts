export class Comment {
    id: number;
    articleId: number;
    authorId: number;
    parentId: number | null;
    content: string;
    createdAt: Date;
}