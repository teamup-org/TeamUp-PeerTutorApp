// PUT DATABASE DATA FETCHING FUNCTIONS HERE

// author: Brandon Nguyen

import { useQuery, useMutation, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";

const development = "http://localhost:8080";
const deployment = "https://tamutheo.xyz/database_api";

axios.defaults.baseURL = development;

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&');
}

export function TableFetch<T>(tableName: string, vars?: any[], ...args: string[]) {
  return {
    ...useQuery<T>({
      queryKey: ["table-data", {...vars}],
      queryFn: async () => {
        let req = `/${tableName}?${args.join('&')}`;
        return (await axios.get(req)).data;
      },
      placeholderData: keepPreviousData,
    })
  };
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

export const useTutorCreate = () => {
  return useMutation({
    mutationFn: async (fields: any) => { const response = axios.post('/tutor?' + objectToQueryString(fields));
     return (await response).data;
     }
  })
};

export const useTutorEligibleCourse = () => {
  return useMutation({
    mutationFn: async (fields: any) => { const response = axios.post('/tutor_eligible_course?' + objectToQueryString(fields));
     return (await response).data;
     }
  })
};

export const useTutorCoursePreference = () => {
  return useMutation({
    mutationFn: async (fields: any) => { const response = axios.post('/tutor_course_preference?' + objectToQueryString(fields));
     return (await response).data;
     }
  })
};

export const useTuteeMutation = () => {
  return useMutation({
    mutationFn: async (fields: any) => { const response = axios.post('/tutee?' + objectToQueryString(fields));
     return (await response).data;
     }
  })
};
