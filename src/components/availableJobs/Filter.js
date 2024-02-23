import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterBySearch, sortBySalary } from "../../features/jobs/jobsSlice";

export default function Filter() {
  const [searchInp, setSearchInp] = useState("");
  const [salarySort, setSalarySort] = useState("all");

  const dispatch = useDispatch();

  // handle search
  const handleSearch = (e) => {
    setSearchInp(e.target.value);
    dispatch(filterBySearch(e.target.value));
  };

  // sort by salary
  const handleSort = (e) => {
    setSalarySort(e.target.value);
    dispatch(sortBySalary(e.target.value));
  };

  return (
    <div className="md:flex space-y-2 md:space-y-0 justify-between mb-10 ">
      <h1 className="lws-section-title">All Available Jobs</h1>
      <div className="flex gap-4">
        <div className="search-field group flex-1">
          <i className="fa-solid fa-magnifying-glass search-icon group-focus-within:text-blue-500"></i>
          <input
            type="text"
            placeholder="Search Job"
            className="search-input"
            id="lws-searchJob"
            value={searchInp}
            onChange={handleSearch}
          />
        </div>

        <select
          id="lws-sort"
          name="sort"
          autoComplete="sort"
          className="flex-1"
          value={salarySort}
          onChange={handleSort}
        >
          <option value="">Default</option>
          <option value="low-high">Salary (Low to High)</option>
          <option value="high-low">Salary (High to Low)</option>
        </select>
      </div>
    </div>
  );
}
