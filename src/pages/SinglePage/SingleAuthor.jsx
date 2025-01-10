import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../utils/config";
import Header from "../../components/Header/Header";
import { FaBookmark } from "react-icons/fa6";
export default function SingleAuthor() {
  const { authorId } = useParams();
  const [books, setBooks] = useState(null);
  const [data, setData] = useState(null);
  const [author, setAuthor] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    API.get(`/book/bookId/${authorId}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        setData(res?.data);
        console.log(res?.data);
      })
      .catch((err) => console.log(err));
  }, [authorId]);
  useEffect(() => {
    API.get(`/author/authorId/${data?.author_id}`, {
      headers: {
        authorization: token,
      },
    })
      .then((res) => {
        setAuthor(res?.data);
        console.log(res?.data);
      })
      .catch((err) => console.log(err));
  });
  useEffect(() => {
    API.get(`book/genreId/${data?.genre_id}`)
      .then((res) => {
        setBooks(res.data);
        console.log(res.data);
      })
      .catch((err) =>
        console.log(err.response?.data?.message || "Xato yuz berdi")
      );
  }, [data?.genre_id]);
  const item = books?.filter((item) => item.author_id == author?.id);

  return (
    <div>
      <Header />
      <div className="mt-[100px]">
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
                    <h1 className="text-[25px] text-gray-300 my-[5px] font-normal ">
                      Tavallud sanasi
                    </h1>
                    <p
                      id="lol"
                      className="text-[39px] text-customYellow ml-[42px]"
                    >
                      {author?.date_of_birth}
                    </p>
                    <p className="text-gray-700">
                      Uzbekiston,{author?.country}
                    </p>
                  </div>
                  <div className="text-[39px] leading-[144%] text-[#c9ac8c] my-[5px] font-normal">
                    -
                  </div>
                  <div>
                    <h1 className="text-[25px] text-gray-300 my-[5px] font-normal ">
                      O'lgan sanasi
                    </h1>
                    <p
                      id="lol"
                      className="text-[39px] text-customYellow ml-[42px]"
                    >
                      {author?.date_of_death}
                    </p>
                    <p className="text-gray-700">
                      Uzbekiston,{author?.country}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <div className="w-[635px] mb-12">
                <h2 className="text-[48px] font-normal text-[#c9ac8c] mb-[10px]">
                  {author?.first_name} {author?.last_name}
                </h2>
                <p className="text-[16px] font-normal leading-[144%] text-[rgba(255,255,255,0.8)]">
                  {author?.bio}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-[10px]">
                  <FaBookmark className="w-[15px] mb-2 h-[20px] fill-[#c9ac8c]" />
                  <h3 className="text-[20px] font-normal text-[#c9ac8c]">
                    IJODI
                  </h3>
                </div>
                <div className="w-[360px] ml-4">
                  <p className="text-[12px] font-normal mt-[5px] leading-[155%] w-[500px] text-white">
                    {data?.description}
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mt-14 w-[550px] mb-[20px]">
                    <h3 className="text-[31px] font-normal text-[#c9ac8c]">
                      Asarlari
                    </h3>
                    <Link
                      to={"/adiblar"}
                      className="text-[16px] font-normal text-white no-underline"
                    >
                      Barchasini ko’rish
                    </Link>
                  </div>
                  <ul className="flex gap-[15px] w-[570px] ml-0 pl-0 justify-between items-center">
                    {item?.map((el) => (
                      <li className="w-[165px] h-[255px]" id="item" key={el.id}>
                        <Link to={`/${el.genre_id}/${el.id}`}>
                          <img
                            src={`https://books-backend-production-6f61.up.railway.app/${el.image}`}
                            alt="book image"
                            className="w-[165px] h-[155px]"
                            id="image"
                            onError={(e) =>
                              (e.target.src =
                                "https://via.placeholder.com/165x255")
                            }
                          />
                          <div className="pl-[15px] pb-[10px]">
                            <h4 className="tex">{el.title}</h4>
                            <p className="mt-[5px] text-gray-300">
                              Sahifa: {el.page}
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
