import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  HomeLayout,
  Landing,
  Register,
  Login,
  DashboardLayout,
  Error,
  Stats,
  AddJob,
  AllJobs,
  Admin,
  Profile,
} from "./pages";

import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { loader as dashboardLoader } from "./pages/user/DashboardLayout";
import { action as addJobAction } from "./pages/jobs/AddJob";
import { loader as allJobsLoader } from "./pages/jobs/AllJobs";
import EditJob, {
  loader as editJobLoader,
  action as editJobAction,
} from "./pages/jobs/EditJob";
import { action as deleteJobAction } from "./pages/jobs/DeleteJob";
import { loader as adminLoader } from "./pages/user/Admin";
import { action as profileAction } from "./pages/user/Profile";
import { loader as statsLoader } from "./pages/user/Stats";
import { ErrorElement } from "./components";

const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true";
  document.body.classList.toggle("dark-theme", isDarkTheme);

  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();
// console.log(isDarkThemeEnabled);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, 
      // duration for validity of query
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },

      {
        path: "login",
        element: <Login />,
        action: loginAction(queryClient),
      },

      {
        element: <Landing />,
        index: true,
      },

      {
        path: "dashboard",
        loader: dashboardLoader(queryClient),
        element: (
          <DashboardLayout
            isDarkThemeEnabled={isDarkThemeEnabled}
            queryClient={queryClient}
          />
        ),
        children: [
          {
            index: true,
            element: <AddJob />,
            action: addJobAction(queryClient),
          },

          {
            path: "stats",
            loader: statsLoader(queryClient),
            element: <Stats />,
            errorElement: <ErrorElement />,
          },

          {
            path: "all-jobs",
            loader: allJobsLoader(queryClient),
            element: <AllJobs />,
            errorElement: <ErrorElement />,
          },

          {
            path: "edit-job/:id",
            loader: editJobLoader(queryClient),
            element: <EditJob />,
            action: editJobAction(queryClient),
          },

          {
            path: "delete-job/:id",
            action: deleteJobAction(queryClient),
          },

          {
            path: "profile",
            element: <Profile />,
            action: profileAction(queryClient),
          },

          {
            path: "admin",
            loader: adminLoader,
            element: <Admin />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
