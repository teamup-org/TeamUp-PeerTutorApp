'use client';


import { QueryClient, QueryClientProvider} 
  from "@tanstack/react-query";

import axios from "axios";


// Default Query Function when using useQuery(...) without defined queryFn:
const defaultQueryFn = async ({ queryKey }: any) => {
  const { data } = await axios.get( `${queryKey[0]}` );
  return data;
}


/**
 * Component for establishing the application's Query Client Provider to Tanstack
 * @param children - Child components passed from React
 * @returns 
 */  
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
