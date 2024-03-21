import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Assuming you use redux-mock-store for testing Redux components
import { BrowserRouter as Router } from 'react-router-dom';
import NavBarPanel from './NavBarPanel';

describe('NavBarPanel component', () => {
  const mockStore = configureStore([]);
  
  it('renders correctly with cart products length', () => {
    const cartProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }]; // Mock cart products
    const store = mockStore({ cart: cartProducts });

    const { getByText, getByTestId } = render(
      <Provider store={store}>
        <Router>
          <NavBarPanel />
        </Router>
      </Provider>
    );

    const productsLink = getByText('Products');
    expect(productsLink).toBeInTheDocument();
    

    const myBagLink = getByText(`My Bag ${cartProducts.length}`);
    expect(myBagLink).toBeInTheDocument();

    const navBarPanel = getByTestId('nav-bar-panel');
    expect(navBarPanel).toHaveStyle({ width: '1670px' });

    screen.debug(myBagLink);
  });
});
