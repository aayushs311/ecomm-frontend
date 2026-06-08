import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom'
import { fetchProducts } from '../store/actions';

const useProductFilter = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const params = new URLSearchParams(searchParams);

        const currentPage = searchParams.get("page")
            ? Number(searchParams.get("page"))
            : 1
        const sortOrder = searchParams.get("sortOrder") || "asc";
        const categoryParams = searchParams.get("category") || "";
        const keywordParams = searchParams.get("keyword") || "";

        params.set("sortOrder", sortOrder);
        params.set("category", categoryParams);
        params.set("keyword", keywordParams);
        params.set("pageNumber", currentPage - 1);
        
        params.set("sortBy", "price");

        if (categoryParams) {
            params.set("category", categoryParams);
        }

        if (keywordParams) {
            params.set("keyword", keywordParams);
        }

        const queryString = params.toString();
        dispatch(fetchProducts(queryString));
    }, [searchParams, dispatch])
}

export default useProductFilter