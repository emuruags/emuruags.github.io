import React from 'react'
import Button from 'react-bootstrap//Button'
import { Link } from 'react-router-dom'


function ItemCheckOut() {
  return (
    <>
        <div>
          <Link to='/CartList'>
            <Button className='mt-2 ' size="sm" variant="outline-secondary" onClick={console.log('ir a cart')}> Finalizar Compra </Button>
          </Link>
        </div>
        <div>
          <Link to='/'>
            <Button className='mt-2 ' size="sm" variant="outline-secondary" onClick={console.log('Seguir Comprando')}> Seguir Comprando </Button>
          </Link>
        </div>
    </>
  )
}

export default ItemCheckOut