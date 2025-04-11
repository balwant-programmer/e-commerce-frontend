import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRelatedProductQuery } from "../rtkQuery/productServices";
import ShareButtons from "./ShareOfthePrduct";
import ShareIcon from "@mui/icons-material/Share";

const RelatedProduct = () => {
  const { id } = useParams();
  const [productIdForShare, setProductIdForShare] = useState(null);
  const { data = [], isLoading, error, isError } = useRelatedProductQuery(id);
  let products = data?.relatedproducted || [];

  products = products.filter((product) => product._id !== id);

  const navigate = useNavigate();

  const handleRelatedProduct = (productId) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(`/product/${productId}`);
  };

  const HandleShare = (productId) => {
    setProductIdForShare(productId);
  };

  if (isLoading) {
    return (
      <div className="size-10 border-2 border-b-gray-400 mb-10 mx-auto border-gray-600 animate-spin rounded-full"></div>
    );
  }

  return (
    <div className="mb-32 font-serif text-sm ">
      <p className="mb-6 text-center font-bold">Related Products</p>
      {isError && (
        <div className="flex justify-center items-center my-6">
          <span className="text-xl text-red-600">
            Error: {error?.message || "Failed to load related products"}
          </span>
        </div>
      )}

      {!isLoading && !isError && products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div>
              <div
                onClick={() => handleRelatedProduct(product._id)}
                key={product._id}
                className="flex flex-col items-center border p-4 rounded-md hover:shadow-lg cursor-pointer"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-48 object-contain mb-4"
                />
                <p className="text-center font-medium">{product.name}</p>
                <p className="text-center text-gray-500">
                  {product.description}
                </p>
                <p className="text-center text-green-900 font-semibold">
                  Price: ₹{product.price}
                </p>
              </div>
              <div>
                <span
                  onClick={() => HandleShare(product._id)}
                  className="mt-2 rounded-sm cursor-pointer bg-gray-200 p-2 inline-block"
                >
                  <ShareIcon />
                </span>
                {productIdForShare === product._id && (
                  <ShareButtons
                    productIdForShare={productIdForShare}
                    description={product?.description}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        !isLoading &&
        !isError && (
          <p className="text-center bg-slate-400 mx-10 p-4 rounded-md text-red-900">
            No related products found.
          </p>
        )
      )}
    </div>
  );
};

export default RelatedProduct;
