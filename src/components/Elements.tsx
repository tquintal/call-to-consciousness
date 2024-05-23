import { ReactNode } from "react";

export const Layout = ({ children, noPadding }: { children: ReactNode; noPadding?: boolean }) => {
  return (
    <div className={`flex flex-col bg-[#F3F3F3] ${noPadding ? "" : "pt-28"} lg:min-h-[95vh] justify-center items-center`}>
      <div style={{ maxWidth: "1920px" }} className="flex flex-col gap-8 2xl:px-52 p-8 w-full">
        {children}
      </div>
    </div>
  );
};

export const Title = ({ children }: { children: ReactNode }) => {
  return <h1 className="font-semibold text-2xl xl:col-span-2">{children}</h1>;
};

export const SubTitle = ({ children }: { children: ReactNode }) => {
  return <h2 className="font-semibold text-xl">{children}</h2>;
};

export const SmallerTitle = ({ children }: { children: ReactNode }) => {
  return <h3 className="font-semibold">{children}</h3>;
};

export const Divider = ({ className }: { className?: string }) => {
  return <div className={`border border-b-0 border-zinc-400 w-full ${className ? className : ""}`} />;
};
