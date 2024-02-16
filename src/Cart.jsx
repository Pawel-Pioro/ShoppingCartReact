import { useState } from 'react'
import { Link } from "react-router-dom";


function Cart({ cart, setCart }) {
    console.log(cart)
    
    function updateQuantity(item, quantity){
        setCart(item, quantity)
    }

    let count = 0
    let total_price = 0

    Object.entries(cart).map(([key, value]) => {
        count += parseInt(value.quantity)

        total_price += value.item.price * value.quantity
    })
    
    

    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cart">Cart({count})</Link></li>
            </ul>
            <h1>Your Cart</h1>

            <h3>Total price: ${total_price.toFixed(2)}</h3>
            
            {
                Object.entries(cart).map(([key, value]) => {
                    return (
                        <div key={key}>
                            <p>{value.item.title}</p>
                            <img style={{maxHeight: 200, maxWidth: 200}} src={value.item.image} alt={value.item.title}></img>
                            <input min={0} type="number" value={cart[key].quantity} onChange={(e) => updateQuantity(value.item, e.target.value)}></input>
                            <button onClick={() => setCart(value.item, 0)}>Remove</button>
                        </div>
                    )
                })
            }
            

        </div>
    )
}

export default Cart