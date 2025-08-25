"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar } from "lucide-react";
import { createNewTask } from "@/lib/api/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface NewTaskModalProps {
  projectId: string;
  projectName: string;
  trigger?: React.ReactNode;
}

const NewTaskModal = ({
  projectId,
  projectName,
  trigger,
}: NewTaskModalProps) => {
  // States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [due, setDue] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Navigation
  const router = useRouter();

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Task name is required");
      return;
    }

    setIsLoading(true);
    try {
      await createNewTask({
        name: name.trim(),
        projectId,
        description: description.trim() || undefined,
        due: due || undefined,
      });

      toast.success("Task created successfully");
      setName("");
      setDescription("");
      setDue("");
      setOpen(false);
      router.refresh();
    } catch (error) {
      toast.error((error as Error)?.message || "Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  const defaultTrigger = (
    <Button className="transition-all ease-in-out duration-200 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
      <Plus className="h-4 w-4 mr-2" />
      New Task
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>

      <DialogContent className="sm:max-w-md w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            New Task
          </DialogTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add a new task to <span className="font-medium">{projectName}</span>
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label
              htmlFor="task-name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Task Name *
            </label>
            <Input
              id="task-name"
              placeholder="Enter task name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="task-description"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description (optional)
            </label>
            <Textarea
              id="task-description"
              placeholder="Enter task description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400 min-h-[80px]"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="task-due"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Due Date (optional)
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="task-due"
                type="datetime-local"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 pl-10"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
            >
              {isLoading ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskModal;
