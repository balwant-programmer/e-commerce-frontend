import CategoryList from "../components/CategoryList";
import AllproductList from "../components/AllproductList";
import SildeBar from "../components/SildeBar";
import { useDispatch, useSelector } from "react-redux";
import SingleCategoryproduct from "../components/SingleCategoryproduct";
import { useEffect } from "react";
import { allcategoryThunk } from "../redux/Slice/AllcategoryFetchSlice";
import ErrorComponent from "../components/ErrorComponent";
import Spinner from "../components/Spinner";

const Home = () => {
  const { categoryName } = useSelector((state) => state?.category);
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useSelector(
    (state) => state?.allcategory
  );
  useEffect(() => {
    dispatch(allcategoryThunk());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <>
      <div>
        <CategoryList data={data} />
      </div>
      <div className="hidden md:block  w-64 fixed left-0 top-12 bottom-0 bg-gray-50 border-2 border-l-red-100">
        <SildeBar />
      </div>
      <div className="mt-[85px] md:mt-[58px] pb-10  bg-gray-100  select-none ">
        {categoryName === "All" ? (
          <AllproductList />
        ) : (
          <SingleCategoryproduct categoryName={categoryName} data={data} />
        )}
      </div>
    </>
  );
};

export default Home;
