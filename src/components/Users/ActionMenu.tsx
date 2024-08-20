import { useDeleteUserMutation } from '@/hooks/useUsersQuery';
import { Button, Menu, Stack, Text, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconChevronDown, IconPencil, IconTrashXFilled } from '@tabler/icons-react';
import React from 'react'

export default function ActionMenu({
    open,
    rowId,
  }: any) {

    const deleteUserMutation = useDeleteUserMutation();

    return (
      <Stack px="sm">
        <Menu
          position="bottom-end"
          offset={4}
          withArrow
          arrowPosition="side"
          transitionProps={{ transition: "rotate-right", duration: 150 }}
        >
          <Menu.Target>
            <Button
              variant="outline"
              radius="lg"
              size="xs"
              rightSection={<IconChevronDown size="1rem" />}
              style={{ maxWidth: "fit-content", marginLeft: "-14px" }}
            >
              <Text size="xs" c="dark.5">
                Select Action
              </Text>
            </Button>
          </Menu.Target>
  
          <Menu.Dropdown>
          <Menu.Item
              color="orange"
              onClick={() => {
                // setSelectedRowId(rowId);
                // open();
              }}
              leftSection={
                <IconPencil style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Edit
            </Menu.Item>
            
            <Menu.Item
              color="red"
              onClick={() => {
                if (rowId) {
                    notifications.show({
                      id: "load-data",
                      loading: true,
                      title: "Deleting User..",
                      message: `Hold on, User is getting deleted.`,
                      autoClose: false,
                      withCloseButton: false,
                    });
                    deleteUserMutation.mutate(rowId)
                  }
              }}
              leftSection={
                <IconTrashXFilled style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Stack>
    );
  }


