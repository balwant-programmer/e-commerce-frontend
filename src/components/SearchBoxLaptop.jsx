import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import {
  focuseAction,
  searchQueryStringAction,
} from "../redux/Slice/searchSlice";
import { useLazyGetAllProductsearchQuery } from "../rtkQuery/productServices";
import { resprice } from "../redux/Slice/CategryFilterSlice";
import { searchFilterDataAction } from "../redux/FilterDataSlice";
import { categoryaction } from "../redux/Slice/CategorySlice";
import { useLocation, useNavigate } from "react-router-dom";
const SearchBoxLaptop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLaoding] = useState(false);
  const dispatch = useDispatch();
  const [searchFun, { data: SearchQueryData, isLoading: searchisLoading }] =
    useLazyGetAllProductsearchQuery();
  const { searchQuery } = useSelector((state) => state?.searchreducer);

  useEffect(() => {
    if (SearchQueryData?.data.length > 0) {
      dispatch(searchFilterDataAction(SearchQueryData?.data));
    }
  }, [SearchQueryData, dispatch]);

  useEffect(() => {
    const fectData = async () => {
      if (!searchQuery) {
        dispatch(focuseAction(false));
        dispatch(searchQueryStringAction(searchQuery));
        await searchFun(searchQuery);
        dispatch(resprice(""));
        dispatch(categoryaction("All"));
      }
    };
    fectData();
  }, [searchQuery]);

  const HandleSearch = async (event) => {
    if (event.key === "Enter") {
      try {
        dispatch(searchQueryStringAction(searchQuery));
        setLaoding(true);
        const { data } = await searchFun(searchQuery);

        if (data.success) {
          setLaoding(false);
        }
        dispatch(focuseAction(false));
      } catch (error) {
        console.log("erro isnSerach Data..", error);
      } finally {
        setLaoding(false);
      }
    }
  };

  const handleIconClick = async () => {
    try {
      dispatch(searchQueryStringAction(searchQuery));
      setLaoding(true);
      const { data } = await searchFun(searchQuery);
      if (data.success) {
        setLaoding(false);
      }
      dispatch(focuseAction(false));
    } catch (error) {
      console.log("erro isnSerach Data..", error);
    } finally {
      setLaoding(false);
    }
  };

  const handleFocus = () => {
    if (location.pathname !== "/") {
      navigate("/");
    }
    dispatch(focuseAction(true));
    dispatch(resprice(""));

    dispatch(dispatch(categoryaction("All")));
  };

  return (
    <div
      className="flex  border-2  rounded-3xl border-green-400 
            w-full md:w-1/2  px-2 justify-between  items-center"
    >
      {searchQuery && (
        <CloseIcon
          onClick={() => dispatch(searchQueryStringAction(""))}
          className="text-green-500 cursor-pointer hover:text-red-300 transition duration-200"
        />
      )}
      <input
        onFocus={handleFocus}
        value={searchQuery}
        onKeyDown={HandleSearch}
        onChange={(e) => dispatch(searchQueryStringAction(e.target.value))}
        placeholder="Search Shop!"
        className="w-full text-md bg-transparent outline-none rounded py-1  
              transition duration-200 pl-4"
      />

      <SearchIcon
        onClick={handleIconClick}
        className="text-rose-500 hover:text-red-300 transition cursor-pointer duration-200"
      />
      {loading && (
        <div className="size-8 border-b-2 absolute top-52 left-[50%] border-b-red-600 flex justify-center items-center animate-spin rounded-full mx-auto">
          <div className="size-6  border-b-2 border-b-red-600 animate-spin rounded-full mx-auto"></div>
        </div>
      )}
    </div>
  );
};

export default SearchBoxLaptop;
