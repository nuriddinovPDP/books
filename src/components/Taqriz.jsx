import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LangContext } from "../context/LangContext";
import { language } from "../lang/lang";

export const Taqriz = () => {
  const { isDark } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  return (
    <div
      className={`w-[1000px] pt-[15px] pl-[30px] rounded-[15px] pb-[50px] pr-[70px] ${
        isDark ? "bg-white" : "bg-[#191919]"
      }`}
      id="it"
    >
      <p className={`text-[20px] ${isDark ? "text-black" : "text-[#fff]"}`}>
        {language[lang].singlebook.taqriz2}
      </p>
    </div>
  );
};
