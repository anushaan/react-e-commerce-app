import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Products from './components/Products';
import Dashboard from './components/Dashboard/Dashboard';
import Cart from './components/Cart/Cart';
import RootLayout from './components/RootLayout/RootLayout';


function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Dashboard />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
    </Route>
  ))
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
