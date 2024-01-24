import { Module } from "@nestjs/common";
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { PresentationModule } from "./presentation/presentation.module";
import { CommentsModule } from './domain/comments/comments.module';

@Module({
    imports: [PrismaModule, PresentationModule,CommentsModule],
})
export class AppModule {}
