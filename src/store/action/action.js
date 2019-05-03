import actionTypes from "../constant/constant"


export const classAction = (data) => {
    return dispatch => {
        dispatch({
            type: actionTypes.CLASS_DATA,
            payload: data
        })
    }
};