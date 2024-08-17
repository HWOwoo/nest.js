// interfaces/post/PostInfo.ts -> model 정의 용도
export interface PostInfo {
    title: string;
    content: string;
    dateTimeOfPosting: Date;
    additional: {
        category: string;
        season: string;
    };
}
    