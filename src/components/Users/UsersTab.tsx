"use-client";
import { getUsers, IUser } from '@/server/actions'
import { Loader, ScrollArea } from '@mantine/core';
import { useQuery } from "@tanstack/react-query";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

export interface UsersTabProps {
    users?: any;
  }

  const columnHelper = createColumnHelper<IUser>()

    const columns = [
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
    }),
   
    columnHelper.accessor('age', {
        header: () => 'Age',
        cell: info => info.renderValue(),
        footer: info => info.column.id,
    }),
    ]

export default function UsersTab({users} : UsersTabProps) {
    const { data, error, isFetched, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        initialData: users
    })
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
      })

    if(isLoading || data.length < 1) <Loader color="indigo" type="bars" />

    if(error) <h2>{error.message}</h2>

    if(data) return (
        <ScrollArea h='80vh'>
          <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
      <div className="h-4" />
        </ScrollArea>
    )

    return <> Something Went Wrong..!</>
}
