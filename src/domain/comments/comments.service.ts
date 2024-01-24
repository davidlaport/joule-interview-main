import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { Comment } from './comment.entity';

@Injectable()
export class CommentsService {
    private readonly bannedWords = ["this is lame"];

    constructor(private prisma: PrismaService) {}

    private checkForBannedWords(content: string): boolean {
        return this.bannedWords.some(bannedWord => content.toLowerCase().includes(bannedWord.toLowerCase()));
    }

    async createComment(articleId: number, authorId: number, content: string, parentId: number | null): Promise<Comment> {
        if (this.checkForBannedWords(content)) {
            throw new Error("Inappropriate language detected");
        }

        const article = await this.prisma.article.findUnique({ where: { id: articleId }});
        if (!article) {
            throw new NotFoundException(`Article with ID ${articleId} not found`);
        }

        let parentComment = null;
        if (parentId) {
            parentComment = await this.prisma.comment.findUnique({ where: { id: parentId }});
            if (!parentComment) {
                throw new NotFoundException(`Parent comment with ID ${parentId} not found`);
            }
        }

        const newComment = await this.prisma.comment.create({ data: { articleId, authorId, content, parentId }});

        console.log(`Email notification sent to (ID: ${article.authorId})`);
        
        if (parentComment) {
            console.log(`Email notification sent to (ID: ${parentComment.authorId})`);
        }

        return newComment;
    }
}
