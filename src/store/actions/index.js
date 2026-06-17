import api from "../../api/api"

export const fetchProducts = (queryString) => async (dispatch) => {
    try {
        dispatch({type: "IS_FETCHING"});
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
        dispatch({type: "IS_SUCCESS"});
    } catch(err) {
        console.log(err);
        dispatch({
            type: "IS_ERROR",
            payload: err.response.data.message || "Failed to fetch products"
        });
    }
}

export const fetchCategories = () => async (dispatch) => {
    try {
        dispatch({type: "IS_FETCHING"});
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
        dispatch({type: "IS_SUCCESS"});
    } catch(err) {
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
        const products = getState().products.products;
        const getProduct = products.find(
            item => item.productId === data.productId
        );
        // 2. Check for stock
        const isQuantityExist = getProduct.quantity >= qty;
        // 3. If in stock -> add
        if(isQuantityExist) {
            dispatch({
                type: "ADD_TO_CART",
                payload: {...data, quantity: qty}
            })
            toast.success(`${data.productName} added to cart`);
            localStorage.setItem("cartItems", JSON.stringify(getState().carts.cart))
        } else {
            toast.error("Out of stock");
        }
}