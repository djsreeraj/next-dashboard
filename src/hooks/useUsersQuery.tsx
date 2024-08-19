import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getUsers, IUser } from '@/server/actions';
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export const useUsersQuery = (initialData : IUser []) => {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
        initialData
    });
}

export function useCreateUserMutation(setIsLoading : any) {
  const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (values: IUser) => createUser(values),
      onSuccess: () => {
        notifications.show({
          id: "load-data",
          color: "teal",
          title: "Success",
          message: "User Added successfully",
          icon: <IconCheck size="1rem" />,
          autoClose: 3000,
        });
        queryClient.invalidateQueries({ queryKey: ["users"] });
        setIsLoading(false);
      },
      onError: (error: any) => {
        console.error("Error creating user:", error.message);
        notifications.show({
          id: "load-data",
          color: "red",
  
          title: "Failed",
          message: error?.response?.data?.message,
          icon: <IconCheck size="1rem" />,
          autoClose: 3000,
        });
  
        setIsLoading(false);
      },
    });
  }