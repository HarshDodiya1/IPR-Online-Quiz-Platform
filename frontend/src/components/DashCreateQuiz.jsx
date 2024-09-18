import React, { useState } from 'react';

const DashCreateQuiz = () => {
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    startDate: '',
    endDate: '',
    category: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewQuiz((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the new quiz data to your backend
    console.log('New quiz submitted:', newQuiz);
    // Reset the form
    setNewQuiz({
      title: '',
      startDate: '',
      endDate: '',
      category: '',
      description: '',
      image: null,
    });
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4">Create New Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Quiz Title"
            value={newQuiz.title}
            onChange={handleInputChange}
            required
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
              Start Date
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              value={newQuiz.startDate}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
              End Date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              value={newQuiz.endDate}
              onChange={handleInputChange}
              required
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newQuiz.category}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="">Select a category</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            <option value="literature">Literature</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Quiz description"
            value={newQuiz.description}
            onChange={handleInputChange}
            className="border border-gray-300 rounded-md p-2 w-full h-32"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Add Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashCreateQuiz;