"use-client";
import { IUser } from '@/server/actions'
import {  Loader, Paper, ScrollArea, Stack, Table, Text } from '@mantine/core';
import { createColumnHelper, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import PaginationControls from '../Table/PaginationControls';
import { useUsersQuery } from '@/hooks/useUsersQuery';

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
             cell: info => `${info.getValue().substring(0, 3)}...`,
        }),
    
        columnHelper.accessor('age', {
            header: () => 'Age',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        ]

export default function UsersTab({users} : UsersTabProps) {
    const { data, error, isLoading } = useUsersQuery(users);
    const table = useReactTable({
        data: data?.length > 0 ? [...data]?.reverse() : data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel()
      })

    if(isLoading || data.length < 1 || !table) <Loader color="indigo" type="bars" />

    if(error) <h2>{error.message}</h2>

    if(data) return (
        <Paper shadow="md" p="md">

        <ScrollArea h='80vh'>
            <Stack   h='80vh'    justify="space-between"
            >
                {
                    !data || data.length < 1 && <Text>No data available!</Text>
                }
          <Table stickyHeader striped highlightOnHover  withColumnBorders horizontalSpacing="sm">
            <Table.Thead>
            {table.getHeaderGroups().map(headerGroup => (
                <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                    <Table.Th key={header.id}>
                    {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                        )}
                    </Table.Th>
                ))}
                </Table.Tr>
            ))}
            </Table.Thead>
            <Table.Tbody>
            {table.getRowModel().rows.map(row => (
                <Table.Tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                    <Table.Td key={cell.id} title={cell.getValue() as string || ''}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Td>
                ))}
                </Table.Tr>
            ))}
            </Table.Tbody>

          </Table>

          <PaginationControls  table={table}/>
            
            </Stack>

        </ScrollArea>
        </Paper>
    )

    return <> Something Went Wrong..!</>
}
