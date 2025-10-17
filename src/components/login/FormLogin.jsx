/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useAuth } from "../../features/auth/useAuth";
import Register from "../../pages/Register";
import { useState } from "react";
import { InputForm } from "../../elements/InputForm";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  // State Crendentials
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  // State hasErrors
  const [hasErrors, setHasErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    login.mutate(credentials, {
      onSuccess: () => {
        setCredentials({
          email: "",
          password: "",
        });
        setHasErrors({});
        alert("login success");
        navigate("/homepage");
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const errors = error.response?.data;

          if (errors && errors.message === "Validation error") {
            setHasErrors(errors.errors);
          }
        }
      },
    });
  };

  return (
    <>
      <div className="bg-white w-[400px] px-3 py-2 flex flex-col justify-center rounded-lg shadow-2xl ">
        <div className="border-b-[1px] border-slate-300">
          <form onSubmit={handleLogin}>
            <fieldset disabled={login.isLoading} className="flex flex-col gap-4 pt-2 mb-5">
              {/* Email */}
              <InputForm
                type="email"
                name="email"
                placeholder="Email"
                className="h-[50px] focus:outline-none focus:border-blue-600"
                onChange={handleChange}
                value={credentials.email}
                hasError={hasErrors.email}
              />

              {/* Password */}
              <InputForm
                type="password"
                name="password"
                placeholder="Password"
                className="h-[50px] focus:outline-none focus:border-blue-600"
                onChange={handleChange}
                value={credentials.password}
                hasError={hasErrors.password}
              />
            </fieldset>

            {/* Button Login */}
            <button
              disabled={login.isLoading}
              className="text-white text-center text-xl font-bold py-2 bg-blue-600 h-[50px] w-full rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {login.isLoading ? "Please wait ...." : "Login"}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="flex justify-center items-center mb-5">
            <a href="#" onClick={() => alert("Feature not available yet.")} className="text-center text-blue-600 hover:underline ">
              Forgotten password?
            </a>
          </div>
        </div>
        {/* Button Create Account */}
        <div className="self-center mb-2">
          <Register />
        </div>
      </div>

      <div className="mt-5">
        <p className="text-center">
          <span className="text-black font-bold hover:underline">
            <a href="#">Create a Page</a>
          </span>{" "}
          for a celebrity, brand or business.
        </p>
      </div>
    </>
  );
}
