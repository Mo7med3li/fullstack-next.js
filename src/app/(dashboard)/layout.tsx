import Sidebar from "@/components/sidebar";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-7 w-full h-full p-5 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Sidebar />
      <div className="col-span-6 p-4 h-full overflow-y-scroll">
        <div className="h-full bg-white/50 dark:bg-gray-800/50 rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
