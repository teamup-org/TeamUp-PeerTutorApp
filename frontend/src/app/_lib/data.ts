
// author: Brandon Nguyen, Kyle Lang

// Asynchronous state management for backend queries (https://tanstack.com/query/latest/docs/framework/react/overview)
import { useQuery, useMutation, keepPreviousData, useQueryClient } from "@tanstack/react-query";

// HTTP client for node.js and the browser (https://axios-http.com/docs/intro)
import axios from "axios";

// Base URL's to direct backend database queries to
const development = "http://localhost:8080";            // For use in local development, forwards to a local instance on port 8080, in this case forwarding to Java Sprint Boot
const deployment = "https://tamutheo.xyz/database_api"; // For use on deployment server, forwards to Spring Boot endpoint 'database-api'
axios.defaults.baseURL = deployment;
axios.defaults.headers['Content-Type'] = 'multipart/form-data';

function objectToQueryString(obj: any) {
  return Object.keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&');
}

// Generalized fetching function for fetching database data using useQuery() from Tanstack and get() from Axios.
// The function requires a 'tableName' to route to, any listening variables 'vars' that, upon update, should refetch the query, and any additional 'args' such as query options
export function TableFetch<T>(tableName: string, vars: any[], ...args: string[]) {
  return {
    ...useQuery<T>({
      queryKey: [tableName, {...vars}],
      queryFn: async () => {
        const req = `/${tableName}?${args.join('&')}`;
        return (await axios.get(req)).data;
      },
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: false,
    })
  };
}

export function TablePush(tableName: string) {
  return useMutation({
    mutationKey: [tableName],
    mutationFn: async (data: any) => {
      const req = `${tableName}`;
      return (await axios.post(req, data));
    },
    /*onSuccess: (data, variables) => {
      useQueryClient().setQueryData([tableName, {...variables}], data);
    },*/
  });
}

export function TableUpdate(tableName: string) {
  return useMutation({
    mutationKey: [tableName],
    mutationFn: async (data: any) => {
      const req = `${tableName}`;
      return (await axios.post(req, data));
    },
  });
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
