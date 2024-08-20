"use-client";
import {  Loader, Paper, ScrollArea, Stack, Table, Text } from '@mantine/core';
import {  flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import PaginationControls from '../Table/PaginationControls';
import { useUsersQuery } from '@/hooks/useUsersQuery';
import { useEffect, useState } from 'react';
import { useColumns } from './Column';

export interface UsersTabProps {
    users?: any;
    open: () => {};
    close: () => {};
  }

interface ColProps {
    actions?: any;
}
export default function UsersTab({users,setEditUserId, open, close, } : any) {
    const { data, error, isLoading } = useUsersQuery(users);

    const [userData, setUserData] = useState(data || null)

    useEffect(() => {
        if(data?.length > 0 )
            setUserData(data?.slice().reverse())
    }, [data])
    
    const columns = useColumns(setEditUserId, open, close);

    const table = useReactTable({
        data: userData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        columnResizeMode: "onChange"
      })

      if (isLoading) {
        return <Loader color="indigo" type="bars" />;
    }
    
    if(error) <h2>{error.message}</h2>

    if(userData) return (
        <Paper shadow="md" ml={"lg"} p="md" w='70vw' style={{ minWidth: '80%', overflow: 'hidden'}}>

        <ScrollArea h='80vh' w='70vw' >
            <Stack   h='80vh' w='70vw'   justify="space-between"
            >
                {
                    !userData || userData?.length < 1 && <Text>No data available!</Text>
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
