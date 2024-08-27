"use-client";
import {  Paper, ScrollArea, Stack, Table, Text } from '@mantine/core';
import {  flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { mTaskData } from '@/constants/data';
import { useColumns } from './Column';


export default function Tasks({isSort} : {isSort: boolean}) {
    
    const columns = useColumns();
    const [filtering, setFiltering] = useState('')
    const [columnFilters, setColumnFilters] = useState([]);

    const [taskData, setTaskData] = useState(mTaskData)


    useEffect(() => {
      if(isSort){
        setTaskData([...mTaskData].reverse())
      }else{
        setTaskData([...mTaskData])
      }
    }, [isSort])
    
    const table = useReactTable({
        data: taskData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        // getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
        // onColumnFiltersChange: setColumnFilters,
        
      })

    return (
        <Paper shadow="md" ml={"lg"} p="md" w='70vw' style={{ minWidth: '80%', overflow: 'hidden'}}>

        <ScrollArea h='80vh' w='70vw' >
            <Stack   h='80vh' w='70vw'   justify="space-between"
            >

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
            
            </Stack>

        </ScrollArea>
        </Paper>
    )

}
