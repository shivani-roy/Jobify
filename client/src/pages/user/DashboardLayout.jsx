import {
  Outlet,
  redirect,
  // useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useContext, useState, createContext, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { BigSideBar, SmallSideBar, Navbar, Loading } from "../../components";
import customFetch from "../../utils/customFetch";
import { useQuery } from "@tanstack/react-query";

const userQuery = {
  queryKey: ["user"],
  queryFn: async () => {
    const response = await customFetch.get("/users/current-user");
    return response.data;
  },
};

export const loader = (queryClient) => async () => {
  try {
    return await queryClient.ensureQueryData(userQuery);
  } catch (error) {
    console.log(error);
    return redirect("/"); 
    // when the cookie expires or the user logs out, user will be redirected to the home page
  }
};

const DashboardContext = createContext();

const Dashboard = ({ isDarkThemeEnabled, queryClient }) => {
  // const { user } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  const { user } = useQuery(userQuery)?.data;

  const [showSidebar, setShowSidebar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled);
  const [isAuthError, setIsAuthError] = useState(false);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);

    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const logoutUser = async () => {
    try {
      await customFetch.get("/auth/logout");
      queryClient.invalidateQueries();
      toast.success("Logging out...");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  customFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        setIsAuthError(true);
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (!isAuthError) return;
    logoutUser();
  }, [isAuthError]);

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />

          <div>
            <Navbar />
            <div className="dashboard-page">
              {isPageLoading ? <Loading /> : <Outlet context={{ user }} />}

              {/* this allows to access user in the nested routes, using dashboard context we can only access it in sidebar (small and big) and navbar */}
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  );
};

const Wrapper = styled.section`
  .dashboard {
    display: grid;
    grid-template-columns: 1fr;
  }

  .dashboard-page {
    width: 90vw;
    margin: 0 auto;
    padding: 2rem 0;
  }

  .loading {
    margin: 10rem auto;
  }

  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }

    .dashboard-page {
      width: 90%;
    }
  }
`;

export const useDashboardContext = () => useContext(DashboardContext);

export default Dashboard;
