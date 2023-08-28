import { Notice } from "@prisma/client";
import { CreateNoticeResponseDto } from "./create-notice-response.dto";

export class UpdateNoticeResponseDto extends CreateNoticeResponseDto{
    constructor(
        id: number,
        createdAt: Date,
        updatedAt: Date,
        content: string,
        studyId: number
    ) {
        super(id, createdAt, updatedAt, content, studyId);
    }

    static fromNotice(notice: Notice) {
        return new UpdateNoticeResponseDto(
            notice.id,
            notice.createdAt,
            notice.updatedAt,
            notice.content,
            notice.studyId
        );
    }
}