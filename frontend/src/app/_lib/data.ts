// PUT DATABASE DATA FETCHING FUNCTIONS HERE

// author: Brandon Nguyen

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const development = "http://localhost:8080";
const deployment = "https://tamutheo.xyz/database-api";

axios.defaults.baseURL = development;

export function tableFetch(tableName: string) {
  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    // refetch when any of the following query keys change
    queryKey: ["table-data", tableName],
    // asynchronous fetch
    queryFn: async () => {
      const response = await axios.get("/" + tableName);
      console.log("before inner return: " + data);
      return response.data;
    },
    placeholderData: (prev) => prev,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchInterval: false, 
    refetchIntervalInBackground: false,

  });

  // console.log("before outer return: " + data);
  return { data, isError, isFetching, isLoading, refetch };
}

export function tableUpdate(tableName: string, field: string, value: any) {
  const { data, isError } = useMutation({
    mutationFn: async () => {
      const response = await axios.put("/" + tableName, (field + '=' + value));
      return response;
    },
  });

  return { data, isError };
}
