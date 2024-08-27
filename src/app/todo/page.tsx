'use client';

import Tasks from '@/components/Task/Tasks';
import { mTaskData } from '@/constants/data';
import { MTask, Priority, Status, TaskType } from '@/types/task';
import {
  ActionIcon,
  Group,
  Paper,
  Stack,
  Title,
  Tooltip,
  Select,
  TextInput,
  Button,
} from '@mantine/core';
import { IconAdjustmentsAlt, IconArrowsSort } from '@tabler/icons-react';
import React, { useEffect, useState } from 'react';

const Todo = () => {
  const [isSort, setIsSorted] = useState(false);

  const [opened, setOpened] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredData, setFilteredData] = useState<MTask[]>(mTaskData);

  useEffect(() => {
    console.log(filteredData)
  }, [filteredData])
  
  function handleFilter() {
    let filtered: MTask[] = mTaskData;

    if (selectedProperty) {
      switch (selectedProperty) {
        case 'priority':
          filtered = mTaskData.filter(
            (task) =>
              Priority[task.priority] ===
              Priority[filterValue as keyof typeof Priority]
          );
          break;
        // case 'status':
        //   filtered = mTaskData.filter(
        //     (task) =>
        //       Status[task.status] === Status[filterValue as keyof typeof Status]
        //   );
        //   break;
        // case 'taskType':
        //   filtered = mTaskData.filter(
        //     (task) =>
        //       TaskType[task.taskType] ===
        //       TaskType[filterValue as keyof typeof TaskType]
        //   );
        //   break;
        default:
          filtered = mTaskData.filter(
            (task) =>{
              console.log(task)
              console.log(selectedProperty)
              console.log(selectedProperty)

             return task[selectedProperty as keyof MTask]
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toLowerCase())
            }
              
          );
      }
    }

    setFilteredData(filtered);
    //setOpened(false); // Close the modal after filtering
  }

  function handleSort() {
    setIsSorted((prev) => !prev);
  }

  function handleFilterBtn() {
    setOpened((prev) => !prev);
  }

  const getPropertyOptions = () => {
    return [
      { value: 'name', label: 'Name' },
      { value: 'dueDate', label: 'Due Date' },
      { value: 'priority', label: 'Priority' },
      { value: 'status', label: 'Status' },
      { value: 'taskType', label: 'Task Type' },
    ];
  };

  const getFilterInput = () => {
    if (selectedProperty === 'priority') {
      return (
        <Select
          label="Priority"
          data={Object.keys(Priority).map((key) => ({
            value: key,
            label: key,
          }))}
          value={filterValue}
          onChange={(value) => setFilterValue(value || '')}        />
      );
    }

    if (selectedProperty === 'status') {
      return (
        <Select
          label="Status"
          data={Object.keys(Status).map((key) => ({
            value: key,
            label: key,
          }))}
          value={filterValue}
          onChange={(value) => setFilterValue(value || '')}        />
      );
    }

    if (selectedProperty === 'taskType') {
      return (
        <Select
          label="Task Type"
          data={Object.keys(TaskType).map((key) => ({
            value: key,
            label: key,
          }))}
          value={filterValue}
          onChange={(value) => setFilterValue(value || '')}        />

      );
    }

    return (
      <TextInput
        label="Filter Value"
        placeholder="Enter value"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height: '100vh', background: '#fff' }}>
      <Paper>
        <Stack m="xl" p="xl">
          <Group justify="space-between">
            <Title>Todo Manager</Title>

            <Group>
              <Tooltip label="Filter" position="top" withArrow>
                <ActionIcon
                  mt="xs"
                  variant="light"
                  aria-label="Filter"
                  onClick={handleFilterBtn}
                >
                  <IconAdjustmentsAlt style={{ width: '90%', height: '90%' }} stroke={1.5} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Sort" position="top" withArrow>
                <ActionIcon
                  mt="xs"
                  variant="light"
                  aria-label="Refresh"
                  onClick={handleSort}
                >
                  <IconArrowsSort style={{ width: '90%', height: '90%' }} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Group>

          <Group ml="xl">
            {
              opened && 
              <Group>
          <Select
            label="Select Property"
            placeholder="Choose a property"
            data={getPropertyOptions()}
            value={selectedProperty}
            onChange={setSelectedProperty}
          />
          {selectedProperty && getFilterInput()}
          <Group justify="right">
            <Button onClick={handleFilter} mt="lg">Apply Filter</Button>
          </Group>
        </Group>
            }
          </Group>

          <Group>
            <Tasks isSort={isSort} filteredData={filteredData} />
          </Group>
        </Stack>
      </Paper>

      {/* <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Filter Tasks"
        overlayProps={{
          color:  theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        
      </Modal> */}
    </div>
  );
};

export default Todo;
