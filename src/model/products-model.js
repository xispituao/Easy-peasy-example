import { action } from 'easy-peasy';

const productsModel = {
  product: null,
  items: [
    { id: 1, name: 'Brocolis', price: 2.50},
    { id: 2, name: 'Carrots', price: 4},
  ],
  getById: action((state,id) =>{
    state.product = state.items.find(product => product.id === id)
  }
  ),
}

export default productsModel
