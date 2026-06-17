import { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import SetQuantity from './SetQuantity';
import { useDispatch } from 'react-redux';
import { decreaseCartQuantity, increaseCartQuantity, removeCartItem } from '../../store/actions';
import toast from 'react-hot-toast';
import { formatPrice } from '../../utils/formatPrice';
import truncateText from '../../utils/truncateText';

const ItemContent = (props) => {
    const dispatch = useDispatch();
    const [currentQuantity, setCurrentQuantity] = useState(props.quantity);
    
    const handleQtyIncrease = (cartItem) => {
        dispatch(increaseCartQuantity(cartItem, currentQuantity, setCurrentQuantity, toast));
    }
    
    const handleQtyDecrease = (cartItem) => {
        if(currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
            dispatch(decreaseCartQuantity(cartItem, newQuantity));
        }
    }

    const removeItemFromCart = (cartItem) => {
        dispatch(removeCartItem(cartItem));
    }

    return (
        <div className="grid md:grid-cols-5 grid-cols-4 md:text-md text-sm gap-4   items-center  border border-slate-200  rounded-md  lg:px-4  py-4 p-2">
            <div className="md:col-span-2 justify-self-start flex  flex-col gap-2 ">
                <div className="flex md:flex-row flex-col lg:gap-4 sm:gap-3 gap-0 items-start ">
                   <h3 className="lg:text-[17px] text-sm font-semibold text-slate-600">
                    {truncateText(props.productName)}
                   </h3>
                </div>

                <div className="md:w-36 sm:w-24 w-12">
                    <img 
                        src={props.image}
                        alt={props.productName}
                        className="md:h-36 sm:h-24 h-12 w-full object-cover rounded-md"/>
                

                <div className="flex items-start gap-5 mt-3">
                    <button
                        onClick={() => removeItemFromCart(props)}
                        className="flex items-center font-semibold space-x-2 px-4 py-1 text-xs border border-rose-600 text-rose-600 rounded-md hover:bg-red-50 transition-colors duration-200">
                        <FaTrash size={16} className="text-rose-600"/>
                        Remove
                    </button>
                    </div>
                </div>
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {(formatPrice(Number(props.specialPrice)))}
            </div>

            <div className="justify-self-center">
                <SetQuantity
                    quantity={currentQuantity}
                    cardCounter={true}
                    handleQtyIncrease={() => handleQtyIncrease(props)}
                    handleQtyDecrease={() => handleQtyDecrease(props)}/>
            </div>

            <div className="justify-self-center lg:text-[17px] text-sm text-slate-600 font-semibold">
                {formatPrice((Number(currentQuantity) * Number(props.specialPrice)))}
            </div>
        </div>
    )
}

export default ItemContent