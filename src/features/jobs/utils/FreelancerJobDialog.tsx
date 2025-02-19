import { useForm } from "react-hook-form";
import AppDialog from "@/utiles/AppDilaog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { jobPostType } from "@/types/jobTypes";
import { FiDollarSign } from "react-icons/fi";
import { useSubmitBid } from "@/hooks/userHooks";

interface FreelancerJobDialogProps {
  onClose: () => void;
  job: jobPostType;
}

interface BidFormValues {
  bidAmount: number;
  bidDescription: string;
}

function FreelancerJobDialog({ onClose, job }: FreelancerJobDialogProps) {
  const { register, handleSubmit, formState } = useForm<BidFormValues>();
  const { errors } = formState;
  const { isPending, submitBid } = useSubmitBid();

  const onSubmit = (data: BidFormValues) => {
    submitBid({
      ...data,
      projectId:job.id

    },{
      onSuccess(data) {
          if(data?.message === "SUCCESS"){
            onClose()
          }
      },
    });
    // onClose();
  };

  return (
    <AppDialog onClose={onClose} title="Job Details & Bid">
      <div className="flex flex-col lg:flex-row lg:p-6">
        {/* Left Column: Job Details & Bid Form */}
        <div className="w-full  space-y-6">
          {/* Job Details */}
          <div className="p-4 bg-background border rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-2">{job.title}</h3>
            <p className="text-sm text-foreground">{job.description}</p>
            <div className=" gap-3 items-center mt-5 hidden lg:flex">
              {job?.skillsRequired?.map((skill: string, index: number) => {
                return (
                  <div
                    key={index}
                    className="px-2 py-1 rounded-full bg-foreground/5"
                  >
                    {skill}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-2 mt-2">
              <FiDollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium">
                Budget: $
                {`${
                  job.budget
                    ? `${job.budget} - Fixed price`
                    : `${job.costPerHour} /Hr`
                }`}
              </span>
            </div>
          </div>
          {/* Bid Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 bg-background border rounded-lg shadow-sm space-y-4"
          >
            <h4 className="text-xl font-semibold">Place Your Bid</h4>
            <div className="space-y-1">
              <label
                htmlFor="bidAmount"
                className="block text-sm font-medium text-foreground"
              >
                Bid Amount (USD)
              </label>
              <Input
                id="bidAmount"
                type="number"
                placeholder="Enter your bid amount"
                {...register("bidAmount", {
                  required: "Bid amount is required",
                })}
                errorMessage={errors?.bidAmount?.message as string}
              />
            </div>
            <div className="space-y-1">
              <label
                htmlFor="bidDescription"
                className="block text-sm font-medium text-foreground"
              >
                Why You're a Good Fit
              </label>
              <div className="flex flex-col w-full">
                <Textarea
                  id="bidDescription"
                  placeholder="Describe why you are the best candidate for this job"
                  {...register("bidDescription", {
                    required: "Please provide a description",
                  })}
                />
                <div className="text-destructive ml-3">
                  {errors?.bidDescription?.message as string}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <Button isPending={isPending} type="submit">
                Submit Bid
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppDialog>
  );
}

export default FreelancerJobDialog;
