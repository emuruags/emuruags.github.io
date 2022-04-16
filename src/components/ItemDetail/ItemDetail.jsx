import React from 'react'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemCount from '../ItemCount/ItemCount';
import {useState} from 'react'
import ItemCheckOut from '../ItemCheckOut/ItemCheckOut';
import { useCartContext } from '../../context/CarContext';
import { Badge } from 'react-bootstrap';
import ItemDescription from '../ItemDescription/ItemDescription';

function ItemDetail( {prod} ) {

    const [isCheckout, setCheckout] = useState(false);
    
    const {addToCart} = useCartContext()

    const onAdd = (countItem) => {
        if (prod.productStock >= countItem) {          
            addToCart( { ...prod, quantity: countItem } );
            setCheckout(true);
        }
    }
       

  return (
    <>
        <Container>
            <Row>
                <Col className='col-4'/>
                <Col>
                    <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3 text-center pl-3 ">
                    <div className="bg-light me-md-3 pt-3 px-3 pt-md-2 px-md-3 text-center overflow-hidden">
                        <div className="my-3 p-3">
                            <Card>
                                <ItemDescription prod={prod}/>
                                <Card.Footer>
                                    <Container>
                                        <Row className='pb-2'>
                                            <Col>
                                                { 
                                                    prod.productStock > 0   ?
                                                                    isCheckout  ? <ItemCheckOut/>
                                                                                : <ItemCount initial={1} stock={prod.productStock} onAdd = { onAdd }/>
                                                                            :
                                                                    <Badge bg="danger" pill  className="ms-2 ">
                                                                            OUT OF STOCK
                                                                    </Badge>
                                                                
                                                }
                                            </Col>                                            
                                        </Row>
                                    </Container>
                                </Card.Footer>
                            </Card>
                        </div>
                        <div className="bg-dark shadow-sm mx-auto" ></div>
                    </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
  )
}

export default ItemDetail