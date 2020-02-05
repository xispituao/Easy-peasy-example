import React, { useCallback, useState, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'easy-peasy'

export default function Product({ id }) {
  const addProductToBasket = useStoreActions(
    actions => actions.basket.addProduct
  )
  const getProduct = useStoreActions(
    actions => actions.products.getById
  )
  // load the required product from state
  const product = useStoreState(state => state.products.product)
  
  // state to track when we are saving to basket
  const [adding, setAdding] = useState(false);

  useEffect(()=>{
    getProduct(id) 
  }, [])
          
  // callback to handle click, saving to basket
  const onAddToBasketClick = useCallback(async () => {
    setAdding(true);
    await addProductToBasket(product.id)
    setAdding(false);
  }, [product]);

  return (
    <>
    {
      product 
      ? 
      (<div>
      <h2>{product.name}</h2>
      <p>
        <em>£ {product.price}</em>
      </p>
      {adding ? (
        'Adding...'
      ) : (
        <button onClick={onAddToBasketClick}>Add to basket</button>
      )}
    </div>  )
      :
      false
    }
    </>
  );
}
