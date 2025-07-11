// import { useState, useEffect } from "react";
// import { Search, X, Loader } from "lucide-react";

// export default function SearchComponent({ onResultSelect, placeholder = "Search content...", className = "" }) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Only fetch if there's a query with at least 2 characters
//     if (query.length < 2) {
//       setResults([]);
//       return;
//     }

//     const fetchResults = async () => {
//       setIsLoading(true);
//       setError(null);
      
//       try {
//         // Replace this with your actual API endpoint
//         const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        
//         if (!response.ok) {
//           throw new Error("Failed to fetch search results");
//         }
        
//         const data = await response.json();
//         setResults(data);
//         setIsOpen(true);
//       } catch (err) {
//         setError("An error occurred while fetching results");
//         console.error(err);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // Debounce search requests to avoid too many API calls
//     const timeoutId = setTimeout(() => {
//       fetchResults();
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [query]);

//   const handleInputChange = (e) => {
//     setQuery(e.target.value);
    
//     if (e.target.value === "") {
//       setIsOpen(false);
//     }
//   };

//   const handleResultClick = (result) => {
//     if (onResultSelect) {
//       onResultSelect(result);
//     }
//     setIsOpen(false);
//     setQuery("");
//   };

//   const clearSearch = () => {
//     setQuery("");
//     setResults([]);
//     setIsOpen(false);
//   };

//   return (
//     <div className={`relative ${className}`}>
//       <div className="flex items-center bg-gray-50 rounded-full px-4 py-2 border border-gray-200 w-full">
//         <input
//           type="text"
//           value={query}
//           onChange={handleInputChange}
//           placeholder={placeholder}
//           className="bg-transparent border-none outline-none text-sm flex-1"
//         />
//         {isLoading ? (
//           <Loader size={18} className="text-gray-400 animate-spin" />
//         ) : query ? (
//           <X 
//             size={18} 
//             className="text-gray-400 cursor-pointer hover:text-gray-600" 
//             onClick={clearSearch}
//           />
//         ) : (
//           <Search size={18} className="text-gray-400" />
//         )}
//       </div>

//       {/* Results dropdown */}
//       {isOpen && results.length > 0 && (
//         <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg max-h-96 overflow-y-auto z-50 border border-gray-200">
//           <ul className="py-1">
//             {results.map((result) => (
//               <li
//                 key={result.id}
//                 className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
//                 onClick={() => handleResultClick(result)}
//               >
//                 <div className="flex flex-col">
//                   <span className="font-medium text-gray-800">{result.title}</span>
//                   <span className="text-sm text-gray-500">{result.description}</span>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {isOpen && results.length === 0 && query.length >= 2 && !isLoading && !error && (
//         <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-50 border border-gray-200">
//           <div className="p-4 text-center text-gray-500">
//             No results found for "{query}"
//           </div>
//         </div>
//       )}

//       {isOpen && error && (
//         <div className="absolute mt-2 w-full bg-white rounded-md shadow-lg z-50 border border-gray-200">
//           <div className="p-4 text-center text-red-500">
//             {error}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }