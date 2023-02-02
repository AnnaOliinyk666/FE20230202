import React from 'react'
import s from './style.module.css'

export default function Product({id,thumbnail,title,price,stock,discountPercentage,discount,deleteProduct}) {
  return (
    <div className={s.card}>
        
        <h3>{title}</h3>
        <img src={thumbnail} alt="placeholder" />
        <p>In stock: {stock}</p>
        <div className={s.price}>
            <p className={s.oldPrice}>Price: {price}</p>
            <p>Price with discount: <span className={s.discount}>{+discount(discountPercentage,price).toFixed(2)}</span></p>
        </div>
        <button onClick={()=>deleteProduct(id)}>Delete</button>
    </div>
  )
}
