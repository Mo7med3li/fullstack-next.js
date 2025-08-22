import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import getData from "../_api/get-user-data";

const Greeting = async () => {
  // User Data
  const user = await getData();

  return (
    <Card className="w-full py-4 relative p-2">
      <div className="mb-4">
        {/* Name */}
        <h1 className="text-3xl text-gray-700 font-bold mb-4">
          Hello, {user?.firstName}!
        </h1>
        {/* Description */}
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      {/* Action */}
      <div>
        <Button size="lg">Today Schedule</Button>
      </div>
    </Card>
  );
};

export default Greeting;
