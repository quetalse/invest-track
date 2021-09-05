import {SET_PORTFOLIOS, ADD_PORTFOLIO, EDIT_PORTFOLIO, LOADING_PORTFOLIOS, SET_ACTIVE_PORTFOLIO_ID, REMOVE_PORTFOLIO} from "../types";
import {auth, database} from "../../firebase";
import firebase from "firebase/app";

// @TYPES
import {Portfolio} from "../../@types/@portfolio";

export const setPortfoliosLoading = (): {type: typeof LOADING_PORTFOLIOS} => ({
    type: LOADING_PORTFOLIOS
});

export const setActivePortfolio = (id: string): {type: typeof SET_ACTIVE_PORTFOLIO_ID, payload: string} => ({
    type: SET_ACTIVE_PORTFOLIO_ID,
    payload: id
});

export const setPortfolios = (portfolios: Array<Portfolio>): {type: typeof SET_PORTFOLIOS, payload: Array<Portfolio>} => ({
    type: SET_PORTFOLIOS,
    payload: portfolios
})

export const getPortfolios = () => (dispatch: any) => {
    const currentUser: firebase.User | null = auth.currentUser;

    if(currentUser){
        dispatch(setPortfoliosLoading());

        const uid: string = currentUser.uid;
        const portfoliosRef = database.ref('profiles/' + uid + '/portfolios');
        portfoliosRef
            .once('value')
            .then(snapshot => {
                    if(snapshot.exists()){
                        const portfolios = snapshot.val();
                        const payload = Object.keys(portfolios).map((id) => ({
                            id,
                            title: portfolios[id].title
                        }));
                        dispatch(setPortfolios(payload))
                    }else{
                        dispatch(setPortfolios([]))
                    }
                },
                function(error) {
                    console.error('error', error);
                })
    }
}

export const addPortfolio = (portfolio: Portfolio) => (dispatch: any) => {
    const currentUser: firebase.User | null = auth.currentUser;

    if(currentUser) {
        const uid: string = currentUser.uid;
        const portfoliosRef = database.ref('profiles/' + uid + '/portfolios');
        const newPostKey = portfoliosRef.push();

        newPostKey.set(portfolio, (error) => {
            if (error) {
                console.log('// The write failed...', error)
            } else {
                dispatch({
                    type: ADD_PORTFOLIO,
                    payload: {
                        ...portfolio,
                        id: newPostKey.key
                    }
                })
            }
        })
    }
}

export const editPortfolio = (data: Portfolio & {portfolioId: string}) => (dispatch: any) => {
    const currentUser: firebase.User | null = auth.currentUser;

    if(currentUser) {
        const uid: string = currentUser.uid;
        const portfolioId = data.portfolioId;
        const portfoliosRef = database.ref('profiles/' + uid + '/portfolios/' + portfolioId);

        // console.log('portfoliosRef', portfoliosRef)
        portfoliosRef.set({
            title: data.title
        }, (error) => {
            if (error) {
                console.log('// The write failed...', error)
            } else {
                dispatch({
                    type: EDIT_PORTFOLIO,
                    payload: {
                        portfolioId,
                        title: data.title
                    }
                })
            }
        })
    }
}

export const deletePortfolio = (portfolioId: string) => (dispatch: any) => {
    const currentUser: firebase.User | null = auth.currentUser;

    if(currentUser) {

        const uid: string = currentUser.uid;
        const portfoliosRef = database.ref('profiles/' + uid + '/portfolios/' + portfolioId);

        portfoliosRef.remove((error) => {
            if (error) {
                console.log('// The write failed...', error)
            } else {
                dispatch({
                    type: REMOVE_PORTFOLIO,
                    payload: portfolioId
                })
            }
        })
    }
}



// export const showLoader = () => ({type: SHOW_LOADER});
//
// export const getAll = () => async dispatch => {
//
//     dispatch(showLoader());
//
//     const data = await getRequest(`${url}/stocks.json`);
//
//     const payload = Object.keys(data).map(key => ({
//         ...data[key],
//         id: key
//     }))
//
//     dispatch({
//         type: GET_STOCKS,
//         payload
//     })
// };
// // export const add = title => async dispatch => {
// //     const stock = {
// //         title, date: new Date().toJSON()
// //     }
// //     try{
// //         const data = await postRequest({
// //             url: `${url}/stocks.json`,
// //             stock
// //         })
// //
// //         const payload = {
// //             ...stock,
// //             id: data.name
// //         };
// //
// //         dispatch({
// //             type: ADD_STOCK,
// //             payload
// //         })
// //
// //     }catch (e) {
// //         throw new Error(e.message)
// //     }
// // };
// export const remove = id => async dispatch => {
//     await deleteRequest(`${url}/stocks/${id}.json`);
//     dispatch({
//         type: REMOVE_STOCK,
//         payload: id
//     })
// }
//
// export const setLoading = (status) => ({
//     type: SET_LOADING,
//     payload: status
// })
//
// export const setAccount = (account) => ({
//     type: SET_ACCOUNT,
//     payload: account
// });
//
// export const setUser = (user) => ({
//     type: SET_USER,
//     payload: user
// });
//
// export const setEmail = (email) => {
//     return{
//         type: SET_EMAIL,
//         payload: email
//     }
// };
//
// export const setPassword = (password) => ({
//     type: SET_PASSWORD,
//     payload: password
// });
//
// export const clearInputs = () => ({
//     type: CLEAR_INPUTS
// });
//
// export const clearErrors = () => ({
//     type: CLEAR_ERRORS
// });
//
// const emailError = (msg) => ({
//     type: EMAIL_ERROR,
//     payload: msg
// })
//
// const passwordError = (msg) => ({
//     type: PASSWORD_ERROR,
//     payload: msg
// })
//
// export const signIn = ({email, password}) => dispatch => {
//     dispatch(clearErrors());
//     dispatch(setLoading(true));
//     auth.signInWithEmailAndPassword(email, password)
//         .catch(error => {
//             switch (error.code) {
//                 case "auth/invalid-email":
//                 case "auth/user-disabled":
//                 case "auth/user-not-found":
//                     dispatch(emailError(error.message));
//                     break;
//                 case "auth/wrong-password":
//                     dispatch(passwordError(error.message));
//                     break;
//                 default:
//             }
//             dispatch(setLoading(false))
//         })
//
// }
//
// export const signUp = ({email, password}) => dispatch => {
//     dispatch(clearErrors());
//     dispatch(setLoading());
//     dispatch(setLoading(true))
//     auth.createUserWithEmailAndPassword(email, password)
//         // .then((userCredential) => {
//         //     // let ref = database.ref('profiles');
//         //     // console.log( ref.key)
//         //     // ref.once('value')
//         //     //     .then((snapshot) => {
//         //     //        console.log(snapshot.key)
//         //     //        console.log(snapshot.exists())
//         //     //     });
//         //
//         //     database.ref('profiles/' + userCredential.user.uid)
//         //         .set({
//         //             username: userCredential.user.email,
//         //             portfolios: `${[]}`
//         //         })
//         //
//         // })
//         .catch(error => {
//             console.log(error.code)
//             switch (error.code) {
//                 case "auth/email-already-in-use":
//                 case "auth/invalid-email":
//                     dispatch(emailError(error.message));
//                     break;
//                 case "auth/weak-password":
//                     dispatch(passwordError(error.message));
//                     break;
//                 default:
//             }
//             dispatch(setLoading(false))
//         })
// }
//
// export const logOut = () => {
//     auth.signOut()
//         .catch((error) => {
//             console.log(error)
//         });
// }