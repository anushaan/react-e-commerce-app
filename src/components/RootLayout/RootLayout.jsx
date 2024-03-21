import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBarPanel from '../NavBar/NavBarPanel';
import { Provider } from 'react-redux';
import store from '../../store/store';

const RootLayout = () => {
    return (
        <div>
            <Provider store={store}>
                <NavBarPanel/>
                <main data-testid="main-element">
                    <Outlet />
                </main>
            </Provider>

        </div>
    )
}

export default RootLayout;