/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CgClose } from '../assets/icons'

const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/70">
      <div className="w-[450px] bg-white px-3 rounded-lg z-50">{children}</div>
    </div>
  )
}

const Header = ({ title = 'title', onClick, disabled }) => {
  return (
    <>
      <div className="flex justify-between items-center py-2 border-b border-slate-300">
        <h1 className="text-xl font-bold w-full text-center">{title}</h1>
        <button
          onClick={onClick}
          disabled={disabled}
          className="text-2xl text-slate-500 p-2 rounded-full bg-slate-200 hover:bg-slate-300 disabled:cursor-not-allowed"
        >
          <i>
            <CgClose />
          </i>
        </button>
      </div>
    </>
  )
}

const Body = ({ children }) => {
  return (
    <>
      <div>{children}</div>
    </>
  )
}

const Footer = () => {
  return (
    <div>
      <button className="py-1 disabled:cursor-not-allowed disabled:bg-slate-400 bg-blue-500 text-white font-semibold w-full my-3 rounded-lg text-lg hover:bg-opacity-70">Footer Button</button>
    </div>
  )
}

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal
