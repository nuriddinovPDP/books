import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { API } from "../../utils/config";
import { FaStar } from "react-icons/fa";
import { FaArrowDownLong } from "react-icons/fa6";
import img from "../../../public/Vector.png";
import { RiBookFill } from "react-icons/ri";
import { BiHeadphone } from "react-icons/bi";
import { IoMdPhonePortrait } from "react-icons/io";

const SinglePage = () => {
  const token = localStorage.getItem("token");
  const [author, setAuthor] = useState(null);
  const exchangeRate = 12000;

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
        console.log(res.data);
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
  // console.log(author);
  console.log(el);
  const listRef = useRef(null);

  useEffect(() => {
    const list = listRef.current;

    const autoScroll = () => {
      list.scrollBy({ left: 2, behavior: "smooth" }); // Har bir harakatda 2px skroll
      if (list.scrollLeft >= list.scrollWidth - list.clientWidth) {
        list.scrollLeft = 0; // Skroll boshidan boshlanadi
      }
    };

    const interval = setInterval(autoScroll, 10); // 10ms da skroll harakati
    return () => clearInterval(interval); // Tozalash
  }, []);

  const books = data.filter((item) => item.genre_id == id);
  console.log(books);
  console.log(author);
  return (
    <>
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
              <h1 id="text-2" className="text-[48px]">
                {el.title}
              </h1>
              <div className="flex items-center gap-[15px] relative	">
                <p className=" text-customYellow">
                  {author?.first_name} {author?.last_name}
                </p>
                <span className="flex items-center gap-[7px] text-white border-l border-l-1 pl-[10px] ">
                  <FaStar className=" text-white " /> 4.1
                </span>
              </div>
              <div className="mt-[35px] flex flex-col gap-[10px]">
                <p className="text-[20px] text-gray-400">
                  Sahifalar soni:{" "}
                  <span className="ml-[10px] text-[20px] text-white">
                    {el.page}
                  </span>
                </p>
                <p className="text-[20px] text-gray-400">
                  Chop etilgan:{" "}
                  <span className="ml-[10px] text-[20px] text-white">
                    {el.year}
                  </span>
                </p>
                <p className="text-[20px] text-gray-400">
                  Janri:{" "}
                  <span className="ml-[10px] text-[20px] text-white">
                    Tarixiy
                  </span>
                </p>
                <p className="text-[20px] text-gray-400">
                  Nashriyot:{" "}
                  <span className="ml-[10px] text-[20px] text-white">
                    Nihol nashr
                  </span>
                </p>
              </div>
              <p className="text-[16px] text-customYellow mt-[38px] flex items-center content-center gap-[11px]">
                To'liq ma'lumot{" "}
                <FaArrowDownLong className="text-white text-[13px]" />
              </p>
              <img
                src={img}
                width={564}
                height={3}
                alt=""
                id="l"
                className="absolute left-[790px]"
              />
              <p id="k">{el.description}</p>
              <p className="text-[16px] text-customYellow">Mavjut formatlar</p>
              <div className="flex items-center gap-[140px]">
                <ul className="flex content-center gap-[26px] mt-[28px]">
                  <li className="flex flex-col items-center gap-[10px]">
                    <RiBookFill className="text-white text-[25px]" />
                    <p className="text-white text-[16px]">Qog’oz kitob</p>
                    <span className="text-gray-300 text-[16px]">
                      {convertToSom(el.price)} so'm
                    </span>
                  </li>
                  <li className="flex flex-col items-center gap-[10px]">
                    <BiHeadphone className="text-white text-[25px]" />

                    <p className="text-white text-[16px]">Audiokitob</p>
                    <span className="text-gray-300 text-[16px]">6:23 soat</span>
                  </li>{" "}
                  <li className="flex flex-col items-center gap-[10px]">
                    <IoMdPhonePortrait className="text-white text-[25px]" />

                    <p className="text-white text-[16px]">Elektron</p>
                    <span className="text-gray-300 text-[16px]">pdf, epub</span>
                  </li>
                </ul>
                <button className="px-[32px] mt-[25px] py-[16px] bg-customYellow">
                  Javonga qo’shish
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p>Ma'lumot topilmadi</p>
        )}
      </div>

      <div className="ml-[81px] mb-[100px]">
        <ul className="flex content-center gap-[49px] mb-[50px]">
          <li>
            <NavLink className={"text-gray-400 text-[20px]"} to={""}>
              Mualif haqida
            </NavLink>
          </li>
          <li>
            <NavLink className={"text-gray-400 text-[20px]"} to={"iqtibos"}>
              Kitobdan iqtiboslar
            </NavLink>
          </li>{" "}
          <li>
            <NavLink className={"text-gray-400 text-[20px]"} to={"taqriz"}>
              Kitobxonalar taqrizi
            </NavLink>
          </li>{" "}
        </ul>
        <Outlet />
      </div>

      <div className="ml-[81px]">
        <div className="flex content-center mb-[66px] gap-[822px]">
          <p className="text-customYellow  text-[25px]">Sizga yoqishi mumkin</p>
          <Link className="text-white text-[25px]" to={"/"}>
            Barchasini ko’rish
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
                  <p className="mt-[5px] text-gray-300">Sahifa: {el.page}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SinglePage;
