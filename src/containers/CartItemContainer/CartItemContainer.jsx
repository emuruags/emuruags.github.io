import { addDoc, collection,  documentId,  getDocs, getFirestore, query, where, writeBatch } from 'firebase/firestore';
import React from 'react'
import Order from '../../components/Order/Order';
import { useCartContext } from '../../context/CarContext';
import {useState} from 'react';
import CartList from '../../components/CartList/CartList';

function CartItemContainer() {
    
    const [order, setOrder] = useState(undefined);
    const [orderId, setOrderId] = useState(undefined);
    const {cartList, emptyCart, totalPrice} = useCartContext();

    // Funcion para validar stock en firebase y armar la orden
    const generateOrder = (name, email, phone) =>{

        setOrder(undefined);

        const db = getFirestore();        
        const queryItemsCollection =  collection(db, 'items' )
        const queryItemsFilter = query(queryItemsCollection , 
                                    where( documentId() , 'in', cartList.map( x=> x.id))
                                    )
        getDocs(queryItemsFilter)
            .then(
                (itemsSnapshot) => {
                    const storedItems = itemsSnapshot.docs.map( doc => ({documentId: doc.id, ...doc.data()}))
                    let tempOrder = undefined;

                    tempOrder = {
                        buyer: {
                            name: name,
                            email: email,
                            phone: phone
                        },
                        items: [],
                        date: new Date(),
                        total: totalPrice()
                    }

                    for( const itemStored  of storedItems ) {
                        const item = cartList.find( x => x.id === itemStored.documentId)

                        if ( item ) {
                            if ( itemStored.productStock >= item.quantity ) {

                                tempOrder.items.push ( {
                                                            id: item.id,
                                                            productName: item.productName,
                                                            productPrice: item.productPrice,
                                                            productQuantity: item.quantity
                                                        } )

                            } else {
                                
                                break;
                            }

                        }
                    }
                    setOrder(tempOrder)
                }
            )
            .catch(err => console.log(err))
        
    }
    
    // Funcion para guardar la orden en firebase
    const saveOrder = () => {
        const db = getFirestore()
        const queryOrderCollection = collection (db,'orders')
        addDoc( queryOrderCollection, order )
            .then( queryOrderSnapshot => {
                    setOrderId(queryOrderSnapshot.id);
                    emptyCart();
                } )
            .catch( err => console.log(err) )
    }

    // Funcion para actualizar el stock del item en firebase
    const updateItemStock = async () => {
        const db = getFirestore()
        const queryItemsCollection = collection (db,'items')
        const queryUpdateItemsStock = query(queryItemsCollection, where( documentId(), 'in', cartList.map( x => x.id)))
        const batch = writeBatch(db)
        await getDocs(queryUpdateItemsStock)
                .then( resp => resp.docs.forEach(res => batch.update( res.ref, {
                    productStock: res.data().productStock - cartList.find(item => item.id === res.id).quantity
                    })))
                .catch( err => console.log(err) )
            batch.commit()
    }

    return (
    <>
        {
            orderId ? <Order orderId = { orderId } /> 
                    : <CartList generateOrder = { generateOrder } order= { order } saveOrder = { saveOrder } updateItemStock = {updateItemStock} />
        }
    </>
  )
}

export default CartItemContainer