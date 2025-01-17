import React from "react";
import { useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { FaHome } from "react-icons/fa";
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";

export default function Profile() {
  const location = useLocation();
  const { lang, setLang } = useContext(LangContext);

  const isActive = (path) => {
    const currentPath = location.pathname.endsWith("/")
      ? location.pathname.slice(0, -1)
      : location.pathname;
    const basePath = currentPath.replace("/profile", "");
    return basePath === path;
  };
  const { isDark } = useContext(ThemeContext);
  return (
    <div className="">
      <ul
        className={`flex ${
          isDark ? "bg-[#f3f3f3]" : "bg-[#191919]"
        }  space-x-4`}
      >
        <li className="flex items-center">
          <Link
            to=""
            className={`w-[297px] h-[80px] flex items-center space-x-2 pl-[25px] rounded-md ${
              isActive("")
                ? "bg-[#fff] text-black"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <span
              className={`w-[35px] h-[35px] flex items-center rounded-[4px] justify-center font-bold ${
                isActive("")
                  ? "bg-[#152540] text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              1
            </span>

            <span className="font-semibold">
              {language[lang].profile?.text}
            </span>
          </Link>
        </li>

        {/* Security */}
        <li className="flex items-center">
          <Link
            to="security"
            className={`w-[297px] h-[80px] flex items-center space-x-2 pl-[25px] rounded-md ${
              isActive("/security")
                ? "bg-[#fff] text-black"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <span
              className={`w-[35px] h-[35px] rounded-[4px] flex items-center justify-center font-bold ${
                isActive("/security")
                  ? "bg-[#152540] text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              2
            </span>
            <span className="font-semibold">
              {language[lang].profile?.text2}
            </span>
          </Link>
        </li>

        {/* Settings */}
        <li className="flex items-center">
          <Link
            to="settings"
            className={`w-[297px] h-[80px] flex items-center space-x-2 pl-[25px] rounded-md ${
              isActive("/settings")
                ? "bg-[#fff] text-black"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <span
              className={`w-[35px] h-[35px] rounded-[4px] flex items-center justify-center font-bold ${
                isActive("/settings")
                  ? "bg-[#152540] text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              3
            </span>
            <span className="font-semibold">
              {language[lang].profile?.text3}
            </span>
          </Link>
        </li>
        <li className="pl-[380px] pt-[23px]">
          <Link to={"/"} className="">
            <FaHome
              className={`w-[31px] h-[30px] ${
                isDark ? "text-black" : "text-white"
              } `}
            />
          </Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
