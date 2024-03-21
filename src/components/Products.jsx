import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import {add} from '../store/cartSlice';
import { getProducts } from '../store/productSlice' ;
import StatusCode from '../utils/StatusCode';

const Products = () => {
    const dispatch = useDispatch();
    const {data: products,status} = useSelector(state => state.products)
   
    useEffect(() => {
        dispatch(getProducts())  
    }, []);

    if(status === StatusCode.LOADING) {
        return <p>Loading....</p>
    }
    if(status === StatusCode.ERROR) {
        return <p>Something went wrong! try again later.</p>
    }

    const addToCart = (product) => {
        dispatch(add(product));
    }

   
    const cards = products.map(product => (
        <div className="col-md-3" style={{ marginBottom: '10px' }}>
            <Card key={product.id} className="h-100">
                <div className="text-center">
                    <Card.Img variant="top" src={product.image} style={{ width: '100px', height: '130px' }} />
                </div>
                <Card.Body className="text-center">
                    <Card.Title>{product.title}</Card.Title>
                    <Card.Text>
                        £{product.price}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-center" style={{ background: 'white' }}>
                    <Button variant="primary" onClick={()=> addToCart(product)}>Add To Cart</Button>
                </Card.Footer>
            </Card>
        </div>
    ))
    return (
        <div>
            <h1 className="text-center">Products Dashbord</h1>
            <div className="row" data-testid="products-component">
                {cards}
            </div>
        </div>
    )
}

export default Products

 // const getProducts = async () => {
    //     try {
    //         const response = await fetch('https://fakestoreapi.com/products');
    //         const productsResponse = await response.json();
    //         console.log(productsResponse)
    //         setProducts(productsResponse);
    //     } catch (e) {
    //         console.log('error', e);
    //     }
    // }