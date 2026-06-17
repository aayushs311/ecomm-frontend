
const SetQuantity = (props) => {
  return (
       <div className="flex gap-8 items-center">
        {props.cardCounter ? null : <div className="font-semibold">QUANTITY</div>}
        <div className="flex md:flex-row flex-col gap-4 items-center lg:text-[22px] text-sm">
            <button
                disabled={props.quantity <= 1}
                className="border-[1.2px] border-slate-800 px-3 py-1 rounded-sm"
                onClick={props.handleQtyDecrease}>
                -
            </button>
                <div className="text-red-500">{props.quantity}</div>
            <button
                className="border-[1.2px] border-slate-800 px-3 py-1 rounded-sm"
                onClick={props.handleQtyIncrease}>
                +
            </button>
        </div>
    </div>
  )
}

export default SetQuantity