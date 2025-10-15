import { Button } from '@/src/components/ui/button';
import { useNavigate } from 'react-router';

interface InternalErrorProps {
  message?: string;
  showBackButton?: boolean;
}

const InternalError = ({
  message = "We're having some technical issues. Please try again later.",
  showBackButton = true,
}: InternalErrorProps) => {
  const navigate = useNavigate();

  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">500</h1>
        <span className="font-medium">Oops! Something went wrong!</span>
        <p className="text-center text-muted-foreground">{message}</p>
        <div className="mt-6 flex gap-4">
          {showBackButton && (
            <Button variant="outline" onClick={() => navigate(-1)}>
              Go Back
            </Button>
          )}
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
};

export default InternalError;
