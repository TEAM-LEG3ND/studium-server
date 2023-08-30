import { Journal } from "@prisma/client";
import { CreateJournalResponseDto } from "./create-journal-response.dto";

export class UpdateJournalResponseDto extends CreateJournalResponseDto {
    constructor(
        id: number,
        createdAt: Date,
        updatedAt: Date,
        title: string,
        content: string,
        authorId: number,
        studyId: number
    ) {
        super(id, createdAt, updatedAt, title, content, authorId, studyId);
    }

    static fromJournal(journal: Journal) {
        return new UpdateJournalResponseDto(
            journal.id,
            journal.createdAt,
            journal.updatedAt,
            journal.title,
            journal.content,
            journal.authorId,
            journal.studyId
        );
    }
}