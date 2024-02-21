import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

type SiteFocusProps = HTMLAttributes<HTMLDivElement>;

const SiteFocus = (props: SiteFocusProps) => {
  return (
    <div
      {...props}
      className={cn(
        "w-[50vw] flex justify-center shadow-md bg-background text-foreground absolute top-100 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-border/40 p-2 rounded-lg",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export default SiteFocus;
