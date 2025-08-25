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
import { Plus } from "lucide-react";
import { createNewProject } from "@/lib/api/api";
import { useRouter } from "next/navigation";

const NewProjectModal = () => {
  // States
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  //   Navigation
  const router = useRouter();

  //   Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createNewProject(name);

    setName("");
    setOpen(false);
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="transition-all ease-in-out duration-200 w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white">
          <Plus /> New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-gray-100">
            New Project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-4">
          <Input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
          >
            Create
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
