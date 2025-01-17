import { useContext, useEffect, useState } from "react";
import { API } from "../../utils/config";
import { Link } from "react-router-dom";
import { LangContext } from "../../context/LangContext";
import { InpContext } from "../../context/InputContext";
import { language } from "../../lang/lang";

export default function Sovet() {
  const [data, setData] = useState(null);
  const { lang } = useContext(LangContext);

  useEffect(() => {
    API.get("book/genreId/3")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data.message));
  }, []);
  const { value } = useContext(InpContext);
  const filterArray = data?.filter((el) =>
    el.title.toLowerCase().includes(value)
  );
  console.log(filterArray);
  const books = value ? filterArray : data;
  return (
    <>
      <ul className="w-[1100px] flex gap-[20px] flex-wrap">
        {books?.map((el) => (
          <li className="w-[165px] h-[255px]" id="item" key={el.id}>
            <Link to={`/book/${el.genre_id}/${el.id}`}>
              <img
                src={`https://books-backend-production-6f61.up.railway.app/${el.image}`}
                alt="book image"
                className="w-[165px] h-[155px]"
                id="image"
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/165x255")
                }
              />
              <div className="pl-[15px] pb-[10px]">
                <h4 className="tex">{el.title}</h4>
                <p className="mt-[5px] text-gray-300">
                  {language[lang].singlebook.page} {el.page}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
