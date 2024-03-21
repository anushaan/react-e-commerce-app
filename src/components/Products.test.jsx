// import { render, screen } from '@testing-library/react';
// import Products from './Products';
// import { Provider } from 'react-redux';
// import store from '../store/store'; // Assuming you export your Redux store from a file named store.jsx
// import { expect, it,vi } from 'vitest';
// import { getProducts } from '../store/productSlice';
// import StatusCode from '../utils/StatusCode';

// describe('Products component', () => {
//   beforeEach(() => {
//     render(
//       <Provider store={store}>
//         <Products />
//       </Provider>
//     );
//   });

//   it('renders loading state initially', () => {
//     const loadingText = screen.getByText(/loading/i);
//     expect(loadingText).toBeInTheDocument();
//     screen.debug(loadingText)
//   });
 
//   // Add more tests as needed, for example, testing for error state, rendering product cards, etc.
// });

import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Products from './Products';
import { getProducts } from '../store/productSlice';
import { add } from '../store/cartSlice';
import StatusCode from '../utils/StatusCode';

// Define middleware array
const middlewares = [thunk];

// Configure store with middleware
const mockStore = configureStore(middlewares);

describe('Products component', () => {
  it('adds product to cart on button click', async () => {
    const products = [
      { id: 1, title: 'Product 1', price: 10, image: 'product1.jpg' },
    ];

    // Mock the asynchronous action creator getProducts
    const getProductsMock = () => async (dispatch) => {
      // Simulate asynchronous behavior
      setTimeout(() => {
        dispatch({ type: 'productSlice/getProducts', payload: products });
      }, 1000);
    };

    // Create a mock store
    const initialState = { products: { data: [], status: StatusCode.LOADING }, cart: [] };
    const store = mockStore(initialState);

    // Manually dispatch the mocked action creator
    store.dispatch = jest.fn().mockImplementation(getProductsMock());

    const { getByTestId } = render(
      <Provider store={store}>
        <Products />
      </Provider>
    );

    // Wait for products to be loaded
    await waitFor(() => {
      const addToCartButton = getByTestId(`add-to-cart-button-${products[0].id}`);
      fireEvent.click(addToCartButton);
    });

    // Ensure that the add action is dispatched with the correct payload
    expect(store.getActions()).toContainEqual(add(products[0]));
  });
});


