'use-client'
import { Navbar } from '@/components/Navbar/Navbar';
import { Container, Title } from '@mantine/core';

export default async function Dashboard() {

    // const getUsers =  async() => {
    //     const res = await fetch('https://66bf65a342533c4031460e97.mockapi.io/users');
    //     return res.json();
    // }
    // const users = await getUsers();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', height:'100vh' }}>
        <Container>
            <Title order={1}>Users</Title>

        </Container>
         <Navbar />

    </div>
  );
}