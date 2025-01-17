import React, { useContext, useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { API } from "../../utils/config";
import { FaStar } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import img from "../../../public/Vector.png";
import { RiBookFill } from "react-icons/ri";
import { BiHeadphone } from "react-icons/bi";
import { IoMdPhonePortrait } from "react-icons/io";
import { ThemeContext } from "../../context/ThemeContext";
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";

const SinglePage = () => {
  const token = localStorage.getItem("token");
  const [author, setAuthor] = useState(null);
  const exchangeRate = 12000;
  const { isDark } = useContext(ThemeContext);

  const convertToSom = (amount) => {
    const somAmount = amount * exchangeRate;
    return somAmount.toLocaleString("en-US").replace(/,/g, " ");
  };
  const [data, setData] = useState([]);
  const { id, Id } = useParams();

  useEffect(() => {
    API.get(`book/genreId/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) =>
        console.log(err.response?.data?.message || "Xato yuz berdi")
      );
  }, [id]);

  const el = data.find((item) => item.id === parseInt(Id, 10));
  useEffect(() => {
    API.get(`author/authorId/${el?.author_id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => setAuthor(res.data))
      .catch((err) => console.log(err.response.data.message));
  }, [el]);

  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;

    const autoScroll = () => {
      list.scrollBy({ left: 2, behavior: "smooth" });
      if (list.scrollLeft >= list.scrollWidth - list.clientWidth) {
        list.scrollLeft = 0;
      }
    };

    const interval = setInterval(autoScroll, 10);
    return () => clearInterval(interval);
  }, []);

  const books = data.filter((item) => item.genre_id == id);
  const { lang } = useContext(LangContext);

  return (
    <div
      className={` pb-[100px] ${
        isDark ? "bg-[#fff] text-white" : "bg-[#191919] text-[#191919]"
      } min-h-screen transition-colors duration-300`}
    >
      <Header />
      <div>
        {el ? (
          <div className="flex pt-[57px] mb-[50px] pl-[80px] gap-[45px]">
            <img
              src={`https://books-backend-production-6f61.up.railway.app/${el.image}`}
              alt="book image"
              className="w-[519px] h-[670px] rounded-[15px]"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/165x255")
              }
            />
            <div>
              <h1
                id="text-2"
                className={`text-[48px] ${
                  isDark ? "text-white" : "text-[#191919]"
                }`}
              >
                {el.title}
              </h1>
              <div className="flex items-center gap-[15px] relative">
                <p
                  className={`text-customYellow ${
                    isDark ? "text-[#191919]" : "text-white"
                  }`}
                >
                  {author?.first_name} {author?.last_name}
                </p>
                <span
                  className={`flex items-center gap-[7px] ${
                    isDark ? "text-[#191919]" : "text-white"
                  } border-l border-l-1 pl-[10px]`}
                >
                  <FaStar
                    className={isDark ? "text-[#191919]" : "text-white"}
                  />
                  4.1
                </span>
              </div>
              <div className="mt-[35px] flex flex-col gap-[10px]">
                <p className="text-[20px] text-gray-400">
                  {language[lang].singlebook.page}
                  <span
                    className={`ml-[10px] text-[20px] ${
                      isDark ? "text-[#191919]" : "text-white"
                    }`}
                  >
                    {el.page}
                  </span>
                </p>
                <p className="text-[20px] text-gray-400">
                  {language[lang].singlebook.year}

                  <span
                    className={`ml-[10px] text-[20px] ${
                      isDark ? "text-[#191919]" : "text-white"
                    }`}
                  >
                    {el.year}
                  </span>
                </p>
                <p className="text-[20px] text-gray-400">
                  {language[lang].singlebook.janr}

                  <span
                    className={`ml-[10px] text-[20px] ${
                      isDark ? "text-[#191919]" : "text-white"
                    }`}
                  >
                    Tarixiy
                  </span>
                </p>
                <p className="text-[20px] text-gray-400">
                  {language[lang].singlebook.nashr}
                  <span
                    className={`ml-[10px] text-[20px] ${
                      isDark ? "text-[#191919]" : "text-white"
                    }`}
                  >
                    Nihol nashr
                  </span>
                </p>
              </div>

              <p
                className={`text-[16px] text-customYellow mt-[38px] flex items-center content-center gap-[11px] ${
                  isDark ? "text-white" : "text-[#191919]"
                }`}
              >
                {language[lang].singlebook.malumot}

                <FaArrowDownLong
                  className={`text-white ${
                    isDark ? "text-white" : "text-[#191919]"
                  }`}
                />
              </p>
              <img
                src={img}
                width={564}
                height={3}
                alt=""
                id="l"
                className="absolute left-[790px]"
              />
              <p id="k" className={`${isDark ? "text-black" : "text-[#fff]"}`}>
                {el.description}
              </p>
              <p className="text-[16px] text-customYellow">
                {language[lang].singlebook.format}
              </p>
              <div className="flex items-center gap-[61px]">
                <ul className="flex content-center gap-[26px] mt-[28px]">
                  <li
                    className="flex flex-col items-center gap-[10px]"
                    id="pol"
                  >
                    <RiBookFill
                      className={`${
                        isDark ? "text-[#191919]" : "text-white"
                      } text-[25px]`}
                    />
                    <p
                      className={`${
                        isDark ? "text-[#191919]" : "text-white"
                      } text-[16px]`}
                    >
                      {language[lang].singlebook.book}
                    </p>
                    <span
                      className={`ml-[15px] text-center ${
                        isDark ? "text-[#191919]" : "text-white"
                      } text-[16px]`}
                    >
                      {convertToSom(el.price)} so'm
                    </span>
                  </li>
                  <li
                    className="flex flex-col items-center gap-[10px]"
                    id="pol"
                  >
                    <BiHeadphone
                      className={`${
                        isDark ? "text-[#191919]" : "text-white"
                      } text-[25px]`}
                    />
                    <p
                      className={`${
                        isDark ? "text-[#191919]" : "text-white"
                      } text-[16px]`}
                    >
                      {language[lang].singlebook.audio}
                    </p>
                    <span
                      className={`${
                        isDark ? "text-[#191919]" : "text-white"
                      } text-[16px]`}
                    >
                      6:23 soat
                    </span>
                  </li>
                  <li
                    className="flex flex-col items-center gap-[10px]"
                    id="pol"
                  >
                    <IoMdPhonePortrait
                      className={`${
                        isDark ? "text-[#191919]" : "text-white"
                      } text-[25px]`}
                    />
                    <p
                      className={`text-center ${
                        isDark ? "text-black" : "text-[#fff]"
                      } text-[16px]`}
                    >
                      {language[lang].singlebook.elek}
                    </p>
                    <span
                      className={`${
                        isDark ? "text-black" : "text-gray-500"
                      } text-[16px]`}
                    >
                      pdf, epub
                    </span>
                  </li>
                </ul>

                <button className="px-[32px] mt-[25px] py-[16px] bg-customYellow">
                  {language[lang].singlebook.javon}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className={`text-${isDark ? "white" : "#191919"}`}>
            Ma'lumot topilmadi
          </p>
        )}
      </div>

      <div className="ml-[81px] mb-[100px]">
        <ul
          className={`flex content-center gap-[49px] mb-[50px] ${
            isDark ? "text-white" : "text-[#191919]"
          }`}
        >
          <li>
            <NavLink
              className={`${
                isDark ? "text-black" : "text-gray-400"
              } text-[20px]`}
              to={""}
            >
              {language[lang].singlebook.author}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${
                isDark ? "text-black" : "text-gray-400"
              } text-[20px]`}
              to={"iqtibos"}
            >
              {language[lang].singlebook.iqtibos}
            </NavLink>
          </li>
          <li>
            <NavLink
              className={`${
                isDark ? "text-black" : "text-gray-400"
              } text-[20px]`}
              to={"taqriz"}
            >
              {language[lang].singlebook.taqriz}
            </NavLink>
          </li>
        </ul>

        <Outlet />
      </div>

      <div className="ml-[81px]">
        <div className="flex content-center mb-[66px] gap-[822px]">
          <p className="text-customYellow text-[25px]">
            {language[lang].singlebook.yoqishMumkin}
          </p>
          <Link className="text-white text-[25px]" to={"/"}>
            {language[lang].singlebook.all}
          </Link>
        </div>
        <ul
          className="flex gap-[20px] mb-[100px] overflow-x-auto"
          id="list"
          ref={listRef}
        >
          {books?.map((el) => (
            <li className="w-[165px] h-[255px]" id="item2" key={el.id}>
              <Link to={`/book/${el.genre_id}/${el.id}`}>
                <img
                  src={`https://books-backend-production-6f61.up.railway.app/${el.image}`}
                  alt="book image"
                  id="image"
                  className="w-[165px]  h-[155px]"
                  onError={(e) =>
                    (e.target.src = "https://via.placeholder.com/165x255")
                  }
                />
                <div className="pl-[15px] pb-[10px]">
                  <h4
                    id="tti"
                    className="font-['Rotterburg_Stylish_FREE'] w-[130px] text-[#c9ac8c] text-[20px] font-normal leading-[22px] mt-[17px] whitespace-normal break-words"
                  >
                    {el.title}
                  </h4>
                  <p
                    className={`mt-[5px] text-${isDark ? "white" : "gray-300"}`}
                  >
                    {language[lang].singlebook.page}
                    {el.page}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SinglePage;
