import axios from "axios";

export const getRequest = async (url) => {
    try{
        const result = await axios.get(url);
        console.log('result', result)
        return result.data || {};
    }catch (e) {

    }
}

export const postRequest = async ({url, stock}) => {
    try{
        const result = await axios.post(url, stock);
        return result.data
    }catch (e) {

    }
}

export const deleteRequest = async (url) => {
    try{
        const result = await axios.delete(url);
        return result.data
    }catch (e) {

    }
}