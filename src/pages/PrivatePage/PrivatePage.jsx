import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { BiSearchAlt } from "react-icons/bi";
import { useState, useContext, useRef } from "react";
import { ThemeContext } from "../../context/ThemeContext"; // ThemeContext import qilingan

import Header from "../../components/Header/Header";
import Carousel from "../../components/Carousel/Carousel";
import { language } from "../../lang/lang";
import { LangContext } from "../../context/LangContext";
import { InpContext } from "../../context/InputContext";

export default function PrivatePage() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext); // ThemeContext'dan isDark ni olish
  const [inp, setInp] = useState("");
  const { lang, setLang } = useContext(LangContext);
  const { value, setValue } = useContext(InpContext);

  const inputRef = useRef();
  return (
    <div
      className={`${
        isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
      } min-h-screen`}
    >
      <Header />
      <div className="pt-[70px] relative">
        <Carousel />
        <div
          className={`p-[20px] ${
            isDark ? "bg-[#f5f5f5] text-[#191919]" : "bg-[#191919] text-[#fff]"
          } rounded-[8px]`}
          id="box"
        >
          <h4 className="title text-[24px] mb-[10px]">
            {language[lang].search.text}
          </h4>
          <form action="" className="form flex items-center gap-[10px]">
            <input
              className={`p-[10px] rounded-[4px] w-[300px] ${
                isDark ? "bg-[#eaeaea] text-[#191919]" : "bg-[#444] text-[#fff]"
              }`}
              id="inp"
              ref={inputRef}
              type="text"
              onChange={(e) => setValue(inputRef.current.value.toLowerCase())}
              placeholder={language[lang].search.inp}
            />
            <button
              className={`btn5 p-[10px] rounded-[4px] ${
                isDark ? "bg-[#007BFF] text-[#fff]" : "bg-[#555] text-[#fff]"
              }`}
            >
              <BiSearchAlt className="icon text-[20px]" />
              {language[lang].search.btn}
            </button>
          </form>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
