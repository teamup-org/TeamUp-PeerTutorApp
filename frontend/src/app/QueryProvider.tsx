'use client';


import { QueryClient, QueryClientProvider} 
from "@tanstack/react-query";

import axios from "axios";


// Base URL's to direct backend database queries to
const development = "http://localhost:8080";            // For use in local development, forwards to a local instance on port 8080, in this case forwarding to Java Sprint Boot
const deployment = "https://tamutheo.xyz/database-api"; // For use on deployment server, forwards to Spring Boot endpoint 'database-api'
axios.defaults.baseURL = development;

const defaultQueryFn = async ({ queryKey }: any) => {
  const { data } = await axios.get( `${queryKey[0]}` );
  return data;
}

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider 
      client={ new QueryClient({
        defaultOptions: {
          queries: {
            queryFn: defaultQueryFn
          },
        },
      }) }
    >
      {children}
    </QueryClientProvider>
  );
}
