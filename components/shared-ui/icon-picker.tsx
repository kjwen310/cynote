'use client';

import EmojiPicker from 'emoji-picker-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface IconPickerProps {
  onChange: (icon: string) => void;
  children: React.ReactNode;
  asChild?: boolean;
}

export const IconPicker = ({
  onChange,
  children,
  asChild,
}: IconPickerProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild={asChild}>{children}</PopoverTrigger>
      <PopoverContent className="w-full border-none shadow-none p-0">
        <EmojiPicker
          height={300}
          onEmojiClick={({ emoji }) => onChange(emoji)}
        />
      </PopoverContent>
    </Popover>
  );
};
