import React from "react";
import { Navbar, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Menu() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);


  return (
    <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center gap-x-1">
          <Link to="/addspend">
            <Button variant="text" size="sm" className="hidden lg:inline-block">
              <span>Add Spend</span>
            </Button>
          </Link>
          <Link to="/home">
            <Button variant="gradient" size="sm" className="hidden lg:inline-block">
              <span>Home</span>
            </Button>
          </Link>
        </div>
      </Navbar>
    </div>
  );
}
