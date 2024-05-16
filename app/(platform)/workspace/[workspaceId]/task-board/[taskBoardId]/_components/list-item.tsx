"use client";

import { TaskListWithTaskCard } from "@/types";
import { ListHeader } from "./list-header";

interface ListItemProps {
    index: number;
    item: TaskListWithTaskCard;
}

export const ListItem = ({
    index,
    item
}: ListItemProps) => {
    return (
        <li className="shrink-0 h-full w-[200px] select-none">
            <div className="w-full rounded-md shadow-md bg-[#f1f2f4] pb-4">
                <ListHeader list={item} />
            </div>
        </li>
    )
}