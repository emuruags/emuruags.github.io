import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../img/logo/logo.jpg'
import CarWidget from '../CarWidget/CarWidget'
import { NavLink} from 'react-router-dom'
import {useState, useEffect} from 'react';
import { collection, getDocs, getFirestore, query, orderBy} from 'firebase/firestore'

function NavBar() {

    const [prods, setProds] = useState ([])

    useEffect(()=> {
        const db = getFirestore()
        const queryCollection =  collection(db, 'categorys' )
        const queryFilter = query(queryCollection , orderBy("key"))
        getDocs(queryFilter)
            .then(resp => setProds( resp.docs.map(prod =>( {id: prod.id, ...prod.data()}) ) ) )
            .catch(err => console.log(err))

        }, [])
    
  return (

    <>
        <Navbar  collapseOnSelect expand="lg" bg="black" variant="dark">
            <Container>
                <NavLink to='/'>
                    <img
                    alt=""
                    src= {logo}
                    width="40"
                    height="40"
                    className="d-inline-block align-top"
                    />{' '}
                    Vikings Fitness Gear
                </NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <NavDropdown title="Tienda" id="collasible-nav-dropdown" >
                        { prods.map( (prods) =>  
                            <>
                                <NavLink  key={prods.key} to={`/categoria/${prods.key}`}>
                                    {` ${prods.categoryDescription}`}
                                </NavLink>
                                <br/>
                            </>
                        )}
                        <Nav.Link/>
                    </NavDropdown>
                        { prods.map( (prods) =>  

                            <>
                                <NavLink  key={prods.key} to={`/categoria/${prods.key}`}>
                                    {`${prods.categoryDescription}`}
                                </NavLink>
                                <Nav.Link/>
                            </>
                        )}
                    <Nav.Link/>
                    </Nav>
                    <Nav>
                    <Nav.Link eventKey={2} href="#memes">
                    <CarWidget/>
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </> 

  )
}

export default NavBar