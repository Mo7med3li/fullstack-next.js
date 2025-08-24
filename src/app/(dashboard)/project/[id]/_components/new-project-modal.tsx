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
        <Button className="hover:scale-105 transition-all ease-in-out duration-200">
          <Plus /> New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-4">
          <Input
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectModal;
