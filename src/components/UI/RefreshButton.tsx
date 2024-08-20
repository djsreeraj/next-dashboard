import React, { useState } from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { IconCheck, IconRefresh } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

const RefreshButton = ({ queryKeys }: { queryKeys: Array<string> }) => {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const handleRefresh = async () => {
    setLoading(true);
    notifications.show({
      id: "load-data",
      loading: true,
      title: "Refreshing",
      message: `Hold on, Data is getting refetched.`,
      autoClose: false,
      withCloseButton: false,
    });
    for (const queryKey of queryKeys)
      await queryClient.invalidateQueries({ queryKey: [queryKey] });
    setLoading(false);
    notifications.update({
      id: "load-data",
      color: "teal",
      title: "Success",
      message: "Data Updated Successfully",
      icon: <IconCheck size="1rem" />,
      autoClose: 3000,
      loading: false,
    });
  };

  return (
    <Tooltip label="Refresh data" position="top" withArrow>
      <ActionIcon
       mt="xs"
        variant="light"
        aria-label="Refresh"
        onClick={handleRefresh}
        loading={loading}
      >
        <IconRefresh style={{ width: "90%", height: "90%" }} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
};

export default RefreshButton;
