import { useEffect, useState } from "react";
import { API } from "../../utils/config";
import { Link } from "react-router-dom";

export default function Jadid() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("book/genreId/2")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data.message));
  }, []);

  return (
    <>
      <ul className="w-[1100px] flex gap-[20px] flex-wrap">
        {data?.map((el) => (
          <li className="w-[165px] h-[255px]" id="item" key={el.id}>
            <Link to={`/${el.genre_id}/${el.id}`}>
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
                <p className="mt-[5px] text-gray-300">Sahifa: {el.page}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
