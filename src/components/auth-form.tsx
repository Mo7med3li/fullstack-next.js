"use client";

import { register, signin } from "@/lib/api/api";
import { registerContent, signContent } from "@/lib/constant/auth.constant";

import { FormEvent, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const initial = { email: "", password: "", firstName: "", lastName: "" };

const AuthForm = ({ mode }: { mode: string }) => {
  // States
  const [formState, setFormState] = useState({ ...initial });

  // Navigation
  const router = useRouter();

  // Handlers
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (mode === "register") {
      try {
        await register(formState);
        toast.success("Account created successfully");
        router.push("/signin");
      } catch (e) {
        console.log(e);

        toast.error((e as Error)?.message || "Registration failed");
      }
    } else {
      try {
        await signin(formState);
        toast.success("Login success");
        router.push("/home");
      } catch (e) {
        toast.error((e as Error)?.message || "Login failed");
      }
    }
    setFormState({ ...initial });
  };

  //Variables
  const content = mode === "register" ? registerContent : signContent;

  return (
    <Card className="shadow-lg shadow-gray-200/50 bg-white dark:bg-gray-800 p-4 border-gray-200 dark:border-gray-700">
      {/* Header */}
      <CardHeader>
        {/* Title */}
        <CardTitle>
          <h2 className="text-2xl md:text-3xl text-center text-nowrap text-gray-800 dark:text-gray-100">
            {content.header}
          </h2>
        </CardTitle>

        {/* Description */}
        <CardDescription>
          <p className="tex-lg text-gray-600 dark:text-gray-400 text-center">
            {content.subheader}
          </p>
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <form onSubmit={handleSubmit} className="py-2 space-y-5 md:w-[450px] ">
          {mode === "register" && (
            <div className="flex flex-col md:flex-row justify-between gap-5 md:gap-2">
              {/* FirstName */}
              <div className="space-y-2 flex-1">
                <div className="text-lg ml-2 text-gray-700 dark:text-gray-300">
                  First Name
                </div>
                <Input
                  required
                  placeholder="First Name"
                  value={formState.firstName}
                  className="border-solid border-gray-300 dark:border-gray-600 border-2 px-6 py-2 text-lg rounded-3xl w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, firstName: e.target.value }))
                  }
                />
              </div>
              {/* LastName */}
              <div className="space-y-2 flex-1">
                <div className="text-lg ml-2 text-gray-700 dark:text-gray-300">
                  Last Name
                </div>
                <Input
                  required
                  placeholder="Last Name"
                  value={formState.lastName}
                  className="border-solid border-gray-300 dark:border-gray-600 border-2 px-6 py-2 text-lg rounded-3xl w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, lastName: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
          {/* Email */}
          <div className="space-y-2">
            <div className="text-lg ml-2 text-gray-700 dark:text-gray-300">
              Email
            </div>
            <Input
              required
              type="email"
              placeholder="Email"
              value={formState.email}
              className="border-solid border-gray-300 dark:border-gray-600 border-2 px-6 py-2 text-lg rounded-3xl w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              onChange={(e) =>
                setFormState((s) => ({ ...s, email: e.target.value }))
              }
            />
          </div>
          {/* Password */}
          <div className="space-y-2">
            <div className="text-lg ml-2 text-gray-700 dark:text-gray-300">
              Password
            </div>
            <Input
              required
              value={formState.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray-300 dark:border-gray-600 border-2 px-6 py-2 text-lg rounded-3xl w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
              onChange={(e) =>
                setFormState((s) => ({ ...s, password: e.target.value }))
              }
            />
          </div>
          <div className="flex flex-col  md:flex-row items-center gap-2 justify-between">
            <div>
              <span>
                <Link
                  prefetch
                  href={content.linkUrl}
                  className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-700 dark:hover:text-blue-300"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            {/* ActionBtn */}
            <div className="-order-1 md:order-none w-full md:w-auto">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                type="submit"
              >
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
