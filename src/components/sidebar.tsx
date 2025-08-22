import SidebarLink from "./sidebar-links";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const links = [
  { label: "Home", icon: "Grid", link: "/home" },
  { label: "Calendar", icon: "Calendar", link: "/Project" },
  { label: "Profile", icon: "User", link: "/profile" },
  { label: "Settings", icon: "Settings", link: "/settings" },
];

const Sidebar = () => {
  return (
    <Card className="py-5 h-full">
      <CardHeader>
        <CardTitle className="text-center">Card Title</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-10 items-center ">
        <div className="w-full flex justify-center items-center gap-2">
          {/* <Image/> */}
        </div>
        {links.map((link) => (
          <SidebarLink key={link.link} link={link} />
        ))}
      </CardContent>
    </Card>
  );
};

export default Sidebar;
