import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import store from '../../store/store';
import RootLayout from './RootLayout';

describe('RootLayout component', () => {
  it('renders NavBarPanel', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RootLayout />
        </MemoryRouter>
      </Provider>
    );
    const navBarPanel = getByTestId('nav-bar-panel');
    expect(navBarPanel).toBeInTheDocument();
  });

  it('renders child components', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <RootLayout />
        </MemoryRouter>
      </Provider>
    );
    const mainElement = getByTestId('main-element');
    expect(mainElement).toBeInTheDocument();
  });
});
