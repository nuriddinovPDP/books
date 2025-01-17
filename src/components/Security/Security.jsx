import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { API } from "../../utils/config";
import img from "../../../public/profile.jpg";
import { ThemeContext } from "../../context/ThemeContext";
import { language } from "../../lang/lang";
import { LangContext } from "../../context/LangContext";
export default function Security() {
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const { isDark } = useContext(ThemeContext);
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
  });
  const [file, setFile] = useState(null);
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
          email: res.data.email,
        });
        console.log(res.data);
        setFile(res.data.image);
      })
      .catch((err) => console.log(err.response.data.message));
  }, [token]);

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("currentPassword", values.currentPassword);
    formData.append("newPassword", values.newPassword);

    API.put("user/security", formData, {
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
  const { lang, setLang } = useContext(LangContext);

  return (
    <form
      onSubmit={handleSubmit}
      className={`${
        isDark ? "bg-white" : "bg-[#191919]"
      } pl-[247px] pt-[86px] flex flex-col gap-[20px] pb-[150px]`}
    >
      <h2
        className={`${
          isDark ? "text-[#191919]" : "text-[#fff]"
        } text-[24px] font-[500] mb-[32px]`}
      >
        {language[lang].profile.security?.title}
      </h2>
      <div className="flex flex-col gap-[7px]">
        <label htmlFor="email2" className="text-[#fff]">
          Email
        </label>
        <input
          type="text"
          value={values.email}
          className="pl-[19px] pt-[12px] pb-[12px] border rounded-[4px] w-[708px] bg-[#F3F6F9]"
          id="email2"
          name="email"
          onChange={onChange}
        />
      </div>
      <div className="flex flex-col gap-[7px]">
        <label htmlFor="password2" className="text-[#fff]">
          {language[lang].profile.security?.label}
        </label>
        <input
          onChange={onChange}
          type="password"
          id="password2"
          className="pl-[19px] pt-[12px] pb-[12px] border rounded-[4px] w-[708px] bg-[#F3F6F9]"
          name="currentPassword"
          placeholder={language[lang].profile.security?.inp}
        />
      </div>
      <div className="flex w-[708px] gap-[30px] border-b border-b-2 border-b-[#ECF0F3] pb-[50px]">
        <div className="flex flex-col gap-[7px]">
          <label htmlFor="password3" className="text-[#fff]">
            {language[lang].profile.security?.label2}
          </label>

          <input
            placeholder={language[lang].profile.security?.inp2}
            onChange={onChange}
            type="password"
            id="password3"
            className="pl-[19px] pt-[12px] pb-[12px] border rounded-[4px] w-[340px] bg-[#F3F6F9]"
            name="newPassword"
          />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label htmlFor="password4" className="text-[#fff]">
            {language[lang].profile.security?.label3}
          </label>
          <input
            placeholder={language[lang].profile.security?.inp3}
            className="pl-[19px] pt-[12px] pb-[12px] border rounded-[4px] w-[340px] bg-[#F3F6F9]"
            type="password"
            id="password4"
            name="password"
          />
        </div>{" "}
      </div>
      <button className="w-[192px] pt-[12px] pb-[12px] bg-[#152540] text-white rounded-[4px] ml-[300px] mt-[nppx]">
        {language[lang].profile.security?.btn}
      </button>
    </form>
  );
}
