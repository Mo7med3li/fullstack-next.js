import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/api/api";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <Button onClick={handleLogout} className="bg-zinc-800 w-full">
      <LogOut />
      Logout
    </Button>
  );
}
