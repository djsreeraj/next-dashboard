"use client"
import { Navbar } from '@/components/Navbar/Navbar';
import { Box, Button, Container, Group, Title } from '@mantine/core';
import UsersTab from '@/components/Users/UsersTab';
import { getUsers, IUser } from '@/server/actions'
import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import bcrypt from 'bcryptjs';
import { useEffect, useState } from 'react';
import { useCreateUserMutation, useUpdateUserMutation } from '@/hooks/useUsersQuery';
import { notifications } from '@mantine/notifications';
import RefreshButton from '@/components/UI/RefreshButton';
import UserForm from '@/components/Users/UserForm';
import { useQueryClient } from '@tanstack/react-query';

export default function Dashboard() {
  const [opened, { open, close }] = useDisclosure(false);
  const [editUserId, setEditUserId] = useState(null)
  const users: Promise<IUser[]> =  getUsers();

  
  const queryClient = useQueryClient();
  const [user, setUser] = useState<IUser>()

  useEffect(() => {
      const fetchUser =  () => {
          const data: IUser[] = queryClient.getQueryData(['users']) || [];
  
          if (editUserId) {
              if (data?.length > 1) {
                  const userPerson = data.filter((x) => x.id === editUserId);
                  if (userPerson.length > 0) {
                      console.log('aaa');

                      console.log(userPerson);
                      setUser(userPerson[0]);
                  }
              } else {
                  close()
              }
          }
      };
  
      fetchUser();
  }, [queryClient, editUserId]);

  useEffect(() => {
   user?.first_name && userForm.setFieldValue('firstname',user?.first_name)
   user?.last_name && userForm.setFieldValue('lastname',user?.last_name)
   user?.age && userForm.setFieldValue('age',user?.age)
   user?.email &&  userForm.setFieldValue('email',user?.email)
   user?.alternate_email &&  userForm.setFieldValue('alternateEmail',user?.alternate_email)
  },[user])
  

  const userForm = useForm({
    initialValues: {
      firstname: user?.first_name || "",
      lastname: user?.last_name || "",
      age: user?.age || "",
      email:user?.email || "",
      alternateEmail: user?.alternate_email || "",
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
      age: (value : any ) => {
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
        if(editUserId && value.length < 1 ){
          return null
        }
        if (value.length < 6) {
          return "Password must be at least 6 characters long";
        }
        return null; 
      },
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const createUserMutation = useCreateUserMutation(setIsLoading);
  const updateUserMutation = useUpdateUserMutation(setIsLoading, editUserId || 0);


  useEffect(() => {
    editUserId && open()
  }, [editUserId])


  useEffect(() => {
    if(!opened){
      setEditUserId(null)
      userForm.reset()
    }
  }, [opened])
  

  const handleSubmit = (values : any) => {
    setIsLoading(true);
    const data = {
        first_name: userForm.values.firstname,
        last_name: userForm.values.lastname,
        age: Number(userForm.values.age),
        email: userForm.values.email,
        alternate_email: userForm.values.alternateEmail,
        password: bcrypt.hashSync(userForm.values.password, 10)
      };

      if(editUserId){
        
      notifications.show({
        id: "load-data",
        loading: true,
        title: "Updating User..",
        message: `Hold on, User is getting updated.`,
        autoClose: false,
        withCloseButton: false,
      });

        updateUserMutation.mutate(data, {
          onSuccess: () => {
              close();
              userForm.reset();
          }
      });
      }else{
        
      notifications.show({
        id: "load-data",
        loading: true,
        title: "Creating User..",
        message: `Hold on, User is getting created.`,
        autoClose: false,
        withCloseButton: false,
      });
      
        createUserMutation.mutate(data, {
          onSuccess: () => {
              close();
              userForm.reset();
          }
      });
      }
}  

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height:'100vh', background: '#fff' }}>
        <Container fluid mt="xl" >
          <Box ml="xl" w='73vw'>
            <Group justify='space-between' style={{minWidth: "60vw"}}>
              <Group>
                <Title order={1}>Users</Title>
                <RefreshButton queryKeys={['users']}/>
              </Group>
                <Button onClick={open}  size="sm" variant="light" color="indigo">Add User</Button>
            </Group>
            <Box mt="lg">
                <UsersTab users={users} setEditUserId={setEditUserId} open={open} close={close}/>
            </Box>

            <UserForm 
              editUserId={editUserId} 
              open={open}          
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