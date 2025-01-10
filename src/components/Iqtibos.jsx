import React, { useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoMdShare } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import img from "../assets/“.png";
export const Iqtibos = () => {
  const [like, setLike] = useState(false);
  return (
    <ul className="flex items-center gap-[80px]">
      <li
        className="bg-customBlack pt-[46px] pl-[40px] flex flex-col w-[600px] rounded-[15px] relative"
        id="it"
      >
        <img className="absolute top-[-10px]" src={img} width={40} alt="" />
        <p className="text-white">
          Inson bolasi ne kunlarni ko‘rmaydi?! Har bir odam o‘z g‘ami bilan
          bo‘lsa, hayotdan ko‘z yumib ketganlarga umr bo‘yi motam tutib o‘tsa,
          bu moddiy olam shu kunlarga yetolarmidi? Hayot to‘lqini ojizlarni
          qirg‘oqqa irg‘itib tashlaydi. Oqimga qarshi suza olganlar, to‘lqinni
          egarlaganlargina ertangi kunga yetib keladi.
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
        className="bg-customBlack pt-[46px] pl-[40px] flex flex-col w-[600px] rounded-[15px] relative h-[215px]"
        id="it"
      >
        <img className="absolute top-[-10px]" src={img} width={40} alt="" />
        <p className="text-white mt-[30px]">
          Yer kurrasida chumolidek mehnat qilayotganlardan ko‘ra, tuproq tagida
          yotganlar ko‘p. Yer qatlami odam suyaklariga to‘lib ketgan.
        </p>
      </li>
    </ul>
  );
};
