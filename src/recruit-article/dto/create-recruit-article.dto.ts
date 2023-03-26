import { IsNumber, IsString } from "class-validator";
export class CreateRecruitArticleDTO{
    @IsString()
    readonly title: string;
    @IsString()
    readonly objective: string;
    @IsString()
    readonly duration: string;
    @IsNumber()
    readonly recruiting: number;
    @IsNumber()
    readonly recruited: number;
    @IsString({ each:true })
    readonly tags: string[];
}