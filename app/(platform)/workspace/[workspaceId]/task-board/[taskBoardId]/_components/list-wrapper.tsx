"use client";

interface ListWrapperProps {
  children: React.ReactNode;
}


export const ListWrapper = ({ children }: ListWrapperProps) => {
    return (
        <li className="shrink-0 h-full w-[200px] select-none">
            {children}
        </li>
    )
}