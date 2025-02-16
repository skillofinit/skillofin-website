import { useForm } from "react-hook-form";
import AppDialog from "@/utiles/AppDilaog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FreelancerJobDialogProps {
  onClose: () => void;
}

interface BidFormValues {
  bidAmount: number;
  bidDescription: string;
}

function FreelancerJobDialog({ onClose }: FreelancerJobDialogProps) {
  const { register, handleSubmit } = useForm<BidFormValues>();

  const onSubmit = (data: BidFormValues) => {
    // In a real application, send the bid to your API
    console.log("Bid submitted:", data);
    onClose();
  };

  return (
    <AppDialog onClose={onClose} title="Job Details & Bid" >
      <div className="flex flex-col lg:flex-row gap-6 p-4">
        {/* Left Column: Job Details & Bid Form */}
        <div className="w-full lg:w-2/3 space-y-6">
          {/* Job Details */}
          <div className="p-4 bg-background border rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-2">Build a Next.js Application</h3>
            <p className="text-sm text-foreground">
              We are seeking an experienced developer to create a modern Next.js application with real-time features and a responsive design. Work closely with our design team to deliver a high-quality product.
            </p>
            <div className="mt-3">
              <p className="text-sm">
                <span className="font-semibold">Budget:</span> $3000 - $5000
              </p>
            </div>
          </div>
          {/* Bid Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-background border rounded-lg shadow-sm space-y-4">
            <h4 className="text-xl font-semibold">Place Your Bid</h4>
            <div className="space-y-1">
              <label htmlFor="bidAmount" className="block text-sm font-medium text-foreground">
                Bid Amount (USD)
              </label>
              <Input
                id="bidAmount"
                type="number"
                placeholder="Enter your bid amount"
                {...register("bidAmount", { required: "Bid amount is required" })}
                errorMessage=""
              />
            </div>
            <div className="space-y-1">
              <label htmlFor="bidDescription" className="block text-sm font-medium text-foreground">
                Why You're a Good Fit
              </label>
              <Textarea
                id="bidDescription"
                placeholder="Describe why you are the best candidate for this job"
                {...register("bidDescription", { required: "Please provide a description" })}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">Submit Bid</Button>
            </div>
          </form>
        </div>
        {/* Right Column: Client & Job Overview */}
        <div className="w-full lg:w-1/3">
          <div className="p-4 bg-background border rounded-lg shadow-sm space-y-3">
            <h4 className="text-xl font-semibold mb-3">Client & Job Overview</h4>
            <div className="flex items-center gap-4">
              <img
                src="/client-placeholder.jpg"
                alt="Client"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">ABC Corporation</p>
                <p className="text-sm text-foreground">San Francisco, CA</p>
              </div>
            </div>
            <div className="mt-3 space-y-2">
              <p className="text-sm text-foreground">
                <span className="font-semibold">Client Paid:</span> $1500
              </p>
              <p className="text-sm text-foreground">
                <span className="font-semibold">Experience Level:</span> Intermediate
              </p>
              <p className="text-sm text-foreground">
                <span className="font-semibold">Required Skills:</span> Next.js, React, Node.js, Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppDialog>
  );
}

export default FreelancerJobDialog;
