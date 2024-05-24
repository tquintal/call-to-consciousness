import React from "react";
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

export const Title = ({ children }: { children: ReactNode }) => <h1 className="font-semibold text-2xl xl:col-span-2">{children}</h1>;

export const SubTitle = ({ children }: { children: ReactNode }) => <h2 className="font-semibold text-xl">{children}</h2>;

export const SmallerTitle = ({ children }: { children: ReactNode }) => <h3 className="font-semibold">{children}</h3>;

export const Divider = ({ className }: { className?: string }) => (
  <div className={`border border-b-0 border-zinc-400 w-full ${className ? className : ""}`} />
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(props, ref) {
  const { className, ...rest } = props;
  return <input {...rest} ref={ref} className={`p-2 w-full h-fit outline-none border border-black ${className || ""}`} />;
});

export { Input };

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(props, ref) {
  const { className, ...rest } = props;
  return <textarea {...rest} ref={ref} className={`min-h-52 w-full outline-none border border-black p-2 ${className || ""}`} />;
});

export { TextArea };

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type?: "button" | "submit" | "reset";
}

export const Button = ({ props, children }: { props: ButtonProps; children: ReactNode }) => {
  const { className, ...rest } = props;

  return (
    <button {...rest} className={`border p-3 border-black bg-white ${className || ""}`}>
      {children}
    </button>
  );
};
