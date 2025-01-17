import React, { useContext, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import img from "../assets/“.png";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";
import { ThemeContext } from "../context/ThemeContext";
import { LangContext } from "../context/LangContext";
import { language } from "../lang/lang";
export const Iqtibos = () => {
  const [like, setLike] = useState(false);
  const { isDark } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  return (
    <ul className="flex items-center gap-[80px]">
      <li
        className={` pt-[46px] pl-[40px] flex flex-col w-[600px] rounded-[15px] relative ${
          isDark ? "bg-white" : "bg-[#191919]"
        }`}
        id="it"
      >
        <img className="absolute top-[-10px]" src={img} width={40} alt="" />
        <p className={`${isDark ? "text-[#191919]" : "text-[#fff]"}`}>
          {language[lang].singlebook.iqtibos2.text}
        </p>
        <div className="mb-[20px] mt-[10px] ml-[480px] flex gap-[11px]">
          <button onClick={() => setLike(!like)}>
            {like ? (
              <FaHeart className="text-red-500 text-[20px]" />
            ) : (
              <FaRegHeart className="text-white text-[20px]" />
            )}
          </button>
          <button>
            <IoMdShare className="text-white text-[20px]" />
          </button>
        </div>
      </li>
      <li
        className={`h-[216px] pt-[46px] pl-[40px] flex flex-col w-[600px] rounded-[15px] relative ${
          isDark ? "bg-white" : "bg-[#191919]"
        }`}
        id="it"
      >
        <img className="absolute top-[-10px]" src={img} width={40} alt="" />
        <p className={`${isDark ? "text-[#191919]" : "text-[#fff]"}`}>
          {language[lang].singlebook.iqtibos2.text2}
        </p>
      </li>
    </ul>
  );
};
