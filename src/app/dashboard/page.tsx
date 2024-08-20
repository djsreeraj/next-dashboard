"use client"
import { Navbar } from '@/components/Navbar/Navbar';
import { Box, Button, Container, Group, Title } from '@mantine/core';
import UsersTab from '@/components/Users/UsersTab';
import { getUsers, IUser } from '@/server/actions'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import bcrypt from 'bcryptjs';
import { useState } from 'react';
import { useCreateUserMutation } from '@/hooks/useUsersQuery';
import AddUserForm from '@/components/Users/AddUserForm';

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
            userForm.reset();
        }
    });

}  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height:'100vh', background: '#fff' }}>
        <Container fluid mt="xl" >
          <Box ml="xl" w='73vw'>
            <Group justify='space-between' style={{minWidth: "60vw"}}>
                <Title order={1}>Users</Title>
                <Button onClick={open}  size="sm" variant="light" color="indigo">Add User</Button>
            </Group>
            <Box mt="lg">
                <UsersTab users={users}/>
            </Box>

            <AddUserForm            
              isLoading={isLoading}
              opened={opened}
              close={close}
              userForm={userForm}
              handleSubmit={handleSubmit}
            />
          </Box>
        </Container>
         <Navbar />

    </div>
  );
}