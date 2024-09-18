import React from 'react';

const DashProfile = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className='text-center mb-8'>
          <h1 className="text-3xl font-bold text-orange-600">Your Profile</h1>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="w-32 h-32 bg-orange-200 rounded-full flex items-center justify-center overflow-hidden">
            <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
        
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Harsh Dodiya"
              className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="dodiyaharsh999@gmail.com"
              className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
            />
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-md py-3 transition duration-300">
            Update Profile
          </button>
        </form>
        
        <div className="flex justify-between mt-8 text-sm">
          <button className="text-red-500 hover:text-red-600 font-medium transition">Delete Account</button>
          <button className="text-orange-500 hover:text-orange-600 font-medium transition">Sign Out</button>
        </div>
      </div>
    </div>
  );
};

export default DashProfile;
