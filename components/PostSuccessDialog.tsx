import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

type PostSuccessDialogProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const PostSuccessDialog: React.FC<PostSuccessDialogProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const router = useRouter();

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>🌟 Kudos Sent Successfully! 🌟</DialogTitle>
        </DialogHeader>
        <div>
          Your message of appreciation has been delivered!
          <br></br>
          Thanks for taking the time to recognize your teammate's hard work and
          dedication.
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="/success.gif"
            alt={"success"}
            width={400}
            height={200}
          ></Image>
        </div>
        <div>Remember, a little kudos goes a long way!</div>
        <div className="flex justify-end">
          <Button
            className="w-1/4 flex justify-center"
            variant="default"
            onClick={() => router.push("/dashboard")}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostSuccessDialog;
