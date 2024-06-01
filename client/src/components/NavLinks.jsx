import { NavLink } from "react-router-dom";
import links from "../utils/Links";
import { useDashboardContext } from "../pages/user/DashboardLayout";

const NavLinks = ({ isBigSideBar }) => {
  const { user, toggleSidebar } = useDashboardContext();
  const { role } = user;

  return (
    <div className="nav-links">
      {links.map(({ text, icon, path }) => {
        if (role !== "admin" && path === "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className="nav-link"
            onClick={isBigSideBar ? null : toggleSidebar}
            end // to only show one active link at a time (or add-job will always be active)
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
