/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Register from '../../pages/Register'
import { useState } from 'react'

export default function FormLogin({ onLogin, loginLoading }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    onLogin(email, password, setMsg)
  }

  return (
    <>
      <div className="bg-white w-[400px] px-3 py-2 flex flex-col justify-center rounded-lg shadow-2xl ">
        <div className="border-b-[1px] border-slate-300">
          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 pt-2 mb-5"
          >
            {/* Email */}
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="h-[50px] pl-5 rounded-md border-[1px] border-slate-300 placeholder:text-lg focus:outline-none focus:border-blue-600"
            />
            {/* Password */}
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="h-[50px] pl-5 rounded-md border-[1px] border-slate-300 placeholder:text-lg focus:outline-none focus:border-blue-600"
            />

            {/* Error Message */}
            {msg && (
              <div>
                <p className="text-[14px] text-red-500 text-center">{msg}</p>
              </div>
            )}

            {/* Button Login */}
            {loginLoading ? (
              <button
                disabled={loginLoading}
                className="text-white text-center text-xl font-bold py-2 bg-blue-600 h-[50px] rounded-md hover:bg-blue-700 cursor-not-allowed disabled:bg-slate-400"
              >
                Authentication Process...
              </button>
            ) : (
              <button className="text-white text-center text-xl font-bold py-2 bg-blue-600 h-[50px] rounded-md hover:bg-blue-700">Log in</button>
            )}
          </form>
          {/* Forgot Password */}
          <div className="flex justify-center items-center mb-5">
            <a
              href="#"
              className="text-center text-blue-600 hover:underline "
            >
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
          </span>{' '}
          for a celebrity, brand or business.
        </p>
      </div>
    </>
  )
}
