
const initialState = {
    loading: false,
};

export default (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW_LOADING':
            return {
                ...state,
                loading: true
            };
        case 'HIDE_LOADING':
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}