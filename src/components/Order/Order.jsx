import { Card } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Order( {orderId} ) {
  return (
    <>
        <Container>
            <Row className="mt-5">
                <Card >
                    <Card.Title className="mt-3">¡Felicitaciones!</Card.Title>
                    <Card.Body className="mt-32">Su orden de compra es : <h3> {orderId}</h3> </Card.Body>
                </Card>
            </Row>
        </Container>
    </>
  )
}

export default Order