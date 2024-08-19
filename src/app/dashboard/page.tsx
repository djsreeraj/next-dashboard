"use client"
import { Navbar } from '@/components/Navbar/Navbar';
import { Box, Button, Modal, Container, Group, Title, TextInput, Stack, NumberInput } from '@mantine/core';
import UsersTab from '@/components/Users/UsersTab';
import { getUsers, IUser } from '@/server/actions'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import bcrypt from 'bcryptjs';
import { useState } from 'react';
import { useCreateUserMutation } from '@/hooks/useUsersQuery';

export default function Dashboard() {
  const [opened, { open, close }] = useDisclosure(false);
  const users: Promise<IUser[]> =  getUsers();

  const userForm = useForm({
    initialValues: {
      firstname: "",
      lastname: "",
      age: "",
      email: "",
      alternateEmail: "",
      password: "",
    },
  
    validate: {
      firstname: (value) => {
        if (value.length < 3) {
          return "Min 3 characters long";
        }
        return null; 
      },
      lastname: (value) => {
        if (value.length < 3) {
          return "Min 3 characters long";
        }
        return null; 
      },
      age: (value) => {
        if (!value) {
          return "Age is required";
        }
        if (isNaN(parseInt(value)) || (parseInt(value) <= 18)) {
          return "Age must be above 18";
        }
        return null; 
      },
      email: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return "Please enter a valid email address";
        }
        return null; 
      },
      alternateEmail: (value) => {
        if (value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            return "Please enter a valid alternate email address";
          }
          if (userForm.values.email.toLowerCase() === value.toLowerCase()) {
            return "Both emails are the same";
          }
          
        }
        return null; 
      },
      password: (value) => {
        if (value.length < 6) {
          return "Password must be at least 6 characters long";
        }
        return null; 
      },
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const createUserMutation = useCreateUserMutation(setIsLoading);

  const handleSubmit = (values : any) => {
    setIsLoading(true);
    const data = {
        first_name: userForm.values.firstname,
        last_name: userForm.values.lastname,
        age: parseInt(userForm.values.age),
        email: userForm.values.email,
        alternate_email: userForm.values.alternateEmail,
        password: bcrypt.hashSync(userForm.values.password, 10)
      };
      
    createUserMutation.mutate(data, {
        onSuccess: () => {
            close();
        }
    });

}  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height:'100vh' }}>
        <Container mt="xl">
            <Group justify='space-between'>
                <Title order={1}>Users</Title>
                <Button onClick={open}  size="sm" variant="light" color="indigo">Add User</Button>
            </Group>
            <Box mt="lg">
                <UsersTab users={users}/>
            </Box>

            <Modal opened={opened} onClose={close}         
                title={<div style={{ fontSize: '24px', fontWeight: 'bold' }}>Add New User</div>}
            >
                <form onSubmit={userForm.onSubmit(handleSubmit)}>
                <Stack gap="sm">
                    <Group style={{ margin: '0px', padding: '0px' }}>
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
                        placeholder="Enter your password"
                        {...userForm.getInputProps("password")}
                    />

                    <Group mt="md" gap="lg" justify='center'>
                        <Button loading={isLoading} onClick={close} size="sm" variant="light" color="indigo">Cancel</Button>
                        <Button loading={isLoading} type="submit" size="sm" variant="filled" color="blue">Add User</Button>
                    </Group>
                    </Stack>

                </form>
            </Modal>

        </Container>
         <Navbar />

    </div>
  );
}