import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import axios from "axios"

function GetItems({ cart, setCart }) {
    let [data, setData] = useState([]);

    function isInCart(id) {
        if (id in cart) {
            // item already in cart
            return true
        } else {
            return false
        }
    }


    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(
              "https://fakestoreapi.com/products"
            );
            setData(response.data);
          } catch (err) {
            setData(null);
          }
        };
        getData();
      }, []);

    return (
        <div>
            <ul>
                {data.map((item) => (
                    <div key={item.id}>
                    <li>{item.title}</li>
                    <img style={{maxHeight: 200, maxWidth: 200}} src={item.image} alt={item.title}></img>
                    <p>${item.price}</p>
                    {
                        isInCart(item.id) ? <button onClick={() => setCart(item, 0)}>Remove from cart</button> : <button onClick={() => setCart(item, 1)}>Add to cart</button>
                    }
                    </div>
                ))} 
            </ul>
        </div>
    )
}

function Home({ cart, setCart }) {
    let count = 0

    Object.entries(cart).map(([key, value]) => {
        count += parseInt(value.quantity)
    })


    return (
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/cart">Cart({count})</Link></li>
            </ul>
            <h1>The Shop</h1>
            <GetItems cart={cart} setCart={setCart}/>
        </div>
  )
}

export default Home
