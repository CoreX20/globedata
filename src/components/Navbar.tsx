import { FloatingNav } from "./ui/FloatingNavbar";
export function Navbar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Explore",
      link: "#explore",
    },
    {
      name: "Ask AI",
      link: "/chat",
    },
  ];
  return (
    <div className="w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
