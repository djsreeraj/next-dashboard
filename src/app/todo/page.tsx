"use client"
import Tasks from '@/components/Task/Tasks'
import { ActionIcon, Group, Paper, Stack, Title, Tooltip } from '@mantine/core'
import { IconAdjustmentsAlt, IconArrowsSort } from '@tabler/icons-react'
import React, { useState } from 'react'

const Todo = () => {

  const [isSort, setIsSorted] = useState(false)

  function handleFilter(){

  }

  function handleSort(){
    setIsSorted(prev => !prev)
  }
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height:'100vh', background: '#fff' }}>
      <Paper>
        <Stack m="xl" p="xl">
          <Group justify='space-between'>

          <Title>Todo Manager</Title>

          <Group>
          <Tooltip label="Filter" position="top" withArrow>
                  <ActionIcon
                    mt="xs"
                    variant="light"
                    aria-label="Filter"
                    onClick={handleFilter}
                    // loading={loading}
                  >
                    <IconAdjustmentsAlt style={{ width: "90%", height: "90%" }} stroke={1.5} />
                  </ActionIcon>

                  </Tooltip>

                  <Tooltip label="Sort" position="top" withArrow>

                    <ActionIcon
                    mt="xs"
                      variant="light"
                      aria-label="Refresh"
                      onClick={handleSort}
                      // loading={loading}
                    >
                      <IconArrowsSort style={{ width: "90%", height: "90%" }} stroke={1.5} />
                    </ActionIcon>
                    </Tooltip>

                </Group>
          </Group>
            <Group>
                <Tasks isSort={isSort} />
                
            </Group>
        </Stack>

      </Paper>
    </div>
  )
}

export default Todo
