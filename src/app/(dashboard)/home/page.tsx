import React, { Suspense } from "react";
import Greeting from "./_components/greeting";
import GreetingsSkeleton from "@/lib/skeleton/greeting.skeleton";

export default function page() {
  return (
    <div className="w-full h-full  overflow-y-auto pr-6">
      <div className=" h-full items-stretch justify-center min-h-[content]">
        {/* Greeting component */}
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>

        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          <div className="w-1/3 p-3">{/* <NewProject /> */}</div>
        </div>

        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">{/* <TasksCard /> */}</div>
        </div>
      </div>
    </div>
  );
}
