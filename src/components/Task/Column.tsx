import { createColumnHelper } from "@tanstack/react-table";
import { Priority, Status, MTask, TaskType } from "@/types/task"; // Assuming you have the Task, Priority, and Status enums/interfaces in types/task.ts

const columnHelper = createColumnHelper<MTask>();

export const useColumns = () => {
  return [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      footer: (info) => info.column.id,
      header: () => <span>Task Name</span>,
    }),
    columnHelper.accessor("dueDate", {
      header: "Due Date",
      footer: (info) => info.column.id,
      // cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("priority", {
      header: "Priority",
      footer: (info) => info.column.id,
      cell: (info) => {
        const value = info.getValue<Priority>();
        return <span>{value}</span>;
      },
    }),
    columnHelper.accessor("status", {
      header: "Status",
      footer: (info) => info.column.id,
      cell: (info) => {
        const value = info.getValue<Status>();
        return <span>{value}</span>;
      },
    }),
    columnHelper.accessor("taskType", {
      header: "Task Type",
      footer: (info) => info.column.id,
      cell: (info) => {
        const value = info.getValue<TaskType>();
        return <span>{value}</span>;
      },
    }),

  ];
};
