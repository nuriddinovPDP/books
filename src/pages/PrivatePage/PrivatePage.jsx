import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { BiSearchAlt } from "react-icons/bi";

import Header from "../../components/Header/Header";
import Carousel from "../../components/Carousel/Carousel";
import { useState } from "react";

export default function PrivatePage() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [inp, setInp] = useState("");
  // const filteredArray = array.filter((el) => array.title.includes(inp));

  console.log();
  return (
    <div>
      <Header />
      <div className="pt-[70px] relative">
        <Carousel />
        <div className="box">
          <h4 className="title">Qidirish</h4>
          <form action="" className="form">
            <input
              className="inp"
              type="text"
              onChange={(e) => e.target.value}
              placeholder="Adiblar, kitoblar, audiolar, maqolalar..."
            />
            <button className="btn5">
              <BiSearchAlt className="icon" />
              Izlash
            </button>
          </form>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
