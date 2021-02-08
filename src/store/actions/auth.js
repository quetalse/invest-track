import {
    SET_LOADING,
    SET_USER,
    SET_EMAIL,
    SET_PASSWORD,
    CLEAR_INPUTS,
    CLEAR_ERRORS,
    EMAIL_ERROR,
    PASSWORD_ERROR,
    GET_STOCKS,
    REMOVE_STOCK,
    SHOW_LOADER,
    SET_ACCOUNT
} from "../types";
import { getRequest, postRequest, deleteRequest} from "../api";
import {auth} from "../../firebase";

const url = process.env.REACT_APP_DB_URL;

export const showLoader = () => ({type: SHOW_LOADER});

export const getAll = () => async dispatch => {

    dispatch(showLoader());

    const data = await getRequest(`${url}/stocks.json`);

    const payload = Object.keys(data).map(key => ({
        ...data[key],
        id: key
    }))

    dispatch({
        type: GET_STOCKS,
        payload
    })
};
// export const add = title => async dispatch => {
//     const stock = {
//         title, date: new Date().toJSON()
//     }
//     try{
//         const data = await postRequest({
//             url: `${url}/stocks.json`,
//             stock
//         })
//
//         const payload = {
//             ...stock,
//             id: data.name
//         };
//
//         dispatch({
//             type: ADD_STOCK,
//             payload
//         })
//
//     }catch (e) {
//         throw new Error(e.message)
//     }
// };
export const remove = id => async dispatch => {
    await deleteRequest(`${url}/stocks/${id}.json`);
    dispatch({
        type: REMOVE_STOCK,
        payload: id
    })
}

export const setLoading = (status) => ({
    type: SET_LOADING,
    payload: status
})

export const setAccount = (account) => ({
    type: SET_ACCOUNT,
    payload: account
});

export const setUser = (user) => ({
    type: SET_USER,
    payload: user
});

export const setEmail = (email) => {
    return{
        type: SET_EMAIL,
        payload: email
    }
};

export const setPassword = (password) => ({
    type: SET_PASSWORD,
    payload: password
});

export const clearInputs = () => ({
    type: CLEAR_INPUTS
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
});

const emailError = (msg) => ({
    type: EMAIL_ERROR,
    payload: msg
})

const passwordError = (msg) => ({
    type: PASSWORD_ERROR,
    payload: msg
})

export const signIn = ({email, password}) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoading(true));
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => {
            switch (error.code) {
                case "auth/invalid-email":
                case "auth/user-disabled":
                case "auth/user-not-found":
                    dispatch(emailError(error.message));
                    break;
                case "auth/wrong-password":
                    dispatch(passwordError(error.message));
                    break;
                default:
            }
            dispatch(setLoading(false))
        })

}

export const signUp = ({email, password}) => dispatch => {
    dispatch(clearErrors());
    dispatch(setLoading());
    dispatch(setLoading(true))
    auth.createUserWithEmailAndPassword(email, password)
        .catch(error => {
            console.log(error.code)
            switch (error.code) {
                case "auth/email-already-in-use":
                case "auth/invalid-email":
                    dispatch(emailError(error.message));
                    break;
                case "auth/weak-password":
                    dispatch(passwordError(error.message));
                    break;
                default:
            }
            dispatch(setLoading(false))
        })
}

export const logOut = () => {
    auth.signOut()
        .catch((error) => {
            console.log(error)
        });
}