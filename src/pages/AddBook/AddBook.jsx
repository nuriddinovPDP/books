import React, { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { API } from "../../utils/config";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";
import img from "../../../public/profile.jpg";

const AddBook = () => {
  const { isDark } = useContext(ThemeContext);
  const [text, setText] = useState(null);

  const [values, setValues] = useState({
    title: "",
    page: "",
    year: "",
    price: "",
    author_id: "",
    genre_id: "",
    description: "",
  });
  const [file, setFile] = useState();
  const [err, setErr] = useState(null);

  const onChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const token = localStorage.getItem("token");
  const { lang, setLang } = useContext(LangContext);
  const [allAuthor, setAllAuthor] = useState(null);
  const genres = [1, 2, 3, 4]; // Janr IDlari
  useEffect(() => {
    API.get(`author/genreId/${values?.genre_id}`, {
      headers: { Authorization: token },
    })
      .then((res) => setAllAuthor(res.data))
      .catch((err) => console.log(res.response.data.message));
  }, [values?.genre_id]);
  console.log(allAuthor);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("page", values.page);
    formData.append("year", values.year);
    formData.append("description", values.description);
    formData.append("author_id", values.author_id);
    formData.append("price", values.price);
    formData.append("genre_id", values.genre_id);
    formData.append("image", file);

    API.post("/book", formData, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setText("Muvafaqayatli!");
      })
      .catch((err) => setErr(err.response.data.message));
  };

  return (
    <div className={`${isDark ? "bg-[#fff]" : "bg-[#191919]"} pb-[500px]`}>
      <form action="" className="flex" onSubmit={handleSubmit}>
        <div
          className={`flex flex-col pl-[130px] pt-[63px] pb-[400px] pr-[130px] ${
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
            } pt-[10px] pb-[10px] w-[320px] rounded-[99px] pl-[100px] text-[18px] font-[500] text-white`}
          >
            {language[lang].add_book?.btn}

            <input
              type="file"
              name="image"
              className="visually-hidden"
              onChange={(evt) => setFile(evt.target.files[0])}
            />
          </label>
        </div>
        <div className="flex flex-col gap-[16px] pt-[20px] pl-[108px]">
          <Link to={"/"} className="ml-[600px] mt-[10px]">
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
            {language[lang].add_book?.title}
          </h2>
          <input
            onChange={onChange}
            type="text"
            name="title"
            placeholder={language[lang].add_book?.inp}
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
          />
          <input
            onChange={onChange}
            type="text"
            name="page"
            placeholder={language[lang].add_book?.inp2}
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
          />
          <input
            onChange={onChange}
            type="text"
            name="year"
            placeholder={language[lang].add_book?.inp3}
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
          />
          <input
            onChange={onChange}
            type="text"
            name="price"
            placeholder={language[lang].add_book?.inp4}
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

          <select
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
            onChange={onChange}
            name="author_id"
          >
            <option value="" selected disabled>
              {language[lang].add_book?.inp5}
            </option>
            {allAuthor?.map((el) => (
              <option key={el.id} value={el.id}>
                {el.first_name} {el.last_name}
              </option>
            ))}
          </select>
          <input
            onChange={onChange}
            type="text"
            name="description"
            placeholder={language[lang].add_book?.inp7}
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } w-[330px] border rounded-[10px] pt-[12px] pb-[12px] pl-[29px]`}
          />
          {err && <p className="text-red-500">{err}</p>}

          <button
            className={`${
              isDark ? "bg-[#152540]" : "bg-[#152540]"
            } mt-[20px] pt-[10px] pb-[10px] w-[320px] rounded-[99px] align-center pl-[10px] text-[18px] font-[500] text-white`}
          >
            {language[lang].add_book?.btn}
          </button>
          {text && <p className="text-green-500">{text}</p>}
        </div>
      </form>
    </div>
  );
};

export default AddBook;
