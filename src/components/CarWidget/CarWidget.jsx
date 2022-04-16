import React from 'react'
import logo from '../../img/ico/white-shopping-cart-icon.jpg'
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom'
import { useCartContext } from '../../context/CarContext'

function CarWidget() {
  const { cartList, quantityIconCart } = useCartContext()

  return (
    <>
        <Link to='/CartList'>
          <img src={logo}
              width="30"
              height="30"
              alt="carrito" 
            
          />
        </Link>
        { 
          cartList.length === 0 ?   <></>
                                :   <Badge bg="primary" pill  className="ms-2 "> { quantityIconCart() } </Badge>
        }        
    </>    
  )
}

export default CarWidget