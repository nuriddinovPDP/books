import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext"; // ThemeContext import
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";

export default function Adiblar() {
  const { isDark } = useContext(ThemeContext); // isDark qiymatini olish
  const { lang, setLang } = useContext(LangContext);

  return (
    <div
      className={`pt-[60px] pl-[150px] mt-[100px] pb-[100px] ${
        isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
      }`}
    >
      <h2
        id="tit"
        className={`ml-[390px] ${isDark ? "text-[#191919]" : "text-[#fff]"}`}
      >
        {language[lang].category.title}
      </h2>
      <ul className="flex items-center gap-[40px] ml-[201px] mt-[20px] mb-[40px]">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${
                    isDark ? "text-customYellow" : "text-customYellow"
                  } text-[20px]`
                : `${isDark ? "text-gray-700" : "text-gray-500"} text-[20px]`
            }
            to={""}
          >
            {language[lang].category.temuriy}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${
                    isDark ? "text-[#FFC107]" : "text-customYellow"
                  } text-[20px]`
                : `${isDark ? "text-gray-700" : "text-gray-500"} text-[20px]`
            }
            to={"jadid"}
          >
            {language[lang].category.jadid}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${
                    isDark ? "text-[#FFC107]" : "text-customYellow"
                  } text-[20px]`
                : `${isDark ? "text-gray-700" : "text-gray-500"} text-[20px]`
            }
            to={"sovet"}
          >
            {language[lang].category.sovet}
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${
                    isDark ? "text-[#FFC107]" : "text-customYellow"
                  } text-[20px]`
                : `${isDark ? "text-gray-700" : "text-gray-500"} text-[20px]`
            }
            to={"mustaqil"}
          >
            {language[lang].category.mustaqil}
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
