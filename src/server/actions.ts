// "use server";
const API_BASE_URL = "https://66bf65a342533c4031460e97.mockapi.io";

export interface IUser {
    id?:string
    first_name: string;
    last_name: string;
    age: number;
    email: string;
    password: string;
    alternate_email?: string;
  }

  export interface IEditUser {
    first_name?: string;
    last_name?: string;
    age?: number;
    // email: string;
    password?: string;
    alternate_email?: string;
  }


export const getUsers =  async(): Promise<IUser[] | any>  => {
    try{
        const res = await fetch(`${API_BASE_URL}/users`);
        return res.json()
        ;
    }catch(e){
        return {error: e}
    }    
}


export const getUser =  async(id: number): Promise<IUser | any>  => {
  try{
      const res = await fetch(`${API_BASE_URL}/users/${id}`);
      console.log(res.json())
      return res.json()
      ;
  }catch(e){
      return {error: e}
  }    
}

export const createUser = async (data: IUser): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };
  
  export const editUser = async (userId: number, data: IEditUser): Promise<any> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error updating user:', error);
      throw error; 
    }
  };
  

  export const deleteUser = async (userId: string): Promise<void> => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error; // Re-throw to allow caller to handle it further if necessary
    }
  };
  