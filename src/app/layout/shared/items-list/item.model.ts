export interface Project {
    id: number;
    name: string;
  }
  
  export interface Type {
    id: number;
    name: string;
  }
  
  export interface Priority {
    id: number;
    name: string;
  }
  
  export interface Status {
    id: number;
    name: string;
  }
  
  export interface Tag {
    id: number;
    name: string;
  }
  
  export interface EpicLink {
    id: number;
    name: string;
  }
  
  export interface Owner {
    id: number;
    name: string;
  }
  
  export interface Item {
    id: number;
    title: string;
    description: string;
    comment: string;
    storyPoint: number;
    priority: Priority;
    status: Status;
    owner: Owner;
    responsible: Owner | null;
    createdOn: string;
    updatedOn: string;
    project?: Project;
    type?: Type;
    tag?: Tag;
    epicLink?: EpicLink;
    tasks?: Item[];
}

export type Task = Omit<Item, 'project' | 'type' | 'tag' | 'epicLink' | 'tasks'>

export enum ItemType {
  TICKET = 'Ticket',
  TASK = 'Task'
}