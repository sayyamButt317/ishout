import { Card } from "@/components/ui/card";
import { AlertCircleIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface errorProps {
  statuscode: number;
  message: string;
  SendAnotherMessage?: () => void;
  onClose?: () => void;
  error?: {
    response?: {
      data?: {
        error?: string;
        detail?: string;
        message?: string;
      };
    };
  };
}

const Errormessage = ({
  statuscode,
  message,
  SendAnotherMessage,
  onClose,
  error,
}: errorProps) => {
  const getErrorMessage = () => {
    if (error?.response?.data?.error) {
      return error.response.data.error;
    }
    if (error?.response?.data?.detail) {
      return error.response.data.detail;
    }
    if (error?.response?.data?.message) {
      return error.response.data.message;
    }
    return message;
  };

  const actualMessage = getErrorMessage();
  return (
    <div className="w-full max-w-2xl relative">
      <Card className="bg-background/60 border border-gray-800 backdrop-blur rounded-2xl p-4 md:p-8">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-3 left-3 z-10 p-2 rounded-full text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
          <div className="p-3 md:p-4 rounded-full bg-gray-800">
            <AlertCircleIcon className="h-8 w-8 md:h-12 md:w-12 text-error" />
          </div>
          <h1 className="font-sora text-base md:text-lg text-error">
            Oops! Something went wrong
          </h1>
          <p className="text-blue-200 max-w-md text-sm md:text-base">
            We couldn&apos;t process your request at the moment. Please check
            your connection and try again later.
          </p>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 md:p-4 w-full">
            <p className="text-error text-xs md:text-sm">
              <span className="font-semibold">Error {statuscode}:</span>{" "}
              {actualMessage}
            </p>
          </div>
        </div>
        <div className="pt-4 md:pt-6 flex justify-center md:justify-end">
          <Button onClick={SendAnotherMessage}>Send Another Message</Button>
        </div>
      </Card>
    </div>
  );
};

export default Errormessage;
