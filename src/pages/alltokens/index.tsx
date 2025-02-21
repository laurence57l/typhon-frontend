import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import imgCopy from "/public/images/copy.png";
import imgLink from "/public/images/link.png";
import { FaSortUp, FaSortDown } from "react-icons/fa"; // Sorting Icons

const TableReact = () => {
    const router = useRouter();
    const { page = 1, limit = 10, order = "asc", sortBy = "market_cap" } = router.query;

    const [productList, setProductList] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // Search query state
    const currentPage = Number(page);

    // Fetch token data from backend API
    useEffect(() => {
        const fetchTokenData = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `/api/solscan-tokens?page=${page}&limit=${limit}&order=${order}&sortBy=${sortBy}`
                );
                const data = await response.json();
                if (Array.isArray(data.solscanTokens)) {
                    setProductList(data.solscanTokens);
                    setTotalPages(data.totalPages || 1);
                } else {
                    console.error("Invalid response:", data);
                }
            } catch (error) {
                console.error("Error fetching token data:", error);
            }
            setLoading(false);
        };

        fetchTokenData();
    }, [page, limit, order, sortBy]);

    // Function to change page
    const changePage = (newPage: number) => {
        router.push(`/alltokens?page=${newPage}&limit=${limit}&order=${order}&sortBy=${sortBy}`, undefined, { shallow: true });
    };

    // Function to change limit
    const changeLimit = (newLimit: number) => {
        router.push(`/alltokens?page=1&limit=${newLimit}&order=${order}&sortBy=${sortBy}`, undefined, { shallow: true });
    };

    // Function to change sorting order
    const changeSorting = (newSortBy: string) => {
        const newOrder = sortBy === newSortBy && order === "asc" ? "desc" : "asc";
        router.push(`/alltokens?page=1&limit=${limit}&order=${newOrder}&sortBy=${newSortBy}`, undefined, { shallow: true });
    };

    // Pagination Logic - Show max 5 page buttons
    const getPaginationRange = () => {
        const totalVisible = 5;
        let start = Math.max(1, currentPage - Math.floor(totalVisible / 2));
        let end = Math.min(totalPages, start + totalVisible - 1);

        if (end - start + 1 < totalVisible) {
            start = Math.max(1, end - totalVisible + 1);
        }

        return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    };

    // Navigate to token detail page
    const goToDetailPage = (tokenAddress: string) => {
        router.push(`/detailtoken?token=${tokenAddress}`);
    };

    // Handle search input change
    const handleSearchChange = (e: any) => {
        setSearchQuery(e.target.value);
    };

    // Handle form submit for search
    const handleSearchSubmit = (e: any) => {
        e.preventDefault();
        if (searchQuery) {
            router.push(`/detailtoken?token=${searchQuery}`);
        }
    };

    return (
        <div className="h-full pt-10 pb-14">
            <div className="container px-5 py-5 mx-auto">
                <div className="flex justify-between items-center mb-5">
                    <div className="text-xl font-bold">Token List</div>
                    {/* Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search token address"
                            className="px-3 py-2 border rounded-lg text-sm w-96"  // Adjusted width (w-96 for 24rem)
                        />
                        <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                            Search
                        </button>
                    </form>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-full py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-400 border-solid mb-4"></div>
                        <div className="text-center text-gray-300 text-2xl font-bold">
                            Loading All Tokens...
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full text-center border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-800 text-white">
                                        <th>No</th>
                                        <th className="px-4 py-2 border">Token</th>
                                        <th className="px-4 py-2 border">Solana Address</th>
                                        <th className="px-4 py-2 border cursor-pointer" onClick={() => changeSorting("market_cap")}>
                                            Market Cap {sortBy === "market_cap" && (order === "asc" ? <FaSortUp /> : <FaSortDown />)}
                                        </th>
                                        <th className="px-4 py-2 border cursor-pointer" onClick={() => changeSorting("price")}>
                                            Price {sortBy === "price" && (order === "asc" ? <FaSortUp /> : <FaSortDown />)}
                                        </th>
                                        <th className="px-4 py-2 border cursor-pointer" onClick={() => changeSorting("supply")}>
                                            Supply {sortBy === "supply" && (order === "asc" ? <FaSortUp /> : <FaSortDown />)}
                                        </th>
                                        <th className="px-4 py-2 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productList.map((token, index) => {
                                        // Correct index calculation for pagination
                                        const adjustedIndex = index + 1 + (currentPage - 1) * limit;

                                        // Format the price
                                        const formattedPrice = token?.price || "N/A";
                                        // Format the supply
                                        const supply = token?.supply || "N/A";

                                        return (
                                            <tr key={index} className="border">
                                                <td>{adjustedIndex}</td>
                                                <td className="px-4 py-2 border">
                                                    <div className="flex justify-center items-center">
                                                        <img
                                                            src={token?.icon || "/images/tokens/new_token.png"}
                                                            alt="Token Logo"
                                                            width={30}
                                                            height={30}
                                                            className="mr-2"
                                                        />
                                                        {token?.symbol || "N/A"}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 border">
                                                    <div className="flex justify-center items-center">
                                                        {token?.address || "N/A"}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 border">{token.market_cap}</td>
                                                <td className="px-4 py-2 border">${formattedPrice}</td>
                                                <td className="px-4 py-2 border">{supply}</td>
                                                <td className="px-4 py-2 border">
                                                    <button
                                                        className="text-blue-500 hover:text-blue-700"
                                                        onClick={() => navigator.clipboard.writeText(token?.address)}
                                                    >
                                                        <Image
                                                            src={imgCopy}
                                                            alt="Copy"
                                                            width={16}
                                                            height={16}
                                                            className="inline-block mr-1"
                                                        />
                                                        Copy
                                                    </button>
                                                    <a
                                                        href={`https://solscan.io/token/${token?.address}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="ml-3 text-blue-500 hover:text-blue-700"
                                                    >
                                                        <Image
                                                            src={imgLink}
                                                            alt="Link"
                                                            width={16}
                                                            height={16}
                                                            className="inline-block mr-1"
                                                        />
                                                        Solscan
                                                    </a>
                                                    {/* Add link to navigate to token detail */}
                                                    <button
                                                        className="ml-3 text-blue-500 hover:text-blue-700"
                                                        onClick={() => goToDetailPage(token?.address)}
                                                    >
                                                        View Details
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                        {/* Pagination Controls */}
                        <div className="mt-5 flex justify-center items-center gap-3">
                            <button
                                onClick={() => changePage(currentPage - 1)}
                                disabled={currentPage <= 1}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {getPaginationRange().map((pageNum) => (
                                <button
                                    key={pageNum}
                                    onClick={() => changePage(pageNum)}
                                    className={`px-4 py-2 text-white rounded-lg hover:bg-gray-700 ${pageNum === currentPage ? 'bg-blue-600' : ''
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            ))}
                            <button
                                onClick={() => changePage(currentPage + 1)}
                                disabled={currentPage >= totalPages}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>

                        {/* Limit Selector */}
                        <div className="mt-3">
                            Show:
                            {[5, 10, 20].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => changeLimit(num)}
                                    className="ml-2 px-4 py-2 text-white border border-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {num}
                                </button>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TableReact;
