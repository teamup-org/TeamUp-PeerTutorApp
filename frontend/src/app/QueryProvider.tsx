'use client';


import { QueryClient, QueryClientProvider} 
  from "@tanstack/react-query";

import axios from "axios";


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
