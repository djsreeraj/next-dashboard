export enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
  }
  
  export enum Status {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Done = "Done",
  }

  export enum TaskType {
    Improvement = "Improvement",
    Bug = "Bug",
    NewFeature = "NewFeature",
  }
  
  // export interface Task {
  //   name: string;
  //   dueDate: string;
  //   priority: Priority;
  //   status: Status;
  //   taskType: string;
  // }
  

  export interface Task {
    name: string;
    dueDate: string;
    priority: string;
    status: string;
    taskType: string;
  }

  export interface MTask {
    name: string;
    dueDate: string;
    priority: Priority;
    status: Status;
    taskType: TaskType;
  }


