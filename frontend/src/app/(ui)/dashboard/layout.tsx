import { loginIsRequiredServer } from "@/app/api/auth/[...nextauth]";
import React from "react";

export default async function Layout({ children }: { children: React.ReactNode }) {
  await loginIsRequiredServer();
  
  return (
    <div>{children}</div>
  );
}
