import { MTask, Priority, Status, Task, TaskType } from "@/types/task";

export const taskdata: Task[] = [
  {
    name: "Filtering and Sorting on Users Dashboard",
    dueDate: "30/08/2024",
    priority: "Low",
    status: "Not started",
    taskType: "Improvement"
  },
  {
    name: "Montoya Delayed Scroll",
    dueDate: "24/08/2024",
    priority: "Medium",
    status: "In progress",
    taskType: "Bug"
  },
  {
    name: "Montoya Custom Cursor",
    dueDate: "15/08/2024",
    priority: "High",
    status: "Done",
    taskType: "New Feature"
  },
  {
    name: "Montoya Navigation Menu",
    dueDate: "22/08/2024",
    priority: "High",
    status: "In progress",
    taskType: "New Feature"
  },
  {
    name: "Montoya Header",
    dueDate: "23/08/2024",
    priority: "High",
    status: "Done",
    taskType: "New Feature"
  }
];


export const mTaskData: MTask[] =    [
  {
    name: "Filtering and Sorting on Users Dashboard",
    dueDate: "30/08/2024",
    priority: Priority.Low,
    status: Status.NotStarted,
    taskType: TaskType.Improvement,
  },
  {
    name: "Montoya Delayed Scroll",
    dueDate: "24/08/2024",
    priority: Priority.Medium,
    status: Status.InProgress,
    taskType: TaskType.Bug,
  },
  {
    name: "Montoya Custom Cursor",
    dueDate: "15/08/2024",
    priority: Priority.High,
    status: Status.Done,
    taskType: TaskType.NewFeature,
  },
  {
    name: "Montoya Navigation Menu",
    dueDate: "22/08/2024",
    priority: Priority.High,
    status: Status.InProgress,
    taskType: TaskType.NewFeature,
  },
  {
    name: "Montoya Header",
    dueDate: "23/08/2024",
    priority: Priority.High,
    status: Status.Done,
    taskType: TaskType.NewFeature,
  },
];