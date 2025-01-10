import { Link } from "react-router-dom";
import "./PublicPage.css";
export default function PublicPage() {
  return (
    <div className="bg-customBlack pt-[200px] flex flex-col items-center pb-[362px] ">
      <h2 className="text-white ml-[190px] mr-[190px] text-center font-bold text-6xl">
        Saytimizdan foydalanish uchun ro'yhatdan o'ting!
      </h2>
      <div className="mt-[100px] flex gap-[50px]">
        <Link
          id="a"
          className="nav-link bg-blue-700 text-3xl text-white pl-[70px] pr-[70px] rounded-lg pt-[10px] pb-[10px]"
          to={"/login"}
        >
          Login
        </Link>
        <Link
          id="b"
          className="nav-link bg-green-700 text-white pl-[70px] pr-[70px] rounded-lg pt-[15px] "
          to={"/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
}
