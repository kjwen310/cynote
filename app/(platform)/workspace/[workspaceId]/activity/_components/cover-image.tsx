import { CoverImageContainer } from '@/components/shared-ui/cover-image-container';

interface CoverImageProps {
  imageUrl: string;
}

export const CoverImage = ({ imageUrl }: CoverImageProps) => {
  return <CoverImageContainer imageUrl={imageUrl} />;
};
