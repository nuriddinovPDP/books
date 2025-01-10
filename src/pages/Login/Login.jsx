import { useState } from "react";
import { API } from "../../utils/config";
import { useAuth } from "../../context/Auth";
import { Link, useNavigate } from "react-router-dom";
import img from "../../assets/img2.png";

export default function Login() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const onChange = (evt) => {
    setValues({ ...values, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    API.post("user/login", values)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((err) => setErr(err.message));
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="flex w-full h-full shadow-lg">
        <div className="w-1/2 bg-[#C9AC8C] flex items-center justify-center">
          <img src={img} alt="Sign In Illustration" className="w-3/4" />
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center  ml-[60px]">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Sign in</h2>
          <p className="text-gray-600 mb-4">
            Do not you have an account?
            <Link to="/register" className="text-blue-500 cursor-pointer">
              Sign up
            </Link>
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 w-[400px] "
          >
            <div className="mb-4">
              <input
                onChange={onChange}
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 mb-[10px]"
              />
              <input
                onChange={onChange}
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white font-semibold text-xl rounded-full hover:bg-gray-800"
            >
              Next step
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
