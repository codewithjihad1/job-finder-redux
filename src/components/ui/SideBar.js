import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchJobs, filterJobs } from "../../features/jobs/jobsSlice";

export default function SideBar() {
  const dispatch = useDispatch();

  // filter jobs by type
  const handleFilter = (val) => {
    dispatch(filterJobs(val));
  };

  return (
    <div className="sidebar">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link
              to="/"
              className="main-menu menu-active"
              id="lws-alljobs-menu"
              onClick={() => dispatch(fetchJobs())}
            >
              <i className="fa-solid fa-briefcase"></i>
              <span> All Available Jobs</span>
            </Link>
            <ul className="space-y-6 lg:space-y-2 ">
              <li>
                <Link
                  to="/"
                  className="sub-menu"
                  id="lws-internship-menu"
                  onClick={() => handleFilter("Internship")}
                >
                  <i className="fa-solid fa-stop !text-[#FF5757]"></i>
                  Internship
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="sub-menu"
                  id="lws-fulltime-menu"
                  onClick={() => handleFilter("Full Time")}
                >
                  <i className="fa-solid fa-stop !text-[#FF8A00]"></i>
                  Full Time
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="sub-menu"
                  id="lws-remote-menu"
                  onClick={() => handleFilter("Remote")}
                >
                  <i className="fa-solid fa-stop !text-[#56E5C4]"></i>
                  Remote
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/addOrEdit" className="main-menu" id="lws-addJob-menu">
              <i className="fa-solid fa-file-circle-plus"></i>
              <span>Add NewJob</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
