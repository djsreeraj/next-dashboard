import { Box, Button, Group, Text } from '@mantine/core';

const PaginationControls = ({ table } : any) => {
    return (
        <Group justify="center" gap={"lg"} mt="md" style={{maxWidth: "60vw "}}>
        <Box mt="sm" mr="xl">
    <Text c="gray"> Showing {table.getRowModel().rows.length.toLocaleString()} of{' '}
    {table.getRowCount().toLocaleString()} Rows</Text>
    
</Box>
<>
<Button
    variant="outline"
    radius="sm"
    size="xs"
    onClick={() => table.firstPage()}
    disabled={!table.getCanPreviousPage()}
>
    {'<<'}
</Button>
<Button
    variant="outline"
    radius="sm"
    size="xs"
    onClick={() => table.previousPage()}
    disabled={!table.getCanPreviousPage()}
>
    {'<'}
</Button>
<Button
    variant="outline"
    radius="sm"
    size="xs"
    onClick={() => table.nextPage()}
    disabled={!table.getCanNextPage()}
>
    {'>'}
</Button>
<Button
    variant="outline"
    radius="sm"
    size="xs"
    onClick={() => table.lastPage()}
    disabled={!table.getCanNextPage()}
>
    {'>>'}
</Button>

<Group gap="xs" align="center">
    <Text c="dimmed">Page</Text>
    <Text w={500} c="dimmed">
        {table.getState().pagination.pageIndex + 1} of {table.getPageCount().toLocaleString()}
    </Text>
</Group>
</>

            <Box ml="xl">
                <select 
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                }}
                >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                    </option>
                ))}
                </select>
            </Box>
            
           
        </Group>
    );
}

export default PaginationControls;
