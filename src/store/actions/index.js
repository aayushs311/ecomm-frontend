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