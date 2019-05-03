import actionTypes from "../constant/constant"


const INITIAL_STATE = {
    data:{},
};




export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.CLASS_DATA:
            return ({
                ...state,
                data: action.payload
            });
        default:
            return state;
    }
}