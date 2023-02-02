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
    
    const countTotal = products.reduce((acc,{stock}) => acc+stock,0);
    const totalPrice = products.reduce((acc,{price,stock}) => acc+price*stock,0)
    const totalPriceDisc = products.reduce((acc, {price,stock,discountPercentage}) => acc + discount(discountPercentage,price)*stock,0)
     
  return (
    <div>
        <div  className={s.container}> 
            {
            products.map((product) => <Product key = {product.id} {...product}
            deleteProduct={deleteProduct}
            discount={discount}/>)
            }
        </div>
        <div className={s.summury}>
            <p>Products count = {countTotal}</p>
            <p>Total price = {totalPrice}$</p>
            <p>Total price with discount = {totalPriceDisc.toFixed(2)}$</p>
        </div>
    </div>
  )
}
