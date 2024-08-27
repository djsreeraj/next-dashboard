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

  const [openedSort, setOpenedSort] = useState(false);
  const [sortProperty, setSortProperty] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [sortedData, setSortedData] = useState<MTask[]>(mTaskData);

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
        case 'status':
          filtered = mTaskData.filter(
            (task) =>
              Status[task.status] === Status[filterValue as keyof typeof Status]
          );
          break;
        case 'taskType':
          filtered = mTaskData.filter(
            (task) =>
              TaskType[task.taskType] ===
              TaskType[filterValue as keyof typeof TaskType]
          );
          break;
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

  function handleSortM() {
    // setIsSorted((prev) => !prev);
   // setOpenedSort((prev) => !prev);
  }


  function handleSortBB() {
    setIsSorted((prev) => !prev);
    setOpenedSort((prev) => !prev);
  }

  function handleFilterBtn() {
    setOpened((prev) => !prev);

    if(opened){
      setFilterValue('')
      setFilteredData(mTaskData)
    }
  }

  function handleSortBtn() {
    setOpenedSort((prev) => !prev);

    if(openedSort){
      setSortOrder('')
      setFilteredData(mTaskData)
    }
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

  const getSortOrderOptions = () => {
    return [
      { value: 'asc', label: 'Ascending' },
      { value: 'desc', label: 'Descending' },
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


  function handleSort() {
    if (sortProperty) {
      const sorted = [...filteredData].sort((a, b) => {
        let aValue = a[sortProperty as keyof MTask];
        let bValue = b[sortProperty as keyof MTask];

        // Handle enums by converting them to their string equivalents
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          aValue = Priority[aValue as keyof typeof Priority] || Status[aValue as keyof typeof Status] || TaskType[aValue as keyof typeof TaskType];
          bValue = Priority[bValue as keyof typeof Priority] || Status[bValue as keyof typeof Status] || TaskType[bValue as keyof typeof TaskType];
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      //setSortedData(sorted);
      setFilteredData(sorted)
     // setIsSorted(true);
    //  setOpened(false); // Close the modal after sorting
    }
  }

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
                  onClick={handleSortBB}
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
            <Button onClick={handleFilterBtn} color='red' mt="lg">X</Button>

          </Group>
        </Group>
            }

{
              openedSort && 
              <Group>
           <Select
            label="Select Property"
            placeholder="Choose a property"
            data={getPropertyOptions()}
            value={sortProperty}
            onChange={(value) => setSortProperty(value)} // Handle null case
          />
          <Select
            label="Sort Order"
            placeholder="Choose order"
            data={getSortOrderOptions()}
            value={sortOrder}
            onChange={(value) => setSortOrder(value || 'asc')} // Handle null case
          />
          <Group justify="right">
          <Button onClick={handleSort}  mt="lg">Apply Sort</Button>
          <Button onClick={handleSortBtn} color='red' mt="lg">X</Button>

          </Group>
        </Group>
            }
          </Group>

          <Group>
            <Tasks isSort={isSort} filteredData={filteredData} />
          </Group>
        </Stack>
      </Paper>
    </div>
  );
};

export default Todo;
