import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signInSuccess } from '../slices/userSlice';
import { toast } from 'react-toastify';

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    password: '',
    // Add more fields as needed for admin
    role: currentUser?.isAdmin ? 'Admin' : 'Student',
    // Add student-specific fields
    school: currentUser?.school || '',
    grade: currentUser?.grade || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        toast.success('Profile updated successfully');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="bg-[#c7d5e9] min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className='text-center mb-8'>
          <h1 className="text-3xl font-bold text-[#001f61]">Your Profile</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#001f61] mb-1">Name</label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#c7d5e9] border border-[#4e7ecf] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0247ba] transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#001f61] mb-1">Email</label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#c7d5e9] border border-[#4e7ecf] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0247ba] transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#001f61] mb-1">Password</label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password to change"
              className="w-full bg-[#c7d5e9] border border-[#4e7ecf] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0247ba] transition"
            />
          </div>
          {!currentUser?.isAdmin && (
            <>
              <div>
                <label htmlFor="school" className="block text-sm font-medium text-[#001f61] mb-1">School</label>
                <input
                  id="school"
                  type="text"
                  value={formData.school}
                  onChange={handleChange}
                  className="w-full bg-[#c7d5e9] border border-[#4e7ecf] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0247ba] transition"
                />
              </div>
              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-[#001f61] mb-1">Grade</label>
                <input
                  id="grade"
                  type="text"
                  value={formData.grade}
                  onChange={handleChange}
                  className="w-full bg-[#c7d5e9] border border-[#4e7ecf] rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#0247ba] transition"
                />
              </div>
            </>
          )}
          <button type="submit" className="w-full bg-[#0247ba] hover:bg-[#001f61] text-white font-semibold rounded-md py-3 transition duration-300">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashProfile;