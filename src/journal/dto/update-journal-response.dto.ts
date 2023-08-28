import { Journal } from "@prisma/client";
import { CreateJournalResponseDto } from "./create-journal-response.dto";

export class UpdateJournalResponseDto extends CreateJournalResponseDto {
    constructor(
        id: number,
        createdAt: Date,
        updatedAt: Date,
        title: string,
        content: string,
        authorId: number
    ) {
        super(id, createdAt, updatedAt, title, content, authorId);
    }

    static fromJournal(journal: Journal) {
        return new UpdateJournalResponseDto(
            journal.id,
            journal.createdAt,
            journal.updatedAt,
            journal.title,
            journal.content,
            journal.authorId
        );
    }
}