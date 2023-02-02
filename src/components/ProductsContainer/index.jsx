import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import Product from '../Product';
import s from './style.module.css'

export default function ProductsContainer() {
    useEffect (() =>{
        (async () => {
            const resp = await fetch ('https://dummyjson.com/products');
            const data = await resp.json();
            const newData = data.products;
            setProducts(newData);
        })()
    },[])
    
    const [products, setProducts] = useState([]);
    const discount = (discPercent,price) => {
        const newPrice = price - ((price /100)*discPercent)
        return newPrice
    }

    const deleteProduct = async (delId) => {
        const resp = await fetch(`https://dummyjson.com/products/${delId}`, {
            method: 'DELETE',
          });
          const delItem = await resp.json();
          const newData = products.filter(({id}) => id !== delItem.id);
          setProducts(newData)
    }
    
     
  return (
    <div className={s.container}>
        {
            products.map((product) => <Product key = {product.id} {...product}
            deleteProduct={deleteProduct}
            discount={discount}/>)
        }
    </div>
  )
}
