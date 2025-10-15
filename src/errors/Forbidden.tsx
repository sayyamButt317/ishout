import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const ForbiddenError = () => {
  const navigate = useNavigate();
  return (
    <div className="h-svh">
      <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
        <h1 className="text-[7rem] font-bold leading-tight">403</h1>
        <span className="font-medium">Access Forbidden!</span>
        <p className="text-center text-muted-foreground">
          Sorry, you don&apos;t have permission to access this page. <br />
          Please contact administrator for more information.
        </p>
        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenError;
