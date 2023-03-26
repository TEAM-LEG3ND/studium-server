import { IsString } from "class-validator";
import { LargeNumberLike } from "crypto";

export class CreateRecruitArticleDTO{
    @IsString
    readonly title: string;
    readonly objective: string;
    readonly duration: string;
    readonly recruiting: number;
    readonly recruited: number;
    readonly tags: string[];
}