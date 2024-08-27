export enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
  }
  
  export enum Status {
    NotStarted = "Not started",
    InProgress = "In progress",
    Done = "Done",
  }

  export enum TaskType {
    Improvement = "Improvement",
    Bug = "Bug",
    NewFeature = "New Feature",
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


