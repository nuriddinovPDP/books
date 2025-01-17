import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../utils/config";
import Header from "../../components/Header/Header";
import { FaBookmark } from "react-icons/fa";
import { ThemeContext } from "../../context/ThemeContext"; // ThemeContext import
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";

export default function SingleAuthor() {
  const { isDark } = useContext(ThemeContext); // isDark holatini olish
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [booksByGenre, setBooksByGenre] = useState([]);
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");
  const listRef = useRef(null);

  // Muallif ma'lumotlarini olish
  useEffect(() => {
    API.get(`author/authorId/${authorId}`, {
      headers: { Authorization: token },
    })
      .then((res) => setAuthor(res.data))
      .catch((err) => console.log(err.response?.data?.message || err.message));
  }, [authorId, token]);

  useEffect(() => {
    const fetchBooksByGenres = async () => {
      try {
        const genres = [1, 2, 3, 4]; // Janr IDlari
        const genreRequests = genres.map((genreId) =>
          API.get(`book/genreId/${genreId}`, {
            headers: { Authorization: token },
          })
        );

        const responses = await Promise.all(genreRequests);
        const allBooks = responses.flatMap((res) => res.data || []);
        setBooksByGenre(allBooks);
      } catch (err) {
        console.log(err.response?.data?.message || err.message);
      }
    };

    fetchBooksByGenres();
  }, [token]);
  const { lang } = useContext(LangContext);

  // Filtrlangan kitoblarni olish
  useEffect(() => {
    const filteredBooks = booksByGenre.filter(
      (book) => book.author_id === parseInt(authorId)
    );
    setBooks(filteredBooks);
  }, [booksByGenre, authorId]);

  // Avtomatik aylantirish
  useEffect(() => {
    const list = listRef.current;

    const autoScroll = () => {
      if (list) {
        list.scrollBy({ left: 2, behavior: "smooth" });
        if (list.scrollLeft >= list.scrollWidth - list.clientWidth) {
          list.scrollLeft = 0;
        }
      }
    };

    const interval = setInterval(autoScroll, 10); // Har 10ms da skroll
    return () => clearInterval(interval); // Tozalash
  }, [books]);

  return (
    <div
      className={
        isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
      }
    >
      <Header />
      <div className="mt-[100px] pl-[50px]">
        <div className="container">
          <div className="flex justify-center gap-[90px]">
            <div className="flex flex-col gap-[40px]">
              <img
                src={`https://books-backend-production-6f61.up.railway.app/${author?.image}`}
                alt="book image"
                className="w-[519px] h-[670px] rounded-[15px]"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/165x255")
                }
              />
              <div className="pr-[40px] pb-[50px] font-sans">
                <div className="flex content-center gap-[50px]">
                  <div>
                    <h1
                      className={`text-[25px] ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } my-[5px] font-normal`}
                    >
                      {language[lang].singleauthor.date_birth}
                    </h1>
                    <p
                      className={`text-[39px] ${
                        isDark ? "text-customYellow" : "text-customYellow"
                      } ml-[42px]`}
                    >
                      {author?.date_of_birth}
                    </p>
                    <p className={isDark ? "text-gray-700" : "text-gray-300"}>
                      Uzbekistan, {author?.country}
                    </p>
                  </div>
                  <div className="text-[39px] leading-[144%] text-[#c9ac8c] my-[5px] font-normal">
                    -
                  </div>
                  <div>
                    <h1
                      className={`text-[25px] ${
                        isDark ? "text-gray-300" : "text-gray-700"
                      } my-[5px] font-normal`}
                    >
                      {language[lang].singleauthor.date_death}
                    </h1>
                    <p
                      className={`text-[39px] ${
                        isDark ? "text-customYellow" : "text-customYellow"
                      } ml-[42px]`}
                    >
                      {author?.date_of_death}
                    </p>
                    <p className={isDark ? "text-gray-700" : "text-gray-300"}>
                      Uzbekistan, {author?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <div className="w-[635px] mb-12">
                <h2
                  className={`text-[48px] font-normal ${
                    isDark ? "text-[#c9ac8c]" : "text-[#c9ac8c]"
                  } mb-[10px]`}
                >
                  {author?.first_name} {author?.last_name}
                </h2>
                <p
                  className={`text-[16px] font-normal leading-[144%] ${
                    isDark ? "text-[#000]" : "text-[rgba(255,255,255,0.8)]"
                  }`}
                >
                  {author?.bio}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-[10px]">
                  <FaBookmark className="w-[15px] mb-2 h-[20px] fill-[#c9ac8c]" />
                  <h3
                    className={`text-[20px] font-normal ${
                      isDark ? "text-[#c9ac8c]" : "text-[#c9ac8c]"
                    }`}
                  >
                    {language[lang].singleauthor?.ijodi}
                  </h3>
                </div>
                <div className="w-[360px] ml-4">
                  <p
                    className={`text-[12px] font-normal mt-[5px] leading-[155%] w-[500px] ${
                      isDark ? "text-black" : "text-white"
                    }`}
                  >
                    {books[0]?.description}
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mt-14 w-[550px] mb-[20px]">
                    <h3
                      className={`text-[31px] font-normal ${
                        isDark ? "text-[#c9ac8c]" : "text-[#c9ac8c]"
                      }`}
                    >
                      {language[lang].singleauthor?.asarlari}
                    </h3>
                    <Link
                      to={"/adiblar"}
                      className="text-[16px] font-normal text-white no-underline"
                    >
                      {language[lang].singlebook?.all}
                    </Link>
                  </div>
                  <ul className="list-container" ref={listRef}>
                    {books?.map((el) => (
                      <li
                        className={`${
                          isDark
                            ? "bg-white text-[#191919]"
                            : "bg-[#191919 text-[#fff]"
                        }`}
                        id="list-item"
                        key={el.id}
                      >
                        <Link to={`/book/${el.genre_id}/${el.id}`}>
                          <img
                            src={`https://books-backend-production-6f61.up.railway.app/${el.image}`}
                            alt="book image"
                            className="w-[165px] h-[155px] rounded-tl-[15px] rounded-tr-[15px]"
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/165x255")
                            }
                          />
                          <div className="pl-[15px] pb-[10px]">
                            <h4 className="tex">{el.title}</h4>
                            <p className="mt-[5px] text-gray-300">
                              {language[lang].singlebook?.page} {el.page}
                            </p>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
