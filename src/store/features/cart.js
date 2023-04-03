import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isCartOpen: false,
    cartItemCount: 0,
    cartTotal: 0,
    cartItems: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCartItem: (state, action) => {
            const product = action.payload
            const cart = state.cartItems
            const existingCartItem = cart
                .find((cartItem) => cartItem._id === product._id);
            
            if(existingCartItem){
                  state.cartItems = cart.map((cartItem) => 
                    cartItem._id === product._id 
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
                )
                state.cartItemCount++
            } else {
                state.cartItems = [...cart, {...action.payload, quantity: 1} ]
                state.cartItemCount++
            }

            
        },
        removeCartItem: (state, action) => {   
            const product = action.payload
            const cart = state.cartItems

            const existingCartItem = cart.find(
                (cartItem) => cartItem._id === product._id
            )

            if(existingCartItem.quantity === 1){
                state.cartItems = cart.filter((cartItem) => cartItem._id !== product._id)
                state.cartItemCount--
            } else {
                state.cartItems = state.cartItems.map((cartItem) => 
                    cartItem._id === product._id
                        ? {...cartItem, quantity: cartItem.quantity - 1}
                        : cartItem
                )
                state.cartItemCount--
            }
        },
        updateCartTotal: (state, action) => {
             state.cartTotal = state.cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        },
        clearCartItem: (state, action) => {
            state.cartItems = state.cartItems.filter((cartItem) => cartItem._id !== action.payload._id)
        },
        toggleCart: (state, action) => {
            let cart = state.isCartOpen
            state.isCartOpen = !cart
        }
    }
})

export const getCartStatus = (state) => state.cart.isCartOpen
export const getCartItems = state => state.cart.cartItems
export const getCartTotal = state => state.cart.cartTotal
export const getCatItemCount = state => state.cart.cartItemCount

export const {addCartItem, removeCartItem , updateCartTotal, clearCartItem, toggleCart} = cartSlice.actions
export default cartSlice.reducer