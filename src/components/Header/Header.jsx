import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/Auth";
import img from "../../../public/profile.jpg";
export default function Header() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const onChange = (e) => {
    if (e.target.value == "logout") {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/");
    }
  };
  return (
    <header className="bg-customBlack pt-[22px] border-b border-b-1 border-b-gray-300">
      <div className="w-[1240px]  mx-[auto]">
        <div className="flex items-center ">
          <p className="mb-[10px]" id="p">
            Badiiyat
          </p>
          <ul className="flex ml-[500px] gap-[30px] mr-[350px]">
            <li className="flex gap-[23px]">
              <NavLink
                id="l"
                to={"/"}
                className={({ isActive }) =>
                  isActive ? "border-b border-b-4 border-b-white" : ""
                }
              >
                Bosh sahifa
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to={"/adiblar"}
                id="l"
                className={({ isActive }) =>
                  isActive ? "border-b border-b-4 border-b-white" : ""
                }
              >
                Adiblar
              </NavLink>
            </li>
          </ul>

          <div className="flex relative mb-[15px]">
            <img
              width={40}
              height={40}
              src={img}
              alt=""
              className="absolute top-[-8px] left-[30px] rounded-[50%]"
            />
            <select className="bg-customBlack text-white " onChange={onChange}>
              {" "}
              <option value="" selected>
                {" "}
              </option>
              <option value="profile">Profile</option>
              <option value="addbook">Add book</option>
              <option value="addauthor">Add author</option>
              <option value="logout">Log Out</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
