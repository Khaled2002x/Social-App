import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";
import { useContext } from "react";
import { NavLink, replace, useNavigate } from "react-router-dom";
import { Context } from "../../Context";
import Loading from "../post/spinner";
export default function Navbarjsx() {
  const navigate = useNavigate();
  const { SetToken } = useContext(Context);
  function Logout() {
    localStorage.removeItem("token");
    SetToken(null);
    console.log("khaled");
    navigate("/auth/signin", replace);
  }
  const { User } = useContext(Context);

  const { data, isLoading } = User;

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit text-4xl">LinkedPost</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavLink
          to={"/"}
          end
          className={({ isActive }) => {
            return isActive ? "bg-gray-300 rounded-2xl p-3 text-black" : "";
          }}
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive ? "bg-gray-300 rounded-2xl p-3 text-black" : "";
          }}
          to={"/Profile"}
        >
          profile
        </NavLink>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">
                {isLoading ? <Loading /> : data.user.email}
              </p>
            </DropdownItem>

            <DropdownItem onClick={() => Logout()} key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
