import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    navigate(`/jobs?search=${query}`);
  };

  return (
    <div>
      <Header />
      
      <main className="bg-gray-100 min-h-screen">
        <div className="container mx-auto py-16 px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800">Find Your Dream Job</h1>
            <p className="mt-4 text-gray-600">Search through thousands of jobs and find the one that's perfect for you.</p>
          </div>

          <form onSubmit={handleSearch} className="flex justify-center mb-12">
            <input
              type="text"
              name="search"
              placeholder="Search jobs..."
              className="w-full md:w-2/3 p-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Search
            </button>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Technology</h3>
              <p className="text-gray-600">Explore jobs in the tech industry.</p>
              <button
                onClick={() => navigate('/jobs?category=technology')}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                View Jobs
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Healthcare</h3>
              <p className="text-gray-600">Find opportunities in healthcare.</p>
              <button
                onClick={() => navigate('/jobs?category=healthcare')}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                View Jobs
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">Finance</h3>
              <p className="text-gray-600">Discover finance-related careers.</p>
              <button
                onClick={() => navigate('/jobs?category=finance')}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
              >
                View Jobs
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
