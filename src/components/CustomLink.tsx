import { ReactNode } from "react";

export const CustomLink = ({ link, children }: { link?: string; children: ReactNode }) => {
  if (!link) return <div className="flex flex-col gap-2">{children}</div>;
  return (
    <a href={link ?? "#"} rel="noopener noreferrer" target="_blank" className="flex flex-col gap-2">
      {children}
    </a>
  );
};
