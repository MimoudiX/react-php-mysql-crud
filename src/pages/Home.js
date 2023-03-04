import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { API_URL } from "../config"

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
    alluser()
  }, [])

  const [isuser, setuser] = useState([])
  const alluser = async (ids) => {
    try {
      axios.get(`${API_URL}/users.php`).then((res) => {
        setuser(res.data.userlist.userdata)
      })
    } catch (error) {
      throw error
    }
  }

  const deleteConfirm = (id) => {
    if (window.confirm("Are you sure?")) {
      deleteUser(id)
    }
  }
  const deleteUser = async (id) => {
    try {
      axios
        .post(`${API_URL}/deleteusers.php`, {
          userids: id,
        })
        .then((res) => {
          setuser([])
          alluser()
          return
        })
    } catch (error) {
      throw error
    }
  }

  return (
    <ul className="divide-y divide-gray-200">
      {isuser.map((item) => (
        <li key={item.email} className="py-4 flex">
          <img className="h-10 w-10 rounded-full" src={item.name} alt="" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{item.name}</p>
            <p className="text-sm text-gray-500">{item.email}</p>
          </div>
          <Link to={`edit/${item.user_id}`} className="h-10 w-10 pl-4">
            {" "}
            Edit{" "}
          </Link>
          <p
            onClick={() => deleteConfirm(item.user_id)}
            className="h-10 w-10 pl-4"
          >
            {" "}
            Delete{" "}
          </p>
        </li>
      ))}
    </ul>
  )
}

export default Home
