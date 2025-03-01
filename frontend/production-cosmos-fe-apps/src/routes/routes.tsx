import Customer from "../pages/Customer";
import Inventory from "../pages/Inventory";
import Order from "../pages/Orders";

export const routesConfig = [
    { path: '/', element: <Customer />, title: 'Customer' },
    { path: '/inventoy', element: <Inventory />, title: 'Inventory' },
    { path: '/orders', element: <Order />, title: 'Orders' },
];