import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleJob from "./SingleJob";
import { fetchJobs } from "../../features/jobs/jobsSlice";
import Filter from "./Filter";

export default function AvailableJobs() {
  const { jobsFilter, isLoading, isError, error } = useSelector(
    (state) => state.job
  );
  const dispatch = useDispatch();

  // initial render
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // decide to render
  let content;
  if (isLoading) content = <div>Loading...</div>;
  if (isError) content = <div>{error}</div>;
  if (!isLoading && !isError && jobsFilter?.length === 0)
    content = <div>jobsFilter not found!</div>;
  if (!isLoading && !isError && jobsFilter?.length > 0) {
    content = jobsFilter?.map((job) => <SingleJob key={job.id} job={job} />);
  }

  return (
    <div className="lg:pl-[14rem]  mt-[5.8125rem]">
      <main className="max-w-3xl rounded-lg  mx-auto relative z-20 p-10 xl:max-w-none bg-[#1E293B]">
        <Filter />
        <div className="jobs-list">{content}</div>
      </main>
    </div>
  );
}
