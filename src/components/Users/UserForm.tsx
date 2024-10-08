import { IUser } from '@/server/actions';
import { Button, Group, Modal, NumberInput, Stack, TextInput } from '@mantine/core'
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'

const UserForm = ({ editUserId, isLoading, opened, close, userForm, handleSubmit  } : any) => {
  

  return (

    <Modal opened={opened} onClose={close}         
                title={<div style={{ fontSize: '24px', fontWeight: 'bold' }}> {editUserId ? 'Edit User':'Add New User'}</div>}
            >
                <form onSubmit={userForm.onSubmit(handleSubmit)}>
                <Stack gap="sm">
                    <Group gap={35} style={{ margin: '0px', padding: '0px' }}>
                        <TextInput 
                        label="First Name" 
                        placeholder="Enter your first name"
                        {...userForm.getInputProps("firstname")}
                        />
                        <TextInput 
                        label="Last Name" 
                        placeholder="Enter your last name"
                        {...userForm.getInputProps("lastname")}
                        />
                    </Group>

                    <NumberInput 
                        label="Age" 
                        placeholder="Enter your age"
                        {...userForm.getInputProps("age")}
                        max={100}
                    />
                    <TextInput 
                        label="Email" 
                        placeholder="Enter your email address"
                        {...userForm.getInputProps("email")}
                    />
                    <TextInput 
                        label="Alternate Email" 
                        placeholder="Enter an alternate email address (Optional)"
                        {...userForm.getInputProps("alternateEmail")}  // Ensure correct key casing
                    />
                    <TextInput 
                        label="Password" 
                        type='password'
                        placeholder="Enter your password"
                        {...userForm.getInputProps("password")}
                    />

                    <Group mt="md" gap="lg" justify='center'>
                        <Button disabled={isLoading} onClick={close} size="sm" variant="light" color="indigo">Cancel</Button>
                        <Button loading={isLoading} type="submit" size="sm" variant="filled" color="blue">{editUserId ? 'Update User' :' Add User' }</Button>
                    </Group>
                    </Stack>

                </form>
            </Modal>
  )
}

export default UserForm