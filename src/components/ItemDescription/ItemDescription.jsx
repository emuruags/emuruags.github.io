import React from 'react'
import { Card } from 'react-bootstrap'

function ItemDescription({prod}) {
  return (
    <>
        <div className="d-md-flex flex-md-equal my-md-3 ps-md-3 text-center pl-5 ">
            <div className=" me-md-3 pt-3 px-3 pt-md-2 px-md-3 text-center overflow-hidden">
                <div className="my-3 p-3">
                    <Card key={prod.id} style={{ width: '19rem' }} >
                        <Card.Img variant="top" src={`${prod.productImg}`} width="100" height="180"/>
                        <Card.Body>
                            <Card.Title>{` ${prod.categoryDescription} - ${prod.productName}`}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{`U$S ${prod.productPrice}`}</Card.Subtitle>
                            <Card.Text>
                                {`${prod.productDescription}`}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    </>
  )
}

export default ItemDescription