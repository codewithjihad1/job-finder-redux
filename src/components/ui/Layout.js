import SideBar from "./SideBar";
import logoImage from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <>
      <nav className="max-w-[90rem] mx-auto py-4 fixed top-0 w-full left-1/2 -translate-x-1/2 px-4 md:px-0">
        <Link to="/">
          <img src={logoImage} alt="logo" />
        </Link>
      </nav>
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 md:px-8 ">
        <SideBar />

        {children}
      </div>
    </>
  );
}
