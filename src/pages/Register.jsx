/* eslint-disable no-unused-vars */
import { CgClose } from '../assets/icons'
import { useEffect, useState } from 'react'
import { useRegister } from '../features/users/useRegister'
import { useFormik } from 'formik'

export default function Register() {
  // Days
  const generatedays = () => {
    const days = []
    for (let i = 1; i <= 31; i++) {
      days.push(i)
    }
    return days
  }
  // Month
  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // Years
  const currentYear = new Date().getFullYear()
  const generateYears = (startYear, currentYear) => {
    const years = []
    for (let i = startYear; i <= currentYear; i++) {
      years.push(i)
    }
    return years
  }

  //! State Modal
  const [openModal, setOpenModal] = useState(() => {
    const statusModal = localStorage.getItem('statusModal')
    return statusModal ? JSON.parse(statusModal) : false
  })

  useEffect(() => {
    localStorage.setItem('statusModal', JSON.stringify(openModal))
  }, [openModal])
  //! End State Modal

  const handleFormInput = (event) => {
    const { name, value } = event.target
    formik.setFieldValue(name, value)
  }

  const formik = useFormik({
    initialValues: {
      first_name: '',
      surname: '',
      email: '',
      password: '',
      day: '',
      month: '',
      year: '',
      gender: '',
      profile_image: null,
    },
    validate: (values) => {
      const errors = {}
      if (!values.first_name) errors.first_name = 'First Name is required'
      if (!values.surname) errors.surname = 'Surname is required'
      if (!values.email) errors.email = 'Email is required'
      if (!values.password) errors.password = 'Password is required'
      else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters'
      if (!values.day || !values.month || !values.year) errors.birthday = 'Birthday is required'
      if (!values.gender) errors.gender = 'Gender is required'

      return errors
    },
    onSubmit: (values, { resetForm }) => {
      const { day, month, year } = values

      const filterBirthday = [day, month, year]
      const birthday = filterBirthday.join('-')

      createUserMutation.mutate({ ...values, birthday: birthday })
      resetForm()
    },
  })

  const createUserMutation = useRegister({
    onSuccess: () => {
      alert('Resgiter Success')
      setOpenModal(false)
    },
    onError: (error) => {
      if (error.response) {
        console.log(error.response.data.errors.msg)
      }
    },
  })

  const handleModal = () => {
    setOpenModal(true)
    formik.setFieldValue('day', '')
    formik.setFieldValue('month', '')
    formik.setFieldValue('year', '')
  }

  return (
    <>
      {/* Button Open modal */}
      <div>
        <button
          onClick={handleModal}
          className="bg-green-500 text-white font-bold text-center p-3 rounded-lg mt-5 hover:bg-green-700"
        >
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
                  disabled={createUserMutation.isLoading}
                  className="text-2xl text-slate-500 p-2 hover:bg-slate-200 hover:rounded-lg disabled:cursor-not-allowed"
                >
                  <i>
                    <CgClose />
                  </i>
                </button>
              </div>
            </div>
            {/* End Header */}

            {/* Body */}
            <div className="">
              {/* Form */}
              <form
                onSubmit={formik.handleSubmit}
                className="px-7 pt-7 "
              >
                <div className="flex flex-col gap-y-4">
                  <div className="flex gap-x-3">
                    {/* First Name */}
                    <div className={`${formik.errors.first_name && 'flex flex-col'} w-1/2`}>
                      <input
                        type="text"
                        name="first_name"
                        onChange={handleFormInput}
                        onBlur={formik.handleBlur}
                        placeholder="First Name"
                        className={`border ${formik.errors.first_name && formik.touched.first_name ? 'border-red-500' : 'border-slate-300'} rounded-lg placeholder:text-slate-300`}
                      />
                      {formik.errors.first_name && formik.touched.first_name && <p className="text-[14px] text-red-500 ml-1 mt-1">{formik.errors.first_name}</p>}
                    </div>

                    {/* Surname */}
                    <div className={`${formik.errors.surname && 'flex flex-col'} w-1/2`}>
                      <input
                        type="text"
                        name="surname"
                        onChange={handleFormInput}
                        onBlur={formik.handleBlur}
                        placeholder="Surname"
                        className={`border ${formik.errors.surname && formik.touched.surname ? 'border-red-500' : 'border-slate-300'}   rounded-lg placeholder:text-slate-300`}
                      />
                      {formik.errors.surname && formik.touched.surname && <p className="text-[14px] text-red-500 ml-1 mt-1">{formik.errors.surname}</p>}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className={`w-full ${formik.errors.email && 'flex flex-col'}`}>
                    <input
                      type="email"
                      name="email"
                      onChange={handleFormInput}
                      onBlur={formik.handleBlur}
                      placeholder="Email"
                      className={`w-full border ${formik.errors.email && formik.touched.email ? 'border-red-500 ' : 'border-slate-300 '} rounded-lg placeholder:text-slate-300`}
                    />
                    {formik.errors.email && formik.touched.email && <p className="text-[14px] text-red-500 ml-1 mt-1">{formik.errors.email}</p>}
                  </div>

                  {/* New Password */}
                  <div className={`w-full ${formik.errors.password && 'flex flex-col'}`}>
                    <input
                      type="password"
                      name="password"
                      onChange={handleFormInput}
                      onBlur={formik.handleBlur}
                      placeholder="Password"
                      className={`w-full border ${formik.errors.password && formik.touched.password ? 'border-red-500 ' : 'border-slate-300 '} rounded-lg placeholder:text-slate-300`}
                    />
                    {formik.errors.password && formik.touched.password && <p className="text-[14px] text-red-500 ml-1 mt-1">{formik.errors.password}</p>}
                  </div>
                </div>

                {/* Date Of birth */}
                <div className="mt-5">
                  <label className="text-[12px]">Date of birth</label>
                  <div className="flex gap-5">
                    {/* DAY */}
                    <select
                      name="day"
                      onChange={handleFormInput}
                      className="w-1/3 rounded-lg border-[1px] border-slate-300 "
                    >
                      {/* Default Option */}
                      <option
                        value={null}
                        disabled={formik.values.day !== ''}
                      >
                        Select Day
                      </option>
                      {generatedays().map((item, index) => (
                        <option
                          key={index}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                    {/* END DAY */}

                    {/* MONTH */}
                    <select
                      name="month"
                      onChange={handleFormInput}
                      required
                      className="w-1/3 rounded-lg border-[1px] border-slate-300 "
                    >
                      {/* Default Option */}
                      <option
                        value={null}
                        disabled={formik.values.month !== ''}
                      >
                        Select Month
                      </option>
                      {monthList.map((item, index) => (
                        <option
                          key={index}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                    {/* END MONTH */}

                    {/* YEAR */}
                    <select
                      name="year"
                      onChange={handleFormInput}
                      className="w-1/3 rounded-lg border-[1px] border-slate-300 "
                    >
                      {/* Default Option */}
                      <option
                        value={null}
                        disabled={formik.values.year !== ''}
                      >
                        Select Year
                      </option>
                      {generateYears(1980, currentYear).map((item, index) => (
                        <option
                          key={index}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>
                    {/* END YEAR */}
                  </div>
                  {formik.errors.birthday && formik.touched.birthday && <p className="text-[14px] text-red-500 ml-1 mt-1">{formik.errors.birthday}</p>}
                </div>

                {/* Gender */}
                <div className="mt-5">
                  <label className="text-[12px]">Gender</label>
                  <div className="flex gap-5">
                    {/* Male */}
                    <div className="p-2 flex gap-10 justify-center items-center border-[1px] border-slate-300 rounded-md w-1/2">
                      <label htmlFor="male">Male</label>
                      <input
                        type="radio"
                        name="gender"
                        id="male"
                        value={'male'}
                        onBlur={formik.handleBlur}
                        onChange={handleFormInput}
                      />
                    </div>

                    {/* Female */}
                    <div className="p-2 flex gap-10 justify-center items-center border-[1px] border-slate-300 rounded-md w-1/2">
                      <label htmlFor="female">Female</label>
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value={'female'}
                        onBlur={formik.handleBlur}
                        onChange={handleFormInput}
                      />
                    </div>
                    {/* END GENDER */}
                  </div>
                  {/* END TITLE */}
                  {formik.errors.gender && formik.touched.gender && <p className="text-[14px] text-red-500 ml-1 mt-1">{formik.errors.gender}</p>}
                </div>

                {/* Privacy Policy */}
                <div className="mt-5 flex flex-col gap-y-5">
                  <p className="text-xs">
                    People who use our service may have uploaded your contact information to Facebook. <span className="text-blue-600 hover:underline cursor-pointer">Learn more.</span>
                  </p>
                  <p className="text-xs">
                    By clicking Sign Up, you agree to our <span className="text-blue-600 hover:underline cursor-pointer">Terms</span>, <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span> and
                    <span className="text-blue-600 hover:underline cursor-pointer">Cookies Policy</span>. You may receive SMS notifications from us and can opt out at any tim
                  </p>
                </div>

                {/* Button */}
                <div className="flex justify-center items-center mt-10 mx-[-28px] border-t-[1px] border-slate-300">
                  {createUserMutation.isLoading ? (
                    <button
                      disabled={createUserMutation.isLoading}
                      type="submit"
                      className="bg-slate-400 px-[80px] font-bold text-2xl text-white rounded-lg py-2 mt-5 cursor-not-allowed"
                    >
                      Process Registering ...
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-500 px-[80px] font-bold text-2xl text-white rounded-lg py-2 hover:bg-green-700 mt-5"
                    >
                      Sign Up
                    </button>
                  )}
                </div>
                {/* End button */}
              </form>
              {/* End Form */}
            </div>
            {/* End Body */}
          </div>
        </div>
      )}
    </>
  )
}
