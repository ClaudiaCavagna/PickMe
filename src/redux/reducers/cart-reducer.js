import { createSlice, createAction } from "@reduxjs/toolkit";

const removeFromCart = createAction('remove-from-cart');
const isAddedToCart = (action) => {
    return action.type.endsWith("/addToCart")
}
const isRemovedFromCart = (action) => {
    return action.type.endsWith("remove-from-cart")
}

const initialState = {
    cart: [],
    total: 0,
    payed: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload)
        },
        cleanCart: state => {
            state.cart = []
            state.total = 0
        },
        payOrder: state => {
            state.payed = true
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(removeFromCart, (state, action) => {
            state.cart = state.cart.filter((el) => el.id !== action.payload.id);
        })
        .addMatcher(isAddedToCart, (state, action) => {
            state.total += action.payload.price;
        })
        .addMatcher(isRemovedFromCart, (state, action) => {
            state.total -= action.payload.price;
        })
        .addDefaultCase((state) => {
            return state;
        })
    }
});

const addSingleItem = (item) => (dispatch, getState) => {
    const {cart} = getState().cart;
    if(cart.find(x => x.id === item.id)){
        return;
    }
    dispatch(addToCart(item));
}

export const { addToCart, cleanCart, payOrder } = cartSlice.actions;
export { addSingleItem, removeFromCart };
const { reducer } = cartSlice;

export default reducer;