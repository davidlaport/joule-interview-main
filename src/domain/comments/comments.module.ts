import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from '../../presentation/api/comments/comments.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { PrismaModule } from '../../infrastructure/prisma/prisma.module';

@Module({
    imports: [PrismaModule,NotificationsModule],
    providers: [CommentsService],
    controllers: [CommentsController],
})
export class CommentsModule {}
