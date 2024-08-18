import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [productsPerPage, setproductsPerPage] = useState(5);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [brandFilter, setBrandFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [priceRangeFilter, setPriceRangeFilter] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('Brand Name');
    const [selectedCategory, setSelectedCategory] = useState('Category Name');
    const [selectedPriceRange, setSelectedPriceRange] = useState('Price Range');
    const [searchQuery, setSearchQuery] = useState('');
    const [sort, setSort] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const query = `page=${currentPage}&size=${productsPerPage}&brand=${brandFilter}&category=${categoryFilter}&priceRange=${priceRangeFilter}&search=${searchQuery}&sort=${sort}`;
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/allProducts?${query}`);
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error("Error fetching products:", error);
            setProducts([]);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchCount = async () => {
        try {
            const { data } = await axios(`${import.meta.env.VITE_API_URL}/productsCount?brand=${brandFilter}&category=${categoryFilter}&priceRange=${priceRangeFilter}&search=${searchQuery}`);
            setCount(data.count || 0);
        } catch (error) {
            console.error("Error fetching product count:", error);
            setCount(0);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, productsPerPage, brandFilter, categoryFilter, priceRangeFilter, searchQuery, sort]);

    useEffect(() => {
        fetchCount();
    }, [brandFilter, categoryFilter, priceRangeFilter, searchQuery]);

    const numberOfPages = Math.ceil(count / productsPerPage);
    const pages = numberOfPages > 0 ? [...Array(numberOfPages).keys()].map(element => element + 1) : [];

    const handlePaginationButton = (v) => setCurrentPage(v);

    const handleFilterChange = (setter, value, defaultValue) => {
        setCurrentPage(1);
        setter(value);
        defaultValue(value || defaultValue);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        setSearchQuery(e.target.elements.search.value.trim());
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setBrandFilter('');
        setCategoryFilter('');
        setPriceRangeFilter('');
        setSort('');
        setSearchQuery('');
    };

    return (
        <div className="container mx-auto">
            {/* search input */}
            <div className="mt-8">
                <form onSubmit={handleSearch} className="flex products-center ml-[18px] lg:ml-[570px]">
                    <input name="search" type="text" placeholder="Search Product..." className="input input-bordered w-full max-w-xs rounded-tr-none rounded-br-none" />
                    <input className="btn bg-blue-400 text-white rounded-tl-none rounded-bl-none hover:bg-blue-500" type="submit" value="Search" />
                </form>
            </div>
            {/* filter */}
            <div className="md:flex justify-between products-center space-y-2 ml-6 lg:ml-40">
                <div className="mt-4">
                    {/* brand filter */}
                    {/* <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1 border-2 border-blue-400 bg-blue-400 text-white hover:bg-blue-500 hover:border-blue-500">
                            {selectedBrand}
                        </div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {["Pilot", "Bic", "Sharpie", "Staedtler", "Parker", "Paper Mate", "Faber-Castell", "Cross", "Montblanc", "Uni-ball"].map((brand) => (
                                <li key={brand}><a onClick={() => handleFilterChange(setBrandFilter, brand, 'Brand')}>{brand}</a></li>
                            ))}
                        </ul>
                    </div> */}
                    {/* category filter */}
                    {/* <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1 border-2 border-blue-400 bg-blue-400 text-white hover:bg-blue-500 hover:border-blue-500">{selectedCategory}</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {["Pens", "Pencils", "Notebooks", "Erasers", "Highlighters", "Markers"].map((category) => (
                                <li key={category}><a onClick={() => handleFilterChange(setCategoryFilter, category, 'Category')}>{category}</a></li>
                            ))}
                        </ul>
                    </div> */}
                    {/* price range filter */}
                    {/* <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn m-1 border-2 border-blue-400 bg-blue-400 text-white hover:bg-blue-500 hover:border-blue-500">{selectedPriceRange}</div>
                        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            {["0-10", "10-20", "20-50", "50-100", "100-200", "200-300", "300-400", "400-500"].map((range) => (
                                <li key={range}><a onClick={() => handleFilterChange(setPriceRangeFilter, range, 'Price Range')}>{`$${range.split('-')[0]} - $${range.split('-')[1]}`}</a></li>
                            ))}
                        </ul>
                    </div> */}
                </div>
                
               {/* Sorting */}
                <div className="ml-6 lg:mr-56 lg:ml-0">
                    <select onChange={handleSortChange} value={sort} name='sort' id='sort' className='border-blue-400 border-2 p-2 rounded-lg'>
                        <option value='price-asc'>Price Range Low to High</option>
                        <option value='price-desc'>Price Range High to Low</option>
                        <option value='date-desc'>Newest first</option>
                    </select>
                    <button
                        onClick={handleReset}
                        className="btn ml-4 md:ml-4 lg:ml-4 mt-2 md:mt-0 lg:mt-0 border-blue-400 bg-blue-400 text-white">Clear</button>
                </div>
            </div>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : products.length > 0 ? (
                    products.map(product => <ProductCard key={product?._id} product={product}></ProductCard>)
                ) : (
                    <p>No products found</p>
                )}
            </div>

            {/* Pagination part */}
            <div className='flex justify-center mt-12'>
              
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePaginationButton(currentPage - 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-400  hover:text-white'
                >
                    <div className='flex products-center -mx-1'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M7 16l-4-4m0 0l4-4m-4 4h18'
                            />
                        </svg>
                        <span className='mx-1'>previous</span>
                    </div>
                </button>
                
                {pages.map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePaginationButton(pageNumber)}
                        className={`${
                            currentPage === pageNumber ? 'bg-blue-400 text-white' : ''
                        } px-4 py-2 mx-1 text-gray-700 capitalize bg-gray-200 rounded-md hover:bg-blue-400  hover:text-white`}
                    >
                        {pageNumber}
                    </button>
                ))}
                
                <button
                    disabled={currentPage === numberOfPages}
                    onClick={() => handlePaginationButton(currentPage + 1)}
                    className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-400  hover:text-white'
                >
                    <div className='flex products-center -mx-1'>
                        <span className='mx-1'>Next</span>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-6 h-6 mx-1 rtl:-scale-x-100'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M17 8l4 4m0 0l-4 4m4-4H3'
                            />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ProductList;
