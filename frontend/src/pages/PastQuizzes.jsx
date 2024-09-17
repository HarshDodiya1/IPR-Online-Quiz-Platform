import React, { useState, useEffect } from 'react';

const PastQuizzes = () => {
  const [activeSection, setActiveSection] = useState('pastQuizzes');
  const [quizzes, setQuizzes] = useState([
    { id: 1, title: 'Math Quiz 1', startDate: '2024-09-01', endDate: '2024-09-10', category: 'math', participants: 45, image: '/api/placeholder/300/200' },
    { id: 2, title: 'Science Quiz 1', startDate: '2024-09-05', endDate: '2024-09-15', category: 'science', participants: 38, image: '/api/placeholder/300/200' },
    { id: 3, title: 'History Quiz 1', startDate: '2024-09-10', endDate: '2024-09-20', category: 'history', participants: 52, image: '/api/placeholder/300/200' },
  ]);
  const [filteredQuizzes, setFilteredQuizzes] = useState(quizzes);
  const [filterCategory, setFilterCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [newQuiz, setNewQuiz] = useState({
    title: '',
    startDate: '',
    endDate: '',
    category: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    const filtered = quizzes.filter(quiz => 
      (filterCategory === '' || quiz.category === filterCategory) &&
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredQuizzes(filtered);
  }, [filterCategory, searchTerm, quizzes]);

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
    setQuizzes((prev) => [...prev, { ...newQuiz, id: prev.length + 1, participants: 0 }]);
    setNewQuiz({
      title: '',
      startDate: '',
      endDate: '',
      category: '',
      description: '',
      image: null,
    });
    setActiveSection('pastQuizzes');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-orange-500">Quiz App</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button onClick={() => setActiveSection('pastQuizzes')} className={`${activeSection === 'pastQuizzes' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-500'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Past Quizzes
                </button>
                <button onClick={() => setActiveSection('createQuiz')} className={`${activeSection === 'createQuiz' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-500'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Create Quiz
                </button>
                <button onClick={() => setActiveSection('analytics')} className={`${activeSection === 'analytics' ? 'border-orange-500 text-gray-900' : 'border-transparent text-gray-500'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}>
                  Analytics
                </button>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
              <select className="border border-gray-300 rounded-md p-2">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
              <button onClick={() => setActiveSection('adminProfile')} className="bg-orange-500 text-white px-4 py-2 rounded-md">
                Admin Profile
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeSection === 'pastQuizzes' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Past Quizzes</h2>
              <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="border border-gray-300 rounded-md p-2"
                  >
                    <option value="">All Categories</option>
                    <option value="math">Math</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="literature">Literature</option>
                  </select>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search quizzes..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="border border-gray-300 rounded-md p-2 pl-10"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map((quiz) => (
                  <div key={quiz.id} className="bg-white shadow rounded-lg overflow-hidden">
                    <img src={quiz.image} alt={quiz.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{quiz.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{quiz.startDate} - {quiz.endDate}</p>
                      <p className="text-sm text-gray-600 mb-2">Category: {quiz.category}</p>
                      <p className="text-sm font-medium text-orange-500">
                        {quiz.participants} student{quiz.participants !== 1 ? 's' : ''} participated
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'createQuiz' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Create New Quiz</h2>
              <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          )}

          {activeSection === 'analytics' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
              <p>Analytics dashboard coming soon...</p>
            </div>
          )}

          {activeSection === 'adminProfile' && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Admin Profile</h2>
              <p>Admin profile management coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PastQuizzes;