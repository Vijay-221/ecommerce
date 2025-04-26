import React, { useState } from 'react'
import { toast } from 'react-toastify'
import SummaryApi from '../common'
import { FaUserCircle, FaCamera } from "react-icons/fa"; 

const EditProfile = ({ user, setUser, setEditMode }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    oldPassword: '',
    newPassword: '',
    profilePic: user.profilePic
  })
  const [previewPic, setPreviewPic] = useState(user.profilePic)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewPic(imageUrl)
      setFormData(prev => ({ ...prev, profilePic: file }))
    }
  }

  const handleUpdateProfile = async () => {
    const updateForm = new FormData()
    updateForm.append('name', formData.name)
    updateForm.append('email', formData.email)
    updateForm.append('oldPassword', formData.oldPassword)
    updateForm.append('newPassword', formData.newPassword)
    
    if (formData.profilePic instanceof File) {
      updateForm.append('profilePic', formData.profilePic)
    }

    try {
      const res = await fetch(SummaryApi.updateUser.url, {
        method: SummaryApi.updateUser.method,
        body: updateForm,
        credentials: 'include',
      })

      const data = await res.json()

      if (data.success) {
        toast.success('Profile updated successfully')
        setUser(data.data)
        setEditMode(false)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Error updating profile')
    }
  }

  return (
    <div className="space-y-4 text-center">
      <div className="relative w-32 h-32 mx-auto mb-4">
        <label htmlFor="profilePicInput" className="cursor-pointer">
          {previewPic ? (
            <img 
              src={previewPic} 
              alt="Preview" 
              className="w-32 h-32 rounded-full border-4 border-gray-200 object-cover" 
            />
          ) : (
            <FaUserCircle className="w-32 h-32 text-gray-400" />
          )}
          <div className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow-md">
            <FaCamera className="text-gray-700" />
          </div>
        </label>
        <input 
          type="file" 
          id="profilePicInput" 
          onChange={handleImageChange} 
          className="hidden" 
        />
      </div>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleInputChange}
        placeholder="Old Password"
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleInputChange}
        placeholder="New Password"
        className="w-full p-2 border rounded"
      />
      <div className="flex justify-center gap-4">
        <button onClick={handleUpdateProfile} className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
        <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
      </div>
    </div>
  )
}

export default EditProfile
