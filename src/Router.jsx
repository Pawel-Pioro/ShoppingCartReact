import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home";
import Cart from "./Cart";

 

export default function Router() {
    const [cartItems, setCartItems] = useState({});

    function updateCart(item, quantity){
        const currentCart = { ...cartItems }
        if (currentCart[item.id]){
            // item is in cart 
            if (quantity === 0){
                // delete the item
                delete currentCart[item.id]
            } else {
              // update the quantity
              currentCart[item.id].quantity = quantity
            }
        } else {
            // item is not in cart 
            currentCart[item.id] = {
                item: item,
                quantity: quantity,
            }
        }
        // update the state
        setCartItems(currentCart)
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home cart={cartItems} setCart={updateCart} />,
        },
        {
            path: "/cart",
            element: <Cart cart={cartItems} setCart={updateCart} />
        },
        
    ]);
    

    return <RouterProvider router={router} />

     
}