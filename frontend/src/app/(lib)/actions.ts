// Define server database interactivity functions and general server side functions here.

// import { authConfig } from '@/app/api/auth/[...nextauth]';
// import { getServerSession } from 'next-auth';

// export async function getSessionData() {
//   var session;

//   try { 
//     session = await getServerSession(authConfig);
//   } catch (error) {
//     throw error;
//   }

//   return JSON.stringify(session);
// }

import { useQuery } from "@tanstack/react-query";
import { authConfig } from '@/app/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';

export function test() {
  const { data, isError, isFetching, isLoading, refetch } = useQuery({
    // refetch when any of the following query keys change
    queryKey: ["test"],
    // asynchronous fetch
    queryFn: async () => {
      const response = await getServerSession(authConfig)
      console.log(response)
      return response;
    },
  });

  // console.log("data", data, "isError", isError, "isFetching", isFetching, "isLoading", isLoading, "refetch", refetch)
  return { data, isError, isFetching, isLoading, refetch };
}
