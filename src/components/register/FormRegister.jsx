import { InputForm } from "../../elements/InputForm";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { AxiosError } from "axios";
import { PrivacyPolicy } from "./PrivacyPolicy";
import { DateOfBirth } from "./DateOfBirth";
import { Gender } from "./Gender";

export const FormRegister = ({ onClose }) => {
  const { register } = useAuth();

  //   Payload Register
  const [payload, setPayload] = useState({
    first_name: "",
    surname: "",
    email: "",
    password: "",
    day: "",
    month: "",
    year: "",
    gender: "",
    profile_image: null,
  });

  //   State Errors
  const [hasErrors, setHasErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setPayload((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    register.mutate(payload, {
      onSuccess: () => {
        setPayload({
          first_name: "",
          surname: "",
          email: "",
          password: "",
          day: "",
          month: "",
          year: "",
          gender: "",
          profile_image: null,
        });
        setHasErrors({});
        alert("Register success");
        onClose();
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          const errors = error.response?.data?.errors || {};
          setHasErrors(errors);
        } else {
          return alert("error while registering, please try again later.");
        }
      },
    });
  };

  return (
    <form onSubmit={handleRegister} className="px-7 pt-7">
      <fieldset disabled={register.isLoading}>
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex items-center justify-between">
            <InputForm type="text" name="first_name" placeholder="First Name" onChange={handleChange} hasError={hasErrors.first_name} />
            <InputForm type="text" name="surname" placeholder="Surname" onChange={handleChange} hasError={hasErrors.surname} />
          </div>
          <InputForm type="email" name="email" placeholder="Email" onChange={handleChange} hasError={hasErrors.email} />
          <InputForm type="password" name="password" placeholder="Password" onChange={handleChange} hasError={hasErrors.password} />
        </div>

        {/* Date Of Birth */}
        <DateOfBirth payload={payload} handleChange={handleChange} hasErrors={hasErrors} />

        {/* Gender */}
        <Gender handleChange={handleChange} hasErrors={hasErrors} />

        {/* Privacy Policy */}
        <PrivacyPolicy />

        {/* Button */}
        <div className="flex justify-center items-center mt-10 mx-[-28px] border-t-[1px] border-slate-300">
          {register.isLoading ? (
            <button
              disabled={register.isLoading}
              type="submit"
              className="bg-slate-400 px-[80px] font-bold text-2xl text-white rounded-lg py-2 mt-5 cursor-not-allowed"
            >
              Process Registering ...
            </button>
          ) : (
            <button type="submit" className="bg-green-500 px-[80px] font-bold text-2xl text-white rounded-lg py-2 hover:bg-green-700 mt-5">
              Sign Up
            </button>
          )}
        </div>
        {/* End button */}
      </fieldset>
    </form>
  );
};
