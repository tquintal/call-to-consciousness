import { ReactNode } from "react";

export const CustomLink = ({ link, children, className }: { link?: string; children: ReactNode; className?: string }) => {
  if (!link) return <div className="flex flex-col gap-2">{children}</div>;
  return (
    <a href={link ?? "#"} rel="noopener noreferrer" target="_blank" className={`flex flex-col gap-2 ${className ?? ""}`}>
      {children}
    </a>
  );
};
