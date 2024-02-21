import "@/styles/globals.css";
import { ReactNode } from "react";

export default async function FoodTypesLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div>
      {children}
    </div>
  );
}
