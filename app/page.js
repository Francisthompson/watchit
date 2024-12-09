"use client";

import { useState } from "react";

export default function Page() {
  const [searchQuery, setSearchQuery] = useState(""); // To store the search input
  const [results, setResults] = useState([]); // To store title_results
  const [error, setError] = useState(null); // To handle any errors
  const [loading, setLoading] = useState(false); // To indicate loading state
  const [selectedTitleId, setSelectedTitleId] = useState(null); // To track the selected title
  const [selectedTitleDetails, setSelectedTitleDetails] = useState(null); // To store details of the selected title
  const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for title sources
  const [selectedRegion, setSelectedRegion] = useState("US"); // Default to US
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false); // Modal visibility

  const handleSearch = async () => {
    if (!searchQuery.trim()) return; // Prevent empty searches
    setSearchQuery("");
    setLoading(true); // Start loading
    setError(null); // Reset error state
    setSelectedTitleId(null); // Reset selected title
    setSelectedTitleDetails(null); // Reset title details when new search starts

    try {
      const url = `https://api.watchmode.com/v1/search/?apiKey=EpTZ4pQNA8WPTxO2M4LhZ0zMxC2kJ3W95HN3wzNo&search_field=name&search_value=${encodeURIComponent(
        searchQuery
      )}`;
      console.log("Fetching from URL:", url);

      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);

      if (data.title_results) {
        setResults(data.title_results); // Update with title_results
      } else {
        setResults([]); // Clear results if none are found
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch results. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const fetchTitleSources = async (titleId) => {
    setDetailsLoading(true); // Start loading
    setError(null); // Reset error state
    setSelectedTitleId(titleId); // Set the clicked title ID

    try {
      const url = `https://api.watchmode.com/v1/title/${titleId}/sources/?apiKey=EpTZ4pQNA8WPTxO2M4LhZ0zMxC2kJ3W95HN3wzNo`;
      console.log("Fetching title sources from URL:", url);

      const response = await fetch(url);
      const data = await response.json();
      console.log("Title Sources Response:", data);

      setSelectedTitleDetails(data); // Update with fetched details
    } catch (err) {
      console.error("Title Sources API Error:", err);
      setError("Failed to fetch title sources. Please try again.");
    } finally {
      setDetailsLoading(false); // Stop loading
    }
  };

  return (
    <div className="bg-white/[.05] min-h-screen p-4">
      {/* Title */}
      <h1 className="text-5xl text-white-800 mb-5 mt-1 text-center">Watchit</h1>

      {/* Search Bar */}
      <div className="flex items-center gap-4 mb-8 justify-center">
        <input
          type="text"
          placeholder="Search for a Movie or TV Show"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-1/2 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white-500 text-black placeholder-gray-500"
        />
        <button
          onClick={() => setIsRegionModalOpen(true)}
          className="p-2 bg-gray-100 text-black rounded-lg shadow-sm hover:bg-gray-200 ml-5"
        >
          Region: {selectedRegion}
        </button>
      </div>

      {/* Loading State */}
      {loading && <p className="mt-4 text-gray-700 text-center">Loading...</p>}

      {/* Error State */}
      {error && <p className="mt-4 text-red-600 text-center">{error}</p>}

      {/* Results */}
      <div className="flex gap-8">
        <ul
          className="w-1/2 bg-white p-4 rounded-lg shadow-lg space-y-4 overflow-y-auto"
          style={{ maxHeight: "500px" }}
        >
          {results.map((result) => (
            <li
              key={result.id}
              className={`p-4 border border-black/[.5] rounded-lg text-black font-sans shadow-sm cursor-pointer hover:bg-gray-100 ${
                selectedTitleId === result.id ? "bg-gray-300" : ""
              }`}
              onClick={() => fetchTitleSources(result.id)}
            >
              <h2 className="font-bold text-xl">{result.name}</h2>
              <p>
                {result.type === "movie" ? "Movie" : "TV Show"} ({result.year})
              </p>
              {result.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${result.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:underline mt-2"
                >
                  View on IMDb
                </a>
              )}
            </li>
          ))}
        </ul>

        {/* Title Details */}
        <div
          className="w-1/2 h-min bg-white p-4 rounded-lg shadow-lg space-y-4 overflow-y-auto"
          style={{ maxHeight: "500px" }}
        >
          {detailsLoading && <p>Loading details...</p>}

          {selectedTitleDetails ? (
            <>
              <h2 className="font-bold text-xl mb-4 text-black">
                Available On:
              </h2>
              <ul className="space-y-2 text-black">
                {selectedTitleDetails
                  .filter((source) => source.region === selectedRegion) // Filter by region
                  .map((source) => (
                    <li
                      key={source.source_id}
                      className="border-b border-t pt-2 border-black/[.5] pb-2"
                    >
                      <p>
                        {source.name} -{" "}
                        <a
                          href={source.web_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-500 hover:underline"
                        >
                          Watch it Here!
                        </a>
                      </p>
                    </li>
                  ))}
              </ul>
              {selectedTitleDetails.filter(
                (source) => source.region === selectedRegion
              ).length === 0 && (
                <p className="text-gray-500">
                  No sources available for this region.
                </p>
              )}
            </>
          ) : (
            !detailsLoading && (
              <p className="text-gray-400">Select a title to see sources.</p>
            )
          )}
        </div>
      </div>

      {/* Region Selector Modal */}
      {isRegionModalOpen && (
        <div className="fixed inset-0 bg-black/[.5] flex items-center justify-center">
          <div className="bg-black/[.5] p-6 rounded-lg shadow-lg text-center space-y-4">
            <h3 className="text-xl font-bold">Select Your Region</h3>
            <div className="flex items-center justify-center gap-4">
              {["CA", "US", "GB"].map((region) => (
                <button
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region); // Set the selected region
                    setIsRegionModalOpen(false); // Close modal
                  }}
                  className="p-2 text-white rounded-lg hover:bg-lime-600"
                >
                  {region}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsRegionModalOpen(false)} // Close modal without selection
              className="p-2 text-white-800 hover:underline"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
