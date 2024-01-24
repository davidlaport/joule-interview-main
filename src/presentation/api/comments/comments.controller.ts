import { Controller, Post, Body, Param } from '@nestjs/common';
import { CommentsService } from '../../../domain/comments/comments.service';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post('article/:articleId')
    async create(@Param('articleId') articleId: number, @Body() body: any) {
        return await this.commentsService.createComment(articleId, body.authorId, body.content, body.parentId);
    }
}
