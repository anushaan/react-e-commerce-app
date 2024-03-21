import { render,screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store'; // Adjust the path as needed
import Dashboard from './Dashboard';

describe('Dashboard component', () => {
  it('renders Products component', async () => {
    const { findByTestId } = render(
      <Provider store={store}>
        <Dashboard />
      </Provider>
    );
    const productsComponent = await findByTestId('products-component');
    expect(productsComponent).toBeInTheDocument();
    screen.debug(productsComponent);
  });
});


