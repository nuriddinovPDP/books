import { useContext, useEffect, useState } from "react";
import { API } from "../../utils/config";
import { RiBookFill } from "react-icons/ri";
import { BiHeadphone } from "react-icons/bi";
import { Link } from "react-router-dom";
import { InpContext } from "../../context/InputContext";

export default function Mustaqil2() {
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get("author/genreId/4")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data.message));
  }, []);
  const { value } = useContext(InpContext);
  const filterArray = data?.filter((el) =>
    (el.first_name + el.last_name).toLowerCase().includes(value)
  );
  console.log(filterArray);
  const books = value ? filterArray : data;
  return (
    <>
      <ul className="w-[1100px] flex gap-[20px] flex-wrap">
        {books?.map((el) => (
          <li className="w-[165px] h-[310px]" id="item" key={el.id}>
            <Link to={`/adiblar/${el.id}`}>
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
                <h4 className="mt-[10px] text-[20px] ml-[10px] text-customYellow w-[100px] text-center">
                  {el.first_name} {el.last_name}
                </h4>
                <p className="mt-[5px] text-gray-500 ml-[30px]">
                  {el.date_of_birth}-{el.date_of_death}
                </p>
                <div className="flex ml-[26px] mt-[5px]">
                  <span className="text-white flex items-center">
                    <RiBookFill className="text-white" /> 34
                  </span>
                  <span className="text-white flex items-center ml-[10px]">
                    <BiHeadphone className="text-white" /> 13
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
