import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import ProductViewModal from "./ProductViewModal";

const ProductCard = (props) => {
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [selectedViewProduct, setSelectedViewProduct] = useState("");
    const [btnLoader, setBtnLoader] = useState(false);
    const [isAvailable, setIsAvailable] = useState(props.quantity && Number(props.quantity) > 0);

    const handleProductView = (product) => {
        setIsProductModalOpen(true);
        setSelectedViewProduct(product);
    }

    const addToCart = () => {
        console.log("Added to cart")
    }

    return (
        <div className="border rounded-lg shadow-xl overflow-hidden transition-shadow duration-300">
            <div onClick={() => {handleProductView(props)}} className="w-full overflow-hidden aspect-3/2">
                <img src={props.image} alt={props.productName} className="w-full h-full cursor-pointer transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="p-4">
                <h2 onClick={() => {handleProductView(props)}} className="text-lg font-semibold mb-2 cursor-pointer">{props.productName}</h2>
                <div className="min-h-20 max-h-20">
                    <p className="text-gray-600 text-sm">{props.description}</p>
                </div>
                <div className="flex items-center justify-between">
                    {props.specialPrice ? (
                        <div className="flex flex-col">
                            <span className="text-gray-400 line-through">
                                ${Number(props.price).toFixed(2)}
                            </span>
                            <span className="text-xl font-bold text-slate-700">
                                ${Number(props.specialPrice).toFixed(2)}
                            </span>
                        </div>
                    ) : (
                        <span className="text-xl font-bold text-slate-700">
                            ${Number(props.price).toFixed(2)}
                        </span>
                    )}
                    <button
                    disabled={!isAvailable || btnLoader}
                    onClick={addToCart}
                    className={`bg-blue-500 ${isAvailable ?
                        "opacity-100 cursor-pointer hover:bg-blue-600" :
                        "opacity-70"} text-white py-2 px-3 rounded-lg items-center transition-colors duration-300 w-36 flex justify-center`}>
                        <FaShoppingCart className="mr-2"/>
                        {isAvailable ? "Add to Cart" : "Out of Stock"}
                    </button>
                </div>
            </div>
            <ProductViewModal
                isOpen={isProductModalOpen}
                setIsOpen={setIsProductModalOpen}
                product={selectedViewProduct}
                isAvailable={isAvailable}
            />
        </div>
    )
}

export default ProductCard;