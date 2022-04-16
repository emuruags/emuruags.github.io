import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import {useState} from 'react'


function ItemCount( {stock, onAdd} ) {

    const [countItem, setCountItem] = useState(1);

    const constStock = parseInt(stock);

    const onIncrease= () => {
        if (countItem < constStock ) {
            setCountItem( countItem => countItem + 1 );
        }
    }

    const onDecrease = () => {
        if (countItem > 1) {
            setCountItem( countItem => countItem - 1 );
        }
    }

    const onAddFunction = () => {
        onAdd( countItem );
    }

  return (
    <>
        <Container>
            <Row>
                <Col>
                    <Button className='' variant="outline-danger" size="sm" onClick={onDecrease} > - </Button>
                </Col>
                <Col>
                    <Form.Control  size="sm text-center" type="text" placeholder=""  value = {countItem} >
                        
                    </Form.Control>
                </Col>
                <Col>
                    <Button className='' variant="outline-primary" size="sm" onClick={onIncrease} > + </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button className='mt-2 ' size="sm" variant="outline-secondary" onClick={ onAddFunction } > Agregar al Carrito </Button>
                </Col>                                            
            </Row>
        </Container>
    </>
  )
}

export default ItemCount