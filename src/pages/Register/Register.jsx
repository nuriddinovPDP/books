import { useState } from "react";
import img from "../../assets/img.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
import { API } from "../../utils/config";
import "./Register.css";
function Register() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const [err, setErr] = useState("");
  const [inputValues, setInputValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "first_name",
      type: "text",
      required: true,
      pattern: "^[A-Za-z]+$",
      errMessage: "First name should only contain letters and cannot be empty!",
      placeholder: "First name",
      label: "First Name",
    },
    {
      id: 2,
      name: "last_name",
      type: "text",
      required: true,
      pattern: "^[A-Za-z]+$",
      errMessage: "Last name should only contain letters and cannot be empty!",
      placeholder: "Last name",
      label: "Last Name",
    },
    {
      id: 3,
      name: "phone",
      type: "tel",
      required: true,

      errMessage: "Phone number must be 10-15 digits and may start with +",
      placeholder: "Phone",
      label: "Phone",
    },
    {
      id: 4,
      name: "email",
      type: "email",
      required: true,
      errMessage: "Invalid email address!",
      placeholder: "Email",
      label: "Email",
    },
    {
      id: 5,
      name: "password",
      type: "password",
      required: true,
      // pattern: "/^[a-zA-Z0-9]{3,30}$/",
      errMessage:
        "Password must be 8-20 characters, include at least 1 letter, 1 number, and 1 special character!",
      placeholder: "Password",
      label: "Password",
    },
  ];

  const onChange = (evt) => {
    setInputValues({ ...inputValues, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    API.post("user/register", inputValues)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true);
        navigate("/");
      })
      .catch((err) => {
        setErr(err.response.data.message);
      });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <div className="flex w-full h-full shadow-lg">
        <div className="w-1/2 bg-[#C9AC8C] flex items-center justify-center">
          <img src={img} alt="Sign In Illustration" className="w-3/4" />
        </div>
        <div className="w-1/2 p-8 flex flex-col justify-center ml-[60px]">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">Sign up</h2>
          <p className="text-gray-600 mb-4">
            Already have an account?
            <Link to="/login" className="text-blue-500 cursor-pointer">
              Sign in
            </Link>
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-[400px] flex flex-col gap-6"
          >
            {inputs.map((input) => (
              <div key={input.id} className="mb-1">
                <input
                  {...input}
                  value={inputValues[input.name]}
                  onChange={onChange}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ))}
            {err && (
              <p className="text-red-500 ml-[170px] font-semibold text-xl">
                {err}
              </p>
            )}
            <button
              type="submit"
              className="w-full  text-xl py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800"
            >
              Next step
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
