"use client"
import { Navbar } from '@/components/Navbar/Navbar';
import { Box, Container, Title } from '@mantine/core';
import UsersTab from '@/components/Users/UsersTab';
import { getUsers, IUser } from '@/server/actions'

export default function Dashboard() {

  const users: Promise<IUser[]> =  getUsers();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height:'100vh' }}>
        <Container mt="lg">
            <Title order={1}>Users</Title>
            <Box mt="lg">
                <UsersTab users={users}/>
            </Box>

        </Container>
         <Navbar />

    </div>
  );
}