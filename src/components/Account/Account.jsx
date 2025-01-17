import { useContext, useEffect, useState } from "react";
import { API } from "../../utils/config";
import img from "../../../public/profile.jpg";
import { IoCameraOutline } from "react-icons/io5";
import { ThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { LangContext } from "../../context/LangContext";
import { language } from "../../lang/lang";

export default function Account() {
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const { lang, setLang } = useContext(LangContext);

  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [file, setFile] = useState("");
  const [info, setInfo] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    API.get("user/me", {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        setInfo(res.data);
        setValues({
          first_name: res.data.first_name,
          last_name: res.data.last_name,
          phone: res.data.phone,
        });

        console.log(res.data);
        setFile(res.data.image);
      })
      .catch((err) => console.log(err.response.data.message));
  }, [token]);
  console.log(file);

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("phone", values.phone);
    formData.append("image", file);
    API.put("user/account", formData, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setText("Muvafaqayatli!");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setErr(err.response.data.message);
      });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile !== null) {
      setFile(selectedFile);
    } else {
      console.log("Fayl tanlanmadi yoki null keldi");
    }
  };
  const { isDark } = useContext(ThemeContext);
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex gap-[90px] pl-[92px] ${
        isDark ? "bg-[#fff]" : "bg-[#191919]"
      } pb-[500px]`}
    >
      <div className="pt-[43px] relative">
        <img
          src={`https://books-backend-production-6f61.up.railway.app/${file}`}
          alt="profile"
          name="image"
          onError={(e) => (e.target.src = img)}
          className="w-[165px] h-[155px] rounded-[100%] "
        />
        <label
          htmlFor="img"
          className={`${
            isDark ? "bg-[#F3F6F9]" : "bg-[#191919]"
          } w-[50px] h-[50px] rounded-[8px] flex items-center content-center pl-[10px] absolute top-[151px] left-[120px]`}
        >
          <IoCameraOutline
            className={`${
              isDark ? "text-[#B0B0B0]" : "text-[#B0B0B0]"
            } text-[33px]`}
          />
        </label>
        <input
          onChange={handleFileChange}
          type="file"
          required
          className="visually-hidden"
          name="image"
          id="img"
        />
      </div>
      <div className="pt-[86px] flex flex-col gap-[25px]">
        <h2
          className={`${
            isDark ? "text-[#191919]" : "text-[#fff]"
          } text-[24px] font-[500] mb-[32px]`}
        >
          {language[lang].profile.account.title}
        </h2>
        <div className="flex flex-col gap-[7px]">
          <label
            htmlFor="name"
            className={`${isDark ? "text-[#191919]" : "text-[#fff]"}`}
          >
            {language[lang].profile.account.label}
          </label>
          <input
            onChange={onChange}
            value={values.first_name}
            type="text"
            name="first_name"
            id="name"
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } pt-[12px] pb-[12px] border border-2 rounded-[4px] pl-[19px] w-[700px]`}
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label
            htmlFor="name2"
            className={`${isDark ? "text-[#191919]" : "text-[#fff]"}`}
          >
            {language[lang].profile.account.label2}
          </label>
          <input
            onChange={onChange}
            value={values.last_name}
            type="text"
            name="last_name"
            id="name2"
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } pt-[12px] pb-[12px] border border-2 rounded-[4px] pl-[19px] w-[700px]`}
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label
            htmlFor="phone"
            className={`${isDark ? "text-[#191919]" : "text-[#fff]"}`}
          >
            {language[lang].profile.account.phone}
          </label>
          <input
            onChange={onChange}
            value={values.phone}
            type="text"
            name="phone"
            id="phone"
            className={`${
              isDark ? "bg-[#fff] text-[#191919]" : "bg-[#191919] text-[#fff]"
            } pt-[12px] pb-[12px] border border-2 rounded-[4px] pl-[19px] w-[700px]`}
          />

          {text && <p className="text-green-500">{text}</p>}
          {err && <p className="text-red-500">{err}</p>}
        </div>
        <button
          type="submit"
          className={`${
            isDark ? "bg-[#152540] text-[#fff]" : "bg-[#fff] text-[#191919]"
          } pt-[10px] pb-[10px] w-[400px] ml-[160px] mt-[30px] text-[18px] font-[500] rounded-[99px] pl-[10px]`}
        >
          {language[lang].profile.account.btn}
        </button>
      </div>
    </form>
  );
}
