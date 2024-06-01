import { useLoaderData } from "react-router-dom";
import { createContext, useContext } from "react";
import customFetch from "../../utils/customFetch";
import { JobsContainer, SearchContainer } from "../../components";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (queryParams) => {
  const { search, jobStatus, jobType, sort, page } = queryParams;

  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "all",
      jobType ?? "all",
      sort ?? "newest",
      page ?? 1,
    ],

    queryFn: async () => {
      const { data } = await customFetch.get("/jobs", {
        params: queryParams,
      });

      return data;
    },
  };
};

export const loader =
  (queryClient) =>
  async ({ request }) => {
    const query = Object.fromEntries(
      new URL(request.url).searchParams.entries()
    );
    // console.log(query);

    await queryClient.ensureQueryData(allJobsQuery(query));
    return { searchValues: { ...query } };
  };

const AllJobsContext = createContext();

const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));

  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
