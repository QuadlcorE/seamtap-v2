import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { deleteCustomer } from "@/lib/serverlogic";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface DeleteCustomerProps {
  customerId: number;
  customerName: string;
  onDeleteSuccess?: () => void;
}

export function DeleteCustomerDialog({
  customerId,
  customerName,
  onDeleteSuccess,
}: DeleteCustomerProps) {
  const [open, setOpen] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const result = await deleteCustomer(customerId);

      if (result) {
        toast.success("Customer deleted");

        if (onDeleteSuccess) {
          onDeleteSuccess();
        }

        setOpen(false);
      } else {
        toast.error("Failed to delete customer. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const DeleteConfirmation = ({ className }: { className?: string }) => {
    return (
      <div className={cn("flex flex-col gap-6", className)}>
        <p className="text-destructive font-medium">
          Are you sure you want to delete {customerName}?
        </p>
        <p className="text-muted-foreground text-sm">
          This action cannot be undone. All measurements associated with this
          customer will also be permanently deleted.
        </p>
        <div className="flex justify-end gap-3 mt-2">
          {!isDesktop && (
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          )}
          {isDesktop && (
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
          )}
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Customer"}
          </Button>
        </div>
      </div>
    );
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="flex items-center gap-1">
            <Trash2 className="h-4 w-4" />
            Delete Customer
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>
              Confirm deletion of customer and all associated data.
            </DialogDescription>
          </DialogHeader>
          <DeleteConfirmation />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="destructive" className="flex items-center gap-1">
          <Trash2 className="h-4 w-4" />
          Delete Customer
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete Customer</DrawerTitle>
          <DrawerDescription>
            Confirm deletion of customer and all associated data.
          </DrawerDescription>
        </DrawerHeader>
        <DeleteConfirmation className="px-4" />
        <DrawerFooter className="pt-2">
          {/* Footer intentionally left empty as actions are in the form */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
