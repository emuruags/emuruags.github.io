import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {useState} from 'react';
import { useCartContext } from '../../context/CarContext'
import CartSummary from '../CartSummary/CartSummary';
import CartListItem from '../CartListItem/CartListItem';



function CartList( { generateOrder, saveOrder, updateItemStock} ) {
    const {cartList, emptyCart} = useCartContext()
    const [isFinishOrder, setisFinishOrder] = useState(false);
    const [showOrderPanel, setshowOrderPanel] = useState(false);
    const [isValidForm, setsValidForm] = useState(true);
    const [name, setName] = useState('')
    const [email, setEmal] = useState('')
    const [phone, setPhone] = useState('')

    const isCheckOut = () => {
        if (cartList.length > 0) { setshowOrderPanel(true) }
    }
    
    const checkOut = () => {
        (name.length > 0 && email.length > 0 && phone.length > 0 )  ?  checkOutValid()
                                                                    :  checkOutInvalid()
    } 

    const checkOutValid = () => {
        setsValidForm(true)
        generateOrder(name,email,phone)
        setisFinishOrder(true)
    }

    const checkOutInvalid = () => {
        setsValidForm(false)
        setisFinishOrder(false) 
    }

        const finishOrder = () => {
            saveOrder();
            updateItemStock();  
    }

    const emptyCartFunc = () => {
        setshowOrderPanel(false);
        emptyCart();
    }
    
  return (
    <>
        <Container className='mt-3'>
            <Row>
            <Col className='col-12'>
                <Card>
                    <Card.Header as="h5">Tu Carrito</Card.Header>
                    <Card.Body>
                            <Row className="pt-2">
                                <Col className='col-9'>
                                    {cartList.length === 0  
                                        ?   
                                            <div>
                                                <h1>No hay productos en el carrito.</h1>
                                                <Link to='/' >Ir a Comprar</Link>
                                            </div>
                                        : 
                                            <Row xs={1} md={1} className="g-4">
                                                { cartList.map( (prod) =>   
                                                    <>
                                                        <Container>
                                                            <Row>
                                                                <Col>
                                                                    {/* Componente item para la lista del carrito */}
                                                                    <CartListItem prod={prod}/>
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </>
                                                )}
                                            </Row>
                                    }  
                                </Col>
                                <Col className='col-3'>
                                    <Card>
                                        {/* Componente Resumen del Carrito */}
                                        <CartSummary/>
                                        <Card.Footer>
                                            <div>
                                                <Button variant="outline-primary" onClick={ isCheckOut }> Check Out </Button>
                                            </div>
                                            <div>
                                                <Button className='mt-2' size="sm" variant="outline-danger" onClick={ emptyCartFunc }> Vaciar Carrito </Button>
                                            </div>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                    </Card.Body>
                </Card>
            </Col>
            </Row>
        </Container>

        <Container>
            <Row className='mt-5'>
                <Col className='col-3'/>
                <Col className='col-6'>
                    {
                        showOrderPanel  ?   <Card>
                                                <Card.Header>Datos del comprador</Card.Header>  
                                                <Card.Body>
                                                    <Form>
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Nombre Completo</Form.Label>
                                                            <Form.Control id="name"type="text" placeholder="Ingrese su nombre..." onChange={event => setName(event.target.value)} value={name} />
                                                           
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Email</Form.Label>
                                                            <Form.Control type="email" placeholder="name@example.com" onChange={event => setEmal(event.target.value)} value={email}/>
                                                        </Form.Group>
                                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                            <Form.Label>Teléfono</Form.Label>
                                                            <Form.Control type="text" placeholder="Ingrese su celular"  onChange={event => setPhone(event.target.value)} value={phone}/>
                                                        </Form.Group>
                                                        {
                                                            isValidForm ? <></> : <span style={{color: "red"}}> * Todos los campos son obligatorios </span> 
                                                        }
                                                    </Form>
                                                </Card.Body> 
                                                {            
                                                    isFinishOrder   ?   <Card>
                                                                            <Card.Footer>
                                                                                <div> <Button variant="success" onClick={ finishOrder } > Pagar </Button> </div>
                                                                            </Card.Footer>
                                                                        </Card>
                                                                    :   <Card>
                                                                            <Card.Footer>
                                                                                <div> <Button variant="outline-primary" onClick={ checkOut }> Generar Orden </Button> </div>
                                                                            </Card.Footer>
                                                                        </Card>
                                                }
                                            </Card>
                                        :   <></>
                    }
                </Col>                    
            </Row>
        </Container>
    </>
  )
}


export default CartList