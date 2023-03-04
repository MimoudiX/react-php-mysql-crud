import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { API_URL } from "../config"

const Insert = () => {
  const navigate = useNavigate()
  const [userInfo, setuserInfo] = useState({
    name: "",
    email: "",
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const errors = {}
    if (!userInfo.name.trim()) {
      errors.name = "Name is required"
    }
    if (!userInfo.email.trim()) {
      errors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = "Invalid email address"
    }
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
    setErrors({
      ...errors,
      [e.target.name]: "",
    })
  }

  // Inserting a new user into the Database.
  const submitUser = async (event) => {
    try {
      event.preventDefault()
      if (!validateForm()) return

      const response = await fetch(`${API_URL}/addusers.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userInfo.name,
          useremail: userInfo.email,
        }),
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()
      console.log(data)
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form className="insertForm" onSubmit={submitUser}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="_name"
                        name="name"
                        onChange={onChangeValue}
                        placeholder="Enter name"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.name && (
                        <div className="error">{errors.name}</div>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label
                        htmlFor="email-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        id="_email"
                        name="email"
                        onChange={onChangeValue}
                        placeholder="Enter email"
                        autoComplete="off"
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {errors.email && (
                        <div className="error">{errors.email}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Insert
