import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashCreateQuiz = () => {
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    startDate: '',
    endDate: '',
    categories: [],
    isBasic: false,
    imageLink: '',
    description: '',
  });

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/questions/category');
        setCategoryOptions(response.data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewQuiz((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setNewQuiz((prev) => {
      const updatedCategories = checked
        ? [...prev.categories, value]
        : prev.categories.filter(cat => cat !== value);
      
      if (updatedCategories.length > 4) {
        setError('You can only select up to 4 categories');
        return prev;
      }
      setError('');
      return { ...prev, categories: updatedCategories };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuiz.title || !newQuiz.startDate || !newQuiz.endDate || newQuiz.categories.length !== 4) {
      setError('Please fill all required fields and select exactly 4 categories');
      return;
    }
    console.log('New quiz submitted:', newQuiz);
    // Reset form and error state after successful submission
    setNewQuiz({
      title: '',
      startDate: '',
      endDate: '',
      categories: [],
      isBasic: false,
      imageLink: '',
      description: '',
    });
    setError('');
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-semibold mb-4 text-[#001f61]">Create New Quiz</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-[#001f61] text-sm font-bold mb-2" htmlFor="title">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Quiz Title"
            value={newQuiz.title}
            onChange={handleInputChange}
            required
            className="border border-[#4e7ecf] rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4 flex space-x-4">
        <div className="w-1/2">
          <label className="block text-[#001f61] text-sm font-bold mb-2" htmlFor="startDate">
            Start Date *
          </label>
          <input
            id="startDate"
            name="startDate"
            type="datetime-local"
            value={newQuiz.startDate}
            onChange={handleInputChange}
            min={new Date().toISOString().slice(0, 16)}
            required
            className="border border-[#4e7ecf] rounded-md p-2 w-full"
          />
        </div>
        <div className="w-1/2">
          <label className="block text-[#001f61] text-sm font-bold mb-2" htmlFor="endDate">
            End Date *
          </label>
          <input
            id="endDate"
            name="endDate"
            type="datetime-local"
            value={newQuiz.endDate}
            onChange={handleInputChange}
            min={newQuiz.startDate}
            required
            className="border border-[#4e7ecf] rounded-md p-2 w-full"
          />
        </div>
        </div>
        <div className="mb-4">
          <label className="block text-[#001f61] text-sm font-bold mb-2">
            Categories * (Select exactly 4)
          </label>
          <div className="flex flex-wrap">
            {categoryOptions.map(category => (
              <label key={category} className="inline-flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  checked={newQuiz.categories.includes(category)}
                  onChange={handleCategoryChange}
                  disabled={newQuiz.categories.length >= 4 && !newQuiz.categories.includes(category)}
                  className="form-checkbox h-5 w-5 text-[#0247ba]"
                />
                <span className="ml-2 text-[#001f61]">{category}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="isBasic"
              checked={newQuiz.isBasic}
              onChange={handleInputChange}
              className="form-checkbox h-5 w-5 text-[#0247ba]"
            />
            <span className="ml-2 text-[#001f61]">Is Basic Quiz</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-[#001f61] text-sm font-bold mb-2" htmlFor="imageLink">
            Image Link
          </label>
          <input
            id="imageLink"
            name="imageLink"
            type="text"
            placeholder="Image URL"
            value={newQuiz.imageLink}
            onChange={handleInputChange}
            className="border border-[#4e7ecf] rounded-md p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#001f61] text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Quiz description"
            value={newQuiz.description}
            onChange={handleInputChange}
            className="border border-[#4e7ecf] rounded-md p-2 w-full h-32"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#0247ba] hover:bg-[#001f61] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Quiz
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashCreateQuiz;
