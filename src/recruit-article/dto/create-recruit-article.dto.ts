import { IsNumber, IsString, IsOptional  } from "class-validator";
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
    @IsOptional()
    @IsString({ each:true })
    readonly tags: string[];
}