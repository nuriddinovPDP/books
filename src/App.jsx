import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import PublicPage from "./pages/PublicPage/PublicPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useAuth } from "./context/Auth";
import PrivatePage from "./pages/PrivatePage/PrivatePage";
import Adiblar from "./components/Adiblar/Adiblar";
import Main from "./components/Main/Main";
import Temuriy from "./components/Temuriy/Temuriy";
import Jadid from "./components/Jadid/Jadid";
import Mustaqil from "./components/Mustaqil/Mustaqil";
import Sovet from "./components/Sovet/Sovet";
import Temuriy2 from "./components/Temuriy/Temury2";
import Jadid2 from "./components/Jadid/Jadid2";
import Mustaqil2 from "./components/Mustaqil/Mustaqil2";
import Sovet2 from "./components/Sovet/Sovet2";
import SinglePage from "./pages/SinglePage/SinglePage";
import { Mualif } from "./components/Mualif";
import { Iqtibos } from "./components/Iqtibos";
import { Taqriz } from "./components/Taqriz";
import SingleAuthor from "./pages/SinglePage/SingleAuthor";
import AddBook from "./pages/AddBook/AddBook";
import AddAuthor from "./pages/AddAuthor/AddAuthor";
import Profile from "./pages/Profile/Profile";
import Account from "./components/Account/Account";
import Security from "./components/Security/Security";
import Settings from "./components/Settings/Settings";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <PrivatePage /> : <PublicPage />,
      children: [
        {
          path: "",
          element: <Main />,
          children: [
            {
              path: "",
              element: <Temuriy />,
            },
            {
              path: "jadid",
              element: <Jadid />,
            },

            {
              path: "mustaqil",
              element: <Mustaqil />,
            },
            {
              path: "sovet",
              element: <Sovet />,
            },
          ],
        },

        {
          path: "/adiblar",
          element: <Adiblar />,
          children: [
            {
              path: "",
              element: <Temuriy2 />,
            },
            {
              path: "jadid",
              element: <Jadid2 />,
            },

            {
              path: "mustaqil",
              element: <Mustaqil2 />,
            },
            {
              path: "sovet",
              element: <Sovet2 />,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/add-book",
      element: <AddBook />,
    },
    {
      path: "/add-author",
      element: <AddAuthor />,
    },
    {
      path: "/profile",
      element: <Profile />,
      children: [
        {
          path: "",
          element: <Account />,
        },
        {
          path: "security",
          element: <Security />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "adiblar/:authorId",
      element: <SingleAuthor />,
    },
    {
      path: "book/:id/:Id",
      element: <SinglePage />,
      children: [
        {
          path: "",
          element: <Mualif />,
        },
        {
          path: "iqtibos",
          element: <Iqtibos />,
        },
        {
          path: "taqriz",
          element: <Taqriz />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
