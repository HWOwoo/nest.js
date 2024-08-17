// interfaces/post/PostCreateDto.ts -> create 용
export interface PostCreateDto {
    title: string;
    content: string;
    additional?: {
        category: string;
        season: string;
    };
}