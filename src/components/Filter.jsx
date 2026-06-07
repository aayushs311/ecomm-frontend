import { FormControl, InputLabel, MenuItem, Select, IconButton, Tooltip, Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { FaArrowDown, FaArrowUp, FaSearch, FaSync } from 'react-icons/fa';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Filter = () => {
    const categories = [
        {
            "categoryId": 1,
            "categoryName": "Sports & Fitness"
        },
        {
            "categoryId": 2,
            "categoryName": "Phones"
        },
        {
            "categoryId": 3,
            "categoryName": "Clothes"
        }
    ]
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    
    const [searchParams] = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const [category, setCategory] = useState("all");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const currentCategory = searchParams.get("category") || "all";
        const currentSortOrder = searchParams.get("sortOrder") || "asc";
        const currentSearchTerm = searchParams.get("keyword") || "";

        setCategory(currentCategory);
        setSortOrder(currentSortOrder);
        setSearchTerm(currentSearchTerm);
    }, [searchParams])

    useEffect(() => {
        const handler = setTimeout(() =>{
            if (searchTerm) {
                params.set("keyword", searchTerm);
            } else {
                params.delete("keyword");
            }
            navigate(`${pathname}?${params.toString()}`);
        }, 700)

        return () => {
            clearTimeout(handler);
        }
    }, [searchParams, navigate, searchTerm, pathname])

    const handleCategoryChange = (event) => {
        const selectedCategory = event.target.value;

        if(selectedCategory === "all") {
            params.delete("category");
        } else {
            params.set("category", selectedCategory);
        }
        navigate(`${pathname}?${params.toString()}`);
    }

    const toggleSortOrder = () => {
        setSortOrder((prevSortOrder) => {
            const sortOrder = (prevSortOrder === "asc") ? "desc" : "asc";
            params.set("sortOrder", sortOrder);
            navigate(`${pathname}?${params.toString()}`);
            return sortOrder;
        })
    }

    const handleClearFilters = () => {
        navigate({pathname : window.location.pathname});
    }

    return (
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between items-center gap-4">
            {/* SEARCH BAR */}
            <div className="relative flex items-center 2xl:w-112.5 sm:w-105 w-full">
                <input
                    type="text"
                    placeholder="Search Products"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-400 text-slate-800 rounded-md py-2 pl-10 pr-4 w-full focus:outline-none focus:ring focus:ring-[#1976d2]"
                />
                <FaSearch className="absolute left-3 text-slate-800 size={20}"/>
            </div>

            {/* CATEGORY SELECTION */}
            <div className="flex sm:flex-row gap-4 items-center">
                <FormControl className="text-slate-800 border-slate-700" variant="outlined" size="small">
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                        labelId="category-select-label"
                        value={category}
                        onChange={handleCategoryChange}
                        label="Category"
                        className="min-w-30 text-slate-800 border-slate-700"
                    >
                        <MenuItem value="all">All</MenuItem>
                        {categories.map((item) => (
                            <MenuItem key={item.categoryId} value={item.categoryName}>
                                {item.categoryName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* SORT BUTTON & CLEAR FILTER */}
                <Tooltip title={`Sorted by price: ${sortOrder}`}>
                    <Button
                        variant="contained"
                        color="primary"
                        className="flex items-center gap-2 h-10"
                        onClick={toggleSortOrder}>
                        Sort By
                        {sortOrder === "asc" ? (
                            <FaArrowUp size={15} />
                            ) : (
                            <FaArrowDown size={15} />
                            )} 
                    </Button>
                </Tooltip>
                <button
                    onClick={handleClearFilters}
                    className="flex items-center gap-2 bg-rose-900 text-white px-3 py-2 rounded-md transition duration-300 ease-in shadow-md focus:outline-none cursor-pointer">
                    <FaSync size={15} />
                    <span className="font-semibold">Clear Filter</span>
                </button>
            </div>
        </div>
    )
}

export default Filter;