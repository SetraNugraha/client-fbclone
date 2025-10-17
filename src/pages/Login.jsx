/* eslint-disable no-unused-vars */
import Title from "../components/login/Title";
import FormLogin from "../components/login/FormLogin";
import Footer from "../components/login/Footer";
import { useAuth } from "../features/auth/useAuth";
import Modal from "../elements/Modal";

export default function Login() {
  return (
    <>
      <div className="bg-slate-100 h-dvh w-full">
        <div className="w-[50%] mx-auto h-[75%] flex justify-between items-center">
          {/* Title */}
          <div className="mr-[100px]">
            <Title />
          </div>
          {/* Form Login */}
          <div>
            {/* <FormLogin onLogin={handleLogin} loginLoading={loginLoading} /> */}
            <FormLogin />
          </div>
        </div>
        <div className="bg-white h-[25%]">
          <div className="w-[50%] h-full mx-auto">
            <Footer />
          </div>
        </div>

        {/* {loginLoading && (
          <Modal>
            <Modal.Body>
              <h1 className="font-semibold text-center p-3 italic">Sedang memproses autentikasi, mohon tunggu sebentar ....</h1>
            </Modal.Body>
          </Modal>
        )} */}
      </div>
    </>
  );
}
