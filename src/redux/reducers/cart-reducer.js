import { createSlice, createAction, isAnyOf } from "@reduxjs/toolkit";
import { getItemFromLocalStorage, setLocalStorageItem } from "../../utils/helpers";

const removeFromCart = createAction('remove-from-cart');
const isAddedToCart = (action) => {
    return action.type.endsWith("/addToCart")
}
const isRemovedFromCart = (action) => {
    return action.type.endsWith("remove-from-cart")
}

const isCartCleaned = (action) => {
    return action.type.endsWith('/cleanCart')
}

const isCartAction = (action) => {
    return isAnyOf(isAddedToCart, isRemovedFromCart, isCartCleaned)(action)
}

const localStorageCart = getItemFromLocalStorage("cart");
const totalFromLocalStorage = getItemFromLocalStorage("total");

const initialState = {
    cart: localStorage.cart ? localStorageCart : [],
    total: totalFromLocalStorage || 0,
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
        .addMatcher(isCartAction, state => {
            setLocalStorageItem("cart", state.cart);
            setLocalStorageItem("total", state.total);
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