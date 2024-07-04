'use client';

import { useState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Loader2 } from 'lucide-react';

import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import { defaultPickerImages } from '@/constant/default-picker-image';

interface ImagePickerProps {
  id: string;
  onChange: (imageStr: string) => void;
  errors?: Record<string, string[] | undefined>;
}

export const ImagePicker = ({ id, onChange, errors }: ImagePickerProps) => {
  const { pending } = useFormStatus();
  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultPickerImages);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ['317099'],
          count: 9,
        });
        if (result && result.response) {
          const newImages = result.response as Array<Record<string, any>>;
          setImages(newImages);
        } else {
          console.log('UNSPLASH_ERROR', 'Fail to load unsplash');
        }
      } catch (error) {
        console.log('UNSPLASH_ERROR', error);
        setImages(defaultPickerImages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'relative aspect-video cursor-pointer transition bg-muted group hover:opacity-75',
              pending && 'cursor-auto opacity-50 hover:opacity-50'
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
              onChange(`${image.id}|${image.urls.thumb}|${image.urls.full}`);
            }}
          >
            <Image
              fill
              src={image.urls.thumb}
              sizes="(max-width: 768px) 100vw"
              alt="image"
              className="rounded-sm object-cover"
            />
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute w-full text-[10px] truncate text-white hover:underline bottom-0 p-1 bg-black/50 opacity-0 group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
            {image.id === selectedImageId && (
              <div className="absolute flex justify-center items-center w-full h-full inset-y-0 bg-black/30">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
