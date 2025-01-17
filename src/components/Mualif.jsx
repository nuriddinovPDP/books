import React, { useContext, useEffect, useState } from "react";
import { API } from "../utils/config";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { LangContext } from "../context/LangContext";
import { language } from "../lang/lang";

export const Mualif = () => {
  const token = localStorage.getItem("token");
  const [author, setAuthor] = useState(null);
  const { id, Id } = useParams();
  const [data, setData] = useState([]);
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
  const { isDark } = useContext(ThemeContext);
  useEffect(() => {
    API.get(`author/authorId/${el?.author_id}`, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => setAuthor(res.data))
      .catch((err) => console.log(err.response.data.message));
  }, [el]);
  console.log(author);
  const { lang } = useContext(LangContext);

  return (
    <div
      className={`pt-[10px] pb-[50px] pl-[25px] flex flex-col rounded-[15px] w-[1100px] ${
        isDark ? "bg-[#fff]" : "bg-[#191919]"
      }`}
      id="it"
    >
      <p
        className={`text-gray-400 text-[20px] ${
          isDark ? "text-[#191919]" : "text-[#fff]"
        }`}
      >
        {author?.first_name} {author?.last_name}
        <div className="flex content-center gap-[30px] mt-[15px] mb-[10px]">
          <p
            className={` text-[20px] ${
              isDark ? "text-[#191919]" : "text-[#fff]"
            }`}
          >
            {language[lang].singlebook.country}: {author?.country}
          </p>
          <p
            className={`text-gray-400 text-[20px] ${
              isDark ? "text-[#191919]" : "text-[#fff]"
            }`}
          >
            {author?.date_of_birth}-{author?.date_of_death}
          </p>
        </div>
        <p
          className={`text-white text-[20px] w-[1001px] ${
            isDark ? "text-[#191919]" : "text-[#fff]"
          }`}
        >
          {author?.bio}
        </p>
      </p>
    </div>
  );
};
