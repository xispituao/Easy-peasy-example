import { action, computed, thunk } from 'easy-peasy'
import * as basketService from '../services/basket-service';

const basketModel = {
  productIds: [2],
  count: computed(state => state.productIds.length),
  products: computed(
    [
      state => state.productIds,
      (state, storeState) => storeState.products.items
    ],
    (productIds, products) =>
      productIds.map(productId => 
        products.find(product => product.id === productId)
    ),
  ),
  addedProduct: action((state, payload) => {
    state.productIds.push(payload)
  }),
  addProduct: thunk(async (actions, payloady) => {
    await basketService.addProductToBasket(payloady)
    actions.addedProduct(payloady)
  }),
  removeProduct: action((state, payload) => {
    state.productIds.splice(payload, 1)
  })
}

export default basketModel
