import React, { useContext, useState } from "react";
import { FaHome } from "react-icons/fa";

import { API } from "../../utils/config";
import img from "../../assets/image.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";
const AddAuthor = () => {
  const { isDark } = useContext(ThemeContext);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    date_of_birth: "",
    date_of_death: "",
    country: "",
    genre_id: "",
    bio: "",
  });
  const { lang, setLang } = useContext(LangContext);

  const [text, setText] = useState(null);
  const [err, setErr] = useState(null);

  const [file, setFile] = useState();
  const onChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };
  const token = localStorage.getItem("token");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("date_of_birth", values.date_of_birth);
    formData.append("date_of_death", values.date_of_death);
    formData.append("country", values.country);
    formData.append("bio", values.bio);
    formData.append("genre_id", values.genre_id);
    formData.append("image", file);

    API.post("/author", formData, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setText("Muvafaqayatli!");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErr(err.response.data.message);
      });
  };
  return (
    <div
      className={`${
        isDark ? "bg-[#fff]" : "bg-[#191919]"
      } pb-[500px] overflow-y-hidden`}
    >
      <form action="" className="flex" onSubmit={handleSubmit}>
        <div
          className={`flex flex-col pl-[130px] pt-[63px] pb-[501px] pr-[130px] ${
            isDark ? "bg-[#fff]" : "bg-[#191919]"
          }`}
        >
          {file ? (
            <img src={URL.createObjectURL(file)} className="rounded-[15px]" />
          ) : (
            <img
              src="https://via.placeholder.com/165x255"
              className="rounded-[15px]"
            />
          )}

          <label
            className={`mt-[20px] ${
              isDark ? "bg-[#152540]" : "bg-[#152540]"
            } pt-[10px] pb-[10px] w-[320px] rounded-[99px] align-center pl-[80px] text-[18px] font-[500] text-white`}
          >
            {language[lang].add_book.btn}
            <input
              type="file"
              name="image"
              className="visually-hidden"
              onChange={(evt) => setFile(evt.target.files[0])}
            />
          </label>
        </div>
        <div className="flex flex-col gap-[16px] pt-[20px] pl-[108px]">
          <Link to={"/"} className="ml-[570px] mt-[10px]">
            <FaHome
              className={`w-[31px] h-[30px] ${
                isDark ? "text-black" : "text-white"
              } `}
            />
          </Link>
          <h2
            className={`${
              isDark ? "text-[#191919]" : "text-[#fff]"
            } mb-[22px] text-[36px] font-[900]`}
          >
            {language[lang].add_author?.title}
          </h2>
          <input
            onChange={onChange}
            type="text"
            name="first_name"
            placeholder={language[lang].add_author?.inp}
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
          />
          <input
            onChange={onChange}
            type="text"
            name="last_name"
            placeholder={language[lang].add_author?.inp2}
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
          />
          <input
            onChange={onChange}
            type="text"
            name="date_of_birth"
            placeholder={language[lang].add_author?.inp3}
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
          />
          <input
            onChange={onChange}
            type="text"
            name="date_of_death"
            placeholder={language[lang].add_author?.inp4}
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
          />
          <input
            onChange={onChange}
            type="text"
            name="country"
            placeholder={language[lang].add_author?.inp5}
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
          />
          <select
            onChange={onChange}
            name="genre_id"
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
          >
            <option value="" selected disabled>
              {language[lang].add_book?.inp6}
            </option>
            <option value="1">{language[lang].category.temuriy}</option>
            <option value="2">{language[lang].category.jadid}</option>
            <option value="3">{language[lang].category.sovet}</option>
            <option value="4">{language[lang].category.mustaqil}</option>
          </select>

          <input
            onChange={onChange}
            type="text"
            name="bio"
            placeholder={language[lang].add_author?.inp7}
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
            id=""
          />
          {err && <p className="text-red-500">{err}</p>}

          <button
            className={`${
              isDark ? "bg-[#152540]" : "bg-[#152450]"
            } mt-[20px] pt-[10px] pb-[10px] w-[320px] rounded-[99px] align-center pl-[] text-[18px] font-[500] text-white`}
          >
            {language[lang].add_book?.btn2}
          </button>
          {text && <p className="text-green-500">{text}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddAuthor;
