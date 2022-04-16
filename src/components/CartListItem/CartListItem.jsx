import React from 'react'
import { Badge, Button, Card, ListGroup } from 'react-bootstrap'
import { useCartContext } from '../../context/CarContext'
import { BsTrash } from "react-icons/bs";

function CartListItem( {prod} ) {
    const {removeFromCart} = useCartContext()
    
  return (
    
    <>
        <ListGroup as="ol" >
            <ListGroup.Item key={prod.id} as="li" className="d-flex justify-content-between align-items-start"    >
                <div className="ms-2 ">
                  <Card.Img variant="top" src={`${prod.productImg}`} width="30" height="60"/>
                </div>
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{` ${prod.categoryDescription} - ${prod.productName}`}</div>
                  Precio
                  {` U$S ${prod.productPrice}`}
                </div>

                Cantidad <Badge bg="primary" pill  className="ms-2 ">
                {prod.quantity}
                </Badge>                
                <Button bg="danger" pill  className="ms-3 " variant="outline-danger" onClick={ () => removeFromCart(prod.id) }>
                <BsTrash  className="pl-2 " />
                </Button>
            </ListGroup.Item>
        </ListGroup>
    </>
  )
}

export default CartListItem