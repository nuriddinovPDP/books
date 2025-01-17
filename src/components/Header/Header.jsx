import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../../context/Auth";
import img from "../../../public/profile.jpg";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // isDark ni olish uchun
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";
import { API } from "../../utils/config";

export default function Header() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext); // ThemeContext'dan isDark ni olish
  const { lang, setLang } = useContext(LangContext);
  const token = localStorage.getItem("token");
  const [file, setFile] = useState(null);
  useEffect(() => {
    API.get("user/me", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setFile(res.data.image);
      })
      .catch((err) => console.log(err.response.data.message));
  }, [token]);
  const onChange = (e) => {
    if (e.target.value === "logout") {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      navigate("/");
    }
    if (e.target.value === "addbook") {
      navigate("/add-book");
    }
    if (e.target.value === "addauthor") {
      navigate("/add-author");
    }
    if (e.target.value === "profile") {
      navigate("/profile");
    }
  };

  return (
    <header
      className={`pt-[22px] border-b border-gray-300 ${
        isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
      }`}
    >
      <div className="w-[1240px] mx-auto">
        <div className="flex items-center">
          <p
            className={`mb-[10px] ${isDark ? "text-[#191919]" : "text-[#fff]"}`}
            id="p"
          >
            Badiiyat
          </p>
          <ul className="flex ml-[480px] gap-[30px] mr-[350px]">
            <li className="flex gap-[23px]">
              <NavLink
                id="l"
                to={"/"}
                className={({ isActive }) =>
                  isActive
                    ? `border-b border-b-4 pb-[29px] font-[400] ${
                        isDark ? "border-b-black" : "border-b-white"
                      }`
                    : ""
                }
              >
                {language[lang].header.text}
              </NavLink>
            </li>
            <li className="flex">
              <NavLink
                to={"/adiblar"}
                id="l"
                className={({ isActive }) =>
                  isActive
                    ? `border-b border-b-4 pb-[29px] font-[400] ${
                        isDark ? "border-b-black" : "border-b-white"
                      }`
                    : ""
                }
              >
                {language[lang].header.text2}
              </NavLink>
            </li>
          </ul>

          <div className="flex relative mb-[15px]">
            <img
              width={40}
              height={40}
              src={`https://books-backend-production-6f61.up.railway.app/${file}`}
              alt="Profile"
              onError={(e) => (e.target.src = img)}
              className="absolute top-[-8px] left-[30px] rounded-full h-[40px]"
            />
            <select
              className={`${
                isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
              }`}
              onChange={onChange}
            >
              <option value="" selected>
                {" "}
              </option>

              <option value="profile">
                {language[lang].header.select.profile}
              </option>

              <option value="addbook">
                {language[lang].header.select.add_book}
              </option>
              <option value="addauthor">
                {language[lang].header.select.add_author}
              </option>
              <option value="logout">
                {language[lang].header.select.log_out}
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
