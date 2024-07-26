import { ReactNode } from "react";

export interface Props {
  children?: ReactNode;
  color?: string;
}

export default function TextMessageBox({ children, color = 'white' }: Props) {
  return (
    <div className={`px-4 py-2 rounded-2xl bg-[${color}] text-2xl self-end shadow`}>
      {children}
    </div>
  );
}
