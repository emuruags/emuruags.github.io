import React from 'react'
import { Card } from 'react-bootstrap';
import { useCartContext } from '../../context/CarContext';

function CartSummary() {
  
  const {quantityIconCart, totalPrice} = useCartContext()

  return (
    <>
        <Card>
            <Card.Header>Resumen</Card.Header>
            <Card.Body>
            <Card.Text>
                <Card.Subtitle> Cantidad de items: { quantityIconCart() } </Card.Subtitle>
                <Card.Title className='mt-3 '> Importe Total </Card.Title>
                <Card.Title className='mt-3 '> u$s: { totalPrice() } </Card.Title>
            </Card.Text>
            </Card.Body>
        </Card>
    </>
  )
}

export default CartSummary