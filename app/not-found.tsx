import { NotFoundContainer } from '@/components/shared-ui/not-found-container';

export default function NotFound() {
  return (
    <div className="w-screen">
      <NotFoundContainer showBtn={true} />
    </div>
  );
}
