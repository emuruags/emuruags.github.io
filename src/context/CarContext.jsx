import {createContext, useContext, useState, } from 'react'

const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

function CartContextProvider({children}) {
    const [cartList, setCartList] = useState([])

    const addToCart = (item) => {
        const index = cartList.findIndex(x => x.id === item.id )

        if (index > -1) {
            const oldQy = cartList[index].quantity
            cartList.splice(index, 1)
            setCartList([...cartList, { ...item, quantity: item.quantity + oldQy}])
            
        }
        else {
            setCartList( [ ...cartList, item ] )
        }
        
    }
    
    /// vaia el carrito Clear
    const emptyCart = () =>{
        setCartList( [] )
    }

    /// eliminar 1 item
    const removeFromCart = (item) => {
        const deleteItem = cartList.filter((prod) =>  prod.id !== item);
        setCartList([...deleteItem]);
      };   
  

    const isInCart = (item) => {
        return cartList.find(x => x.id === item.id ) 
    }

    const quantityIconCart = () => {
        return cartList.reduce( (acum, item) => acum + item.quantity, 0)         
    }

    const totalPrice =()=>{
        return cartList.reduce((acum, item) => (acum + (item.quantity *  item.productPrice)) , 0) 
    }

    return (
        <CartContext.Provider 
            value={{ 
                cartList,
                addToCart,
                emptyCart,
                removeFromCart,
                isInCart,
                quantityIconCart,
                totalPrice
        }}>
            { children }
        </CartContext.Provider>
    )
}

export default CartContextProvider