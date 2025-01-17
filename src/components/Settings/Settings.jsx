import Dropdown from "react-bootstrap/Dropdown";
import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";

export default function Settings() {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const { lang, setLang } = useContext(LangContext);
  const handleClick = () => {
    localStorage.setItem("mode", isDark);
    setIsDark((p) => !p);
  };
  return (
    <div
      className={`pl-[247px] pt-[86px] pb-[1000px] ${
        isDark ? "bg-[#fff]" : "bg-[#191919]"
      }`}
    >
      <h2
        className={`
        text-[28px] font-[600] mb-[32px] ${
          isDark ? "text-[#191919]" : "text-white"
        }
      `}
      >
        {language[lang].profile.settings?.title}
      </h2>
      <div>
        <p className={` mb-[20px] ${isDark ? "text-[#191919]" : "text-white"}`}>
          {language[lang].profile.settings?.text}
        </p>
        <div className="flex flex-col gap-[7px] mb-[20px]">
          <select
            style={{
              fontWeight: "400",
              fontSize: "14px",
              color: "#464e5f",
              width: "708px",
            }}
            className="bg-[#f3f6f9] pt-[12px] pb-[11px] pl-[20px] rounded-[4px]"
            id="lang"
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="uz" selected={"uz"}>
              UZ
            </option>
            <option value="en" selected={lang == "en"}>
              EN
            </option>
            <option value="ru" selected={lang == "ru"}>
              RU
            </option>
          </select>
        </div>
      </div>
      <p className={`${isDark ? "text-[#191919]" : "text-white"} mb-[5px]`}>
        {language[lang].profile.settings?.text2}
      </p>
      <input
        type="checkbox"
        className="hero-input visually-hidden"
        id="mode"
        checked={isDark}
        onChange={handleClick}
      />
      <label className="hero-label" htmlFor="mode">
        <span className="hero-span"></span>
      </label>
    </div>
  );
}
