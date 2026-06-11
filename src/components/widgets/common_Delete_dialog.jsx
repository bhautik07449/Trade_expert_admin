import React from "react";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { PiSealWarningFill } from "react-icons/pi";
import CommonDialog from "../widgets/common_dialog";

const Delete = ({ isOpen, setIsOpen, isDelete, handleDelete }) => {

  return (
    <CommonDialog isOpen={isOpen} size="sm" onClose={() => setIsOpen("")}>
      <div className="flex items-center justify-center">
        <PiSealWarningFill className="lg:text-7xl text-5xl text-destructive" />
      </div>
      <DialogHeader className="py-5">
        <DialogTitle className="text-2xl text-center">
          Are you sure?
        </DialogTitle>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Are you sure you want to delete this item?
        </p>
      </DialogHeader>
      <DialogFooter className="grid grid-cols-2">
        <DialogClose asChild>
          <Button type="button" variant="outline" className="w-full" >
            close
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button
            onClick={handleDelete}
            type="button"
            variant="destructive" className="w-full"
          >
            delete
          </Button>
        </DialogClose>
      </DialogFooter>
    </CommonDialog>
  );
};

export default Delete;