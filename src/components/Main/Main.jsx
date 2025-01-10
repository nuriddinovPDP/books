import { useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
export default function Main() {
  return (
    <div className="bg-customBlack pt-[60px] pl-[150px] mt-[100px] pb-[100px]">
      <h2 id="tit" className="ml-[390px]">
        Asosiy kategoriyalar
      </h2>
      <ul className="flex items-center gap-[40px] ml-[240px] mt-[20px] mb-[40px] ">
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[20px] text-customYellow"
                : "text-[20px] text-gray-500"
            }
            to={""}
          >
            Temuriylar davri
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[20px] text-customYellow"
                : "text-[20px] text-gray-500"
            }
            to={"jadid"}
          >
            Jadid adabiyooti
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[20px] text-customYellow"
                : "text-[20px] text-gray-500"
            }
            to={"sovet"}
          >
            Sovet davri
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-[20px] text-customYellow"
                : "text-[20px] text-gray-500"
            }
            to={"mustaqil"}
          >
            Mustaqillik davri
          </NavLink>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
