export interface ItemRequestModel{
    projectId: number;
    typeId: number;
    title: string;
    description: string;
    statusId: number;
    priorityId: number;
    comment:  string;
    storyPoint: number;
    tagId: number;
    epicLinkId: number;
    responsibleId: number;
}

export interface TaskRequestModel{
    title: string;
    description: string;
    statusId: number;
    priorityId: number;
    comment:  string;
    storyPoint: number;
    responsibleId: number;
}