import { useState ,useEffect } from 'react';
import ItemDetail from '../../components/ItemDetail/ItemDetail'
import { useParams } from "react-router-dom"
import {  doc, getDoc, getFirestore } from 'firebase/firestore'

function ItemDetailContainer() {
  const [loading , setLoading] = useState (true)
  const [prod, setProd] = useState ([])
  const { detalleId } = useParams()

  useEffect(()=> {
    const db = getFirestore()
    const queryDoc =  doc(db, 'items' , detalleId)   
    getDoc(queryDoc)
      .then(resp => setProd( {id: resp.id, ...resp.data()} ) ) 
      .catch(err => console.log(err))
      .finally( () => setLoading(false))
  }, [detalleId])

  return (
    <>
        {
          loading ? <img className="w-45 mx-auto " 
                          src="https://firebasestorage.googleapis.com/v0/b/coderhouse-reactjs-ecommerce.appspot.com/o/img%2Floading%2Floading.gif?alt=media&token=290b2e66-747c-4f5b-b784-bf84bfc8cf0a" 
                          alt="loading" />
                  : <ItemDetail prod={ prod }/>
        }
    </>
  )
}

export default ItemDetailContainer