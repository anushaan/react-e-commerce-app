import { render, screen,fireEvent,waitFor } from '@testing-library/react';
import { Provider } from 'react-redux'; // Import Provider
import Cart from './Cart';
import configureStore from 'redux-mock-store';
import { expect, it,vi } from 'vitest';

const mockStore = configureStore([]);

describe('App', () => {
    it('renders the App component', () => {
        // Create a mock store state
        const initialState = {
          cart: [], // Mocked cart state
        };
        const store = mockStore(initialState);
    
        render(
          <Provider store={store}> {/* Wrap Cart component in Provider */}
            <Cart />
          </Provider>
        );
        
        screen.debug(); // prints out the JSX in the Cart component unto the command line
      });
      
      it('renders product cards correctly', () => {
        // Create a mock store state with some products in the cart
        const initialState = {
          cart: [
            { id: 1, title: 'Product 1', image: 'product1.jpg', price: 10 },
            { id: 2, title: 'Product 2', image: 'product2.jpg', price: 20 },
          ],
        };
        const store = mockStore(initialState);
    
        render(
          <Provider store={store}>
            <Cart />
          </Provider>
        );
    
        // Check if each product card is rendered with correct title and price
        const product1Title = screen.getByText('Product 1');
        const product2Title = screen.getByText('Product 2');
        expect(product1Title).toBeInTheDocument();
        expect(product2Title).toBeInTheDocument();
      });

      it('dispatches remove item when the remove button is clicked', async() => {
        const initialState = {
            cart : [
                { id: 1, title: 'Product 1', image: 'product1.jpg', price: 10 },
                { id: 2, title: 'Product 2', image: 'product2.jpg', price: 20 },
            ],
        }
        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <Cart />
            </Provider>
        );
        await waitFor(() => {
            // Find all elements with the text "Remove Item"
            const removeButtons = screen.getAllByText('Remove Item');
      
            // Click on the first "Remove Item" button
            fireEvent.click(removeButtons[0]);
          });
        const actions = store.getActions();
        expect(actions).toHaveLength(1);
        expect(actions[0].type).toBe('cart/remove');
        expect(actions[0].payload).toBe(1);
      })
})