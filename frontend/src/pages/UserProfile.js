import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { FaRegUserCircle } from "react-icons/fa";
import EditProfile from '../components/EditUserProfile';

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          credentials: 'include',
        })

        const data = await res.json()

        if (data.success) {
          setUser(data.data)
        } else {
          toast.error(data.message)
        }
      } catch (err) {
        toast.error('Failed to fetch user profile')
      }
    }

    fetchUser()
  }, [])

  return (
    <div className="container mx-auto p-4 mt-20">
      <h2 className="text-3xl text-center font-bold mb-8">My Profile</h2>
      {
        user ? (
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl mx-auto">
            {
              editMode ? (
                <EditProfile user={user} setUser={setUser} setEditMode={setEditMode} />
              ) : (
                <>
                  {user.profilePic ? (
                    <img 
                      src={user.profilePic} 
                      alt="Profile" 
                      className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-200 object-cover" 
                    />
                  ) : (
                    <FaRegUserCircle className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-gray-200" />
                  )}
                  <div className="text-lg space-y-3 text-center">
                    <p><strong className="text-gray-700">Name:</strong> <span className="font-medium">{user.name}</span></p>
                    <p><strong className="text-gray-700">Email:</strong> <span className="font-medium">{user.email}</span></p>
                    <p><strong className="text-gray-700">Role:</strong> <span className="font-medium">{user.role}</span></p>
                    <button onClick={() => setEditMode(true)} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Edit Profile</button>
                  </div>
                </>
              )
            }
          </div>
        ) : (
          <p className="text-center text-lg">Loading...</p>
        )
      }
    </div>
  )
}

export default UserProfile
