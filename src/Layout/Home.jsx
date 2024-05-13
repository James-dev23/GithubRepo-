import React, { useState, useEffect } from "react";
import axios from "axios";
import ErrorBoundary from "../Components/Errorboundary";




function Home() {
  const [repositoryDetails, setRepositoryDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(1); // Display only one item per page
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchUserRepositories = async (username) => {
      try {
        const response = await axios.get(`https://api.github.com/users/${username}/repos`);
        const repositories = response.data;
        
        // Fetch detailed information for each repository
        const repositoryDetails = await Promise.all(
          repositories.map(repo => fetchRepositoryDetails(repo.full_name))
        );
        
        setRepositoryDetails(repositoryDetails);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        setError("Error fetching repositories. Please try again later.");
        setLoading(false); // Set loading to false if there's an error
      }
    };
    
    // Function to fetch detailed information about a repository
    const fetchRepositoryDetails = async (fullName) => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${fullName}`);
        return response.data; // Return detailed repository information
      } catch (error) {
        console.error("Error fetching repository details:", error);
        return null;
      }
    };
    
    fetchUserRepositories("James-dev23");
  }, []);

  // Logic to get current item based on pagination
  const currentItems = repositoryDetails.slice(currentPage, currentPage + itemsPerPage);

  // Handle continuous movement to next page
  const nextContinuousPage = () => {
    const nextPage = (currentPage + 1) % repositoryDetails.length;
    setCurrentPage(nextPage);
  };

  // Handle continuous movement to previous page
  const prevContinuousPage = () => {
    const prevPage = (currentPage - 1 + repositoryDetails.length) % repositoryDetails.length;
    setCurrentPage(prevPage);
  };

  // Filter repositories based on search query
  const filteredRepositories = repositoryDetails.filter(repo =>
    repo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update current items to display based on search results
  const filteredCurrentItems = filteredRepositories.slice(currentPage, currentPage + itemsPerPage);

  return (
    <>
    <ErrorBoundary>
      <div>
        {/* This holds the search and filter repos  */}
        <input
          className="p-2 text-lg ms-20 sm:ms-20 bg-[#6c2fd4] text-white rounded-2xl outline-none"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search and filter repositories..."
        />
      </div>
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <div className="flex">
            {filteredCurrentItems.map((repo, index) => (
              <li className=" text-black list-none gap-2 p-3" key={index}>
                <div className="bg-white p-4 items-center flex-col gap-2 sm:gap-4 sm:p-4 w-[80%] shadow-2xl sm:min-w-[400px] min-h-[450px] flex sm:w-[30vw] absolute translate-x-[-50%] rounded-xl translate-y-[-50%] top-[55%] left-[50%] sm:top-[45%]">
                  <h2 className="font-bold text-3xl">{repo.name}</h2>
                  <p className="font-semibold text-xl">Description: {repo.description}</p>
                  <p className="text-xl font-bold">Language: {repo.language}</p>
                  <p className="text-xl font-bold">Stars: {repo.stargazers_count}</p>
                  <p className="text-xl font-bold">Forks: {repo.forks_count}</p>
                  <p className="text-xl font-bold">Created At: {new Date(repo.created_at).toLocaleDateString()}</p>
                 
                </div>
              </li>
            ))}
          </div>
          <div className="flex absolute translate-x-[-50%] rounded-xl translate-y-[-50%] left-[50%] top-[90%] sm:top-[80%]">
            <button
              className="bg-[#6c2fd4] text-white py-3 px-5 m-3 shadow-2xl"
              onClick={prevContinuousPage}
              disabled={repositoryDetails.length === 0 || repositoryDetails.length === 1}
            >
              Prev
            </button>
            <button
              className="bg-[#6c2fd4] text-white py-3 px-5 m-3 shadow-2xl"
              onClick={nextContinuousPage}
              disabled={repositoryDetails.length === 0 || repositoryDetails.length === 1}
            >
              Next
            </button>
          </div>
        </>
      )}
      </ErrorBoundary>
    </>
  );
}

export default Home;
