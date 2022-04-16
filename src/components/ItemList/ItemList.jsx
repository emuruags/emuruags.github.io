import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Item from '../Item/Item'

function ItemList( { prods } ) {
  
  return (
    <>
        <Row xs={1} md={3} className="g-4">
            { prods.map( (prod) =>   
              <>
                <Container className='grid' fluid="md">
                  <div className='grid'>
                    <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3 text-center pl-3 ">
                      <div className="bg-light me-md-3 pt-3 px-3 pt-md-2 px-md-3 text-center overflow-hidden">
                          <div className="my-3 p-3">
                              <Item  key={prod.id}  prod={prod} />
                          </div>
                          <div className="bg-dark shadow-sm mx-auto" ></div>
                      </div>
                    </div>
                  </div>
                </Container>  
              </>       
            )}
        </Row>  
    </>
  )
}

export default ItemList