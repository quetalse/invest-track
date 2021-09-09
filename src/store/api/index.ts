import axios from "axios";

export const getRequest = async (url: string) => {
    try{
        const result = await axios.get(url);
        return result.data || {};
    }catch (e) {

    }
}

export const postRequest = async ({url, stock}: {url: string, stock: any}) => {
    try{
        const result = await axios.post(url, stock);
        return result.data
    }catch (e) {

    }
}

export const deleteRequest = async (url: string) => {
    try{
        const result = await axios.delete(url);
        return result.data
    }catch (e) {

    }
}