import { FaTimes } from "react-icons/fa";
import Logo from "./Logo";
import styled from "styled-components";
import NavLinks from "./NavLinks";
import { useDashboardContext } from "../pages/user/DashboardLayout";

const SmallSideBar = () => {
  const { toggleSidebar, showSidebar } = useDashboardContext();

  return (
    <Wrapper>
      <div className={`sidebar-container ${showSidebar ? "show-sidebar" : ""}`}>
        <div className="content">
          <button
            className="close-btn"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>

          <header>
            <Logo />
          </header>

          <NavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }

  .sidebar-container {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
    opacity: 0;
    transition: var(--transition);
    visibility: hidden;
  }

  .show-sidebar {
    z-index: 99;
    opacity: 1;
    visibility: visible;
  }

  .content {
    background: var(--background-secondary-color);
    width: var(--fluid-width);
    height: 95vh;
    border-radius: var(--border-radius);
    padding: 4rem 2rem;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .close-btn {
    position: absolute;
    top: 15px;
    left: 20px;
    background: transparent;
    border: none;
    font-size: 1.65rem;
    color: var(--primary-600);
    cursor: pointer;
  }

  .close-btn:hover {
    opacity: 0.7;
  }

  .nav-links {
    padding-top: 3rem;
    display: flex;
    flex-direction: column;
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: var(--text-secondary-color);
    padding: 1rem 0;
    text-transform: capitalize;
    transition: var(--transition);
  }

  .nav-link:hover {
    color: var(--primary-500);
  }

  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
  }

  .active {
    color: var(--primary-500);
  }
`;

export default SmallSideBar;
