import Sidebar from "@/components/sidebar";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-7 w-full h-full p-5 candy-mesh">
      <Sidebar />
      <div className="col-span-6 p-4 h-full overflow-y-scroll">{children}</div>
    </div>
  );
}
