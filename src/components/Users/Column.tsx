import { IUser } from "@/server/actions";
import { createColumnHelper } from "@tanstack/react-table"
import ActionMenu from "./ActionMenu";
export interface UsersTabProps {
    users?: any;
  }

  interface ColProps {
    actions?: any;
  }
 const columnHelper = createColumnHelper<IUser & ColProps>()

export const columns = [
    columnHelper.accessor('first_name', {
        cell: info => info.getValue(),
        footer: info => info.column.id,
        header: () => <span>First Name</span>,

    }),
    columnHelper.accessor(row => row.last_name, {
        id: 'lastName',
        cell: info => <i>{info.getValue()}</i>,
        header: () => <span>Last Name</span>,
        footer: info => info.column.id,
    }),

    columnHelper.accessor('email', {
        header: 'Email',
        footer: info => info.column.id,
    }),
    columnHelper.accessor('alternate_email', {
        header: 'Alternate Email',
        footer: info => info.column.id,
    }),

    columnHelper.accessor('password', {
        header: () => <span>Password</span>,
        footer: info => info.column.id,
         cell: info => `${info.getValue().substring(0, 3)}...`,
    }),

    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    columnHelper.accessor('id', {
        header: () => <span>Actions</span>,
        cell: (info) => (
            <>
                <ActionMenu  rowId = {info.getValue()}/>
            </>
        ),
    }),
    ]