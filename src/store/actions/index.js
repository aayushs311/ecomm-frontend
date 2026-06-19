import toast from "react-hot-toast";
import api from "../../api/api"

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`api/public/products?${queryString}`);
        dispatch({
            type: "FETCH_PRODUCTS",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })
        dispatch({ type: "IS_SUCCESS" });
    } catch (err) {
        console.log(err);
        dispatch({
            type: "IS_ERROR",
            payload: err.response.data.message || "Failed to fetch products"
        });
    }
}

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({ type: "IS_FETCHING" });
        const { data } = await api.get(`api/public/categories`);
        dispatch({
            type: "FETCH_CATEGORIES",
            payload: data.content,
            pageNumber: data.pageNumber,
            pageSize: data.pageSize,
            totalElements: data.totalElements,
            totalPages: data.totalPages,
            lastPage: data.lastPage
        })
        dispatch({ type: "IS_SUCCESS" });
    } catch (err) {
        console.log(err);
        dispatch({
            type: "IS_ERROR",
            payload: err.response.data.message || "Failed to fetch categories"
        });
    }
}

export const addToCart = (data, qty = 1, toast) =>
    (dispatch, getState) => {
        // 1. Find the product
        const { products } = getState().products;
        const getProduct = products.find(
            item => item.productId === data.productId
        );
        // 2. Check for stock
        const isQuantityExist = getProduct.quantity >= qty;
        // 3. If in stock -> add
        if (isQuantityExist) {
            dispatch({
                type: "ADD_TO_CART",
                payload: { ...data, quantity: qty }
            })
            toast.success(`${data.productName} added to cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Out of stock");
        }
    }

export const increaseCartQuantity = (data, currentQuantity, setCurrentQuantity, toast) =>
    (dispatch, getState) => {
        const { products } = getState().products;
        const getProduct = products.find(
            item => item.productId === data.productId
        );

        const isQuantityExist = getProduct.quantity >= currentQuantity + 1;

        if (isQuantityExist) {
            const newQuantity = currentQuantity + 1;
            setCurrentQuantity(newQuantity);
            dispatch({
                type: "ADD_TO_CART",
                payload: { ...data, quantity: newQuantity }
            })
            toast.success("Quantity updated");
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
        } else {
            toast.error("Quantity reached to limit")
        }
    }

export const decreaseCartQuantity = (data, newQuantity) =>
    (dispatch, getState) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: { ...data, quantity: newQuantity }
        })
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
    }

export const removeCartItem = (data) =>
    (dispatch, getState) => {
        dispatch({
            type: "REMOVE_FROM_CART",
            payload: data
        })
        toast.success(`${data.productName} Removed from cart`);
        localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart));
}

export const authenticateSignInUser = (sendData, toast, reset, navigate, setLoader) =>
    async (dispatch) => {
        try {
            setLoader(true);
            const { data } = await api.post("api/auth/signin", sendData);
            dispatch({ type: "LOGIN_USER", payload: data });
            localStorage.setItem("auth", JSON.stringify(data));
            reset();
            toast.success("Login success");
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Internal Server Error");
        } finally {
            setLoader(false);
        }
}