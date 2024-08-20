import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, deleteUser, editUser, getUser, getUsers, IEditUser, IUser } from '@/server/actions';
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export const useUsersQuery = (initialData : IUser []) => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        initialData
    });
}

export const useUserQuery = (id: number) =>
  useQuery({
    enabled: true,
    queryKey: ["user", id],
    queryFn: () => getUser(id),
  });


export function useCreateUserMutation(setIsLoading : any) {
  const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (values: IUser) => createUser(values),
      onSuccess: () => {
        notifications.update({
          id: "load-data",
          color: "teal",
          title: "Success",
          message: "User Updated successfully",
          icon: <IconCheck size="1rem" />,
          autoClose: 3000,
          loading: false,
        });
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setIsLoading(false);
      },
      onError: (error: any) => {
        console.error("Error Updati user:", error.message);
        notifications.update({
          id: "load-data",
          color: "red",
          loading: false,

          title: "Failed",
          message: error?.response?.data?.message,
          icon: <IconCheck size="1rem" />,
          autoClose: 3000,
        });
  
        setIsLoading(false);
      },
    });
  }

  export function useUpdateUserMutation(setIsLoading : any, userId: number) {
    const queryClient = useQueryClient();
  
      return useMutation({
        mutationFn: (values: IEditUser) => editUser(userId, values),
        onSuccess: () => {
          notifications.update({
            id: "load-data",
            color: "teal",
            title: "Success",
            message: "User Added successfully",
            icon: <IconCheck size="1rem" />,
            autoClose: 3000,
            loading: false,
          });
          queryClient.invalidateQueries({ queryKey: ["users"] });
          setIsLoading(false);
        },
        onError: (error: any) => {
          console.error("Error creating user:", error.message);
          notifications.update({
            id: "load-data",
            color: "red",
            loading: false,
  
            title: "Failed",
            message: error?.response?.data?.message,
            icon: <IconCheck size="1rem" />,
            autoClose: 3000,
          });
    
          setIsLoading(false);
        },
      });
    }


  export function useDeleteUserMutation() {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: (id: string) => deleteUser(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] }),
          notifications.update({
            id: "load-data",
            color: "teal",
            loading: false,
            title: "Delete Success",
            message: "User deleted successfully.",
            icon: <IconCheck size="1rem" />,
            autoClose: 3000,
          });
      },
      onError: (error: any) => {
        notifications.update({
          id: "load-data",
          color: "red",
          loading: false,
          title: "Failed",
          message: error.response.data,
          icon: <IconCheck size="1rem" />,
          autoClose: 3000,
        });
      },
    });
  }