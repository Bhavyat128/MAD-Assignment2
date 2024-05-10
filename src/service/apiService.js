export const fetchCategory = async (id) => {
    try {
        const baseUrl = "https://fakestoreapi.com/products/categories"
        const url = baseUrl;
        const res = await fetch(url);
        const data = await res.json();
        return data
    } catch (e) {
        throw new Error("Can't find product.");
    }
};
 
export const fetchProducts = async (id) => {
    try {
        const baseUrl = "https://fakestoreapi.com/products/category"
        const url = baseUrl + `/${id}`;
 
        const res = await fetch(url);
        const data = await res.json();
        return data
    } catch (e) {
        throw new Error("Can't find product.");
    }
};
 
export const fetchProductDetailsByID = async (id) => {
    try {
        const baseUrl = "https://fakestoreapi.com/";
        const url = baseUrl + `products/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        return data
    } catch (e) {
        throw new Error("Can't find product.");
    }
};