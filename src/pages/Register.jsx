/* eslint-disable no-unused-vars */
import { CgClose } from "../assets/icons";
import { useEffect, useState } from "react";
import { FormRegister } from "../components/register/FormRegister";

export default function Register() {
  //! State Modal
  const [openModal, setOpenModal] = useState(() => {
    const statusModal = localStorage.getItem("statusModal");
    return statusModal ? JSON.parse(statusModal) : false;
  });

  useEffect(() => {
    localStorage.setItem("statusModal", JSON.stringify(openModal));
  }, [openModal]);
  //! End State Modal

  return (
    <>
      {/* Button Open modal */}
      <div>
        <button onClick={() => setOpenModal(true)} className="bg-green-500 text-white font-bold text-center p-3 rounded-lg mt-5 hover:bg-green-700">
          Create New Account
        </button>
      </div>

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white w-[500px] rounded-lg pb-5">
            {/* Header */}
            <div className="border-b-[1px] border-slate-300 py-5">
              <div className="px-7 w-full flex items-start justify-between">
                <h1 className="text-3xl font-bold flex flex-col gap-y-1">
                  Sign Up <span className="text-lg font-semibold">its quick and easy</span>
                </h1>
                <button
                  onClick={() => setOpenModal(false)}
                  className="text-2xl text-slate-500 p-2 hover:bg-slate-200 hover:rounded-lg disabled:cursor-not-allowed"
                >
                  <i>
                    <CgClose />
                  </i>
                </button>
              </div>
            </div>
            {/* End Header */}

            {/* Form */}
            <FormRegister onClose={() => setOpenModal(false)} />
            {/* End Form */}
          </div>
        </div>
      )}
    </>
  );
}
