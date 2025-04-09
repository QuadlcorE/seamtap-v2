"use client";

import * as React from "react";
import { useMediaQuery } from "@custom-react-hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { deleteCustomer } from "@/lib/serverlogic";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function DeleteCustomer({
  open,
  onOpenChange,
  customer_id,
  handleDeletion,
}: Readonly<{
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  customer_id: number;
  handleDeletion: () => void;
}>) {
  const [internalOpen, setInternalOpen] = React.useState(false);

  // Use external open state if provided, otherwise use internal state
  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const str1 =
    "Delete this customer permernently, this action cannot be undone!";

  // States for handling deletion
  const [deleting, setDeleting] = React.useState<boolean>(false);
  const [deleted, setDeleted] = React.useState<boolean>(false);

  // Close the dialog or drawer when deletion is successful
  React.useEffect(() => {
    if (deleted) {
      setOpen(false);
      toast.success("Customer deleted successfully");
    }
  }, [deleted, setOpen]);

  // Delete customer
  const deleteCustomers = async () => {
    setDeleting(true);
    try {
      const customerData = await deleteCustomer(customer_id);
      if (!customerData || !customerData[0] || !customerData[1]) {
        toast.error("Failed to delete data");
        throw new Error("Unable to delete Data");
      }
      setDeleted(true);
      handleDeletion();
    } catch (error) {
      console.error("Error loading families:", error);
      toast.error("Failed to load families");
    } finally {
      setDeleting(false);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Customer</DialogTitle>
            <DialogDescription>{str1}</DialogDescription>
          </DialogHeader>
          {/* <ProfileForm /> */}
          <Button variant="destructive" onClick={deleteCustomers} disabled={deleting} >
            {deleting ? (
              <Loader2 className="animate-spin">Deleting</Loader2>
            ) : (
              <>Delete</>
            )}
          </Button>
        </DialogContent>
        <DialogFooter className="pt-2"></DialogFooter>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Delete Customer</DrawerTitle>
          <DrawerDescription>{str1}</DrawerDescription>
        </DrawerHeader>
        {/* <ProfileForm className="px-4" /> */}
        <Button variant="destructive" onClick={deleteCustomers} disabled={deleting} >
          {deleting ? (
            <Loader2 className="animate-spin">Deleting</Loader2>
          ) : (
            <>Delete</>
          )}
        </Button>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
