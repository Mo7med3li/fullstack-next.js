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
    <Button
      onClick={handleLogout}
      className="group relative w-full bg-gradient-to-r from-red-600/20 to-pink-600/20 hover:from-red-600/30 hover:to-pink-600/30 dark:from-red-500/30 dark:to-pink-500/30 dark:hover:from-red-500/40 dark:hover:to-pink-500/40 text-red-300 hover:text-red-200 dark:text-red-200 dark:hover:text-red-100 border border-red-500/30 hover:border-red-400/50 dark:border-red-400/40 dark:hover:border-red-300/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-pink-600/10 dark:from-red-500/20 dark:to-pink-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative flex items-center gap-3">
        <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium">Logout</span>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-pink-500/5 dark:from-red-400/10 dark:to-pink-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Button>
  );
}
