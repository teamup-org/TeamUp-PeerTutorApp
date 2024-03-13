// PUT DATABASE DATA FETCHING FUNCTIONS HERE

// author: Brandon Nguyen

import { useQuery, useMutation, useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const development = "http://localhost:8080";
const deployment = "https://tamutheo.xyz/database-api";

const numberEntriesPerPage = "number_entries_per_page=5";

axios.defaults.baseURL = development;

export function TableFetch(tableName: string) {
  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    // refetch when any of the following query keys change
    queryKey: ["table-data", tableName],
    // asynchronous fetch
    queryFn: async () => {
      return (await axios.get("/" + tableName)).data;
    },
    placeholderData: keepPreviousData,
  });

  // console.log("before outer return: " + data);
  return { data, isError, isFetching, isLoading, refetch };
}

export function TableUpdate(tableName: string, field: string, value: any) {
  const { data, isError } = useMutation({
    mutationFn: async () => {
      return (await axios.put("/" + tableName, (field + '=' + value))).data;
    },
  });

  return { data, isError };
}

export function TableFetchPaginated(tableName: string, pageNumber: number) {
  return {...useQuery({
    queryKey: ["table-data", tableName],
    queryFn: async () => {
      return (await axios.get("/" + tableName + "?" + numberEntriesPerPage + "&" + `page_number=${pageNumber}`)).data;
    },
    placeholderData: keepPreviousData,
    })
  };
}
