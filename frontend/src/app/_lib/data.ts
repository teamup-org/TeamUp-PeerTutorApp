// PUT DATABASE DATA FETCHING FUNCTIONS HERE

// author: Brandon Nguyen

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const development = "http://localhost:8080";
const deployment = "https://tamutheo.xyz/database-api";

axios.defaults.baseURL = development;

export function TableFetch(tableName: string) {
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

export function TableUpdate(tableName: string, field: string, value: any) {
  const { data, isError } = useMutation({
    mutationFn: async () => {
      const response = await axios.put("/" + tableName, (field + '=' + value));
      return response;
    },
  });

  return { data, isError };
}

export function CreateTutor(fields: any) {
  const { data, isError } = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/" + "tutor", {
        uin: fields.uin,
        first_name: fields.firstName,
        last_name: fields.lastName,
        major_id: 1,
        seniority_id: fields.seniority,
        pay_rate: 40.0,
        bio_text: fields.bioText,
        picture_url: fields.pfp,
        phone_number: fields.phoneNumber,
        email: fields.email,
        active_status_id: 1
      }); 
      return response;
    },
  });

  return { data, isError };
}

export const useTutorMutation = () => {
  return useMutation({
    mutationFn: async (fields: any) => { const response = axios.post('/tutor', { 
        //uin: fields.uin,
        uin: 230004490,
        first_name: fields.firstName,
        last_name: fields.lastName,
        major_id: 1,
        seniority_id: fields.seniority,
        pay_rate: 40.0,
        bio_text: fields.bioText,
        picture_url: fields.pfp,
        //phone_number: fields.phoneNumber,
        phone_number: 2146017139,
        email: fields.email,
        active_status_id: 1
     });
     return (await response).data;
     }
  })
};