"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteTask } from "@/lib/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteTaskModalProps {
  taskId: string;
  taskName: string;
  onDelete?: () => void;
  trigger?: React.ReactNode;
}

const DeleteTaskModal = ({
  taskId,
  taskName,
  onDelete,
  trigger,
}: DeleteTaskModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const router = useRouter();

  const handleDeleteTask = async () => {
    setIsDeleting(true);
    try {
      await deleteTask(taskId);
      toast.success("Task deleted successfully");
      setDeleteDialogOpen(false);
      
      // Call onDelete callback if provided (for optimistic updates)
      if (onDelete) {
        onDelete();
      }
      
      router.refresh();
    } catch (error) {
      console.error("Failed to delete task:", error);
      toast.error("Failed to delete task");
    } finally {
      setIsDeleting(false);
    }
  };

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <DialogTrigger asChild>
        {trigger || defaultTrigger}
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            Delete Task
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            Are you sure you want to delete &ldquo;{taskName}&rdquo;?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setDeleteDialogOpen(false)}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteTask}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white"
          >
            {isDeleting ? "Deleting..." : "Delete Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTaskModal;
