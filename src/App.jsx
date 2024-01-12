import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Layout from './components/shared/Layout';
import Dashboard from './pages/Dashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import AdminRegister from './components/Auth/adminregister';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import Users from './pages/users/Users';
import Events from './pages/eventsmanagement/Events';
import AddEvents from './pages/eventsmanagement/AddEvents';
import UpdateEvent from './pages/eventsmanagement/UpdateEvent';
import AddTicket from './pages/eventsmanagement/AddTicket';
import Ecoupons from './pages/eventsmanagement/Ecoupons'
import Movies from './pages/moviesmanagement/movies';
import AddMovies from './pages/moviesmanagement/AddMovies';
import AddMTickets from './pages/moviesmanagement/AddMTickets';
import UpdateMovie from './pages/moviesmanagement/UpdateMovie';
import Mcoupons from './pages/moviesmanagement/Mcoupons';
import Order from './pages/Orders/Order';
import Reviews from "./pages/campaign/Reviews";
import Reports from "./pages/campaign/Reports";
import PayoutRequest from "./pages/Orders/PayoutRequest";
import Venues from './pages/Orders/Venues';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = () => {
        setIsAuthenticated(true);
    };
    
    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Routes>
                <Route index element={<Login login={login} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/adminregister" element={<AdminRegister/>} />
                <Route path="/" element={<Layout isAuthenticated={isAuthenticated} logout={logout} />}>
                    <Route index element={isAuthenticated ? <Navigate to="dashboard" /> : <Navigate to="/" />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="events" element={<Events />} />
                    <Route path="addevents" element={<AddEvents />} />
                    <Route path ="updateevent" element={<UpdateEvent />} />
                    <Route path ="addticket" element={<AddTicket />} />
                    <Route path="ecoupons" element={<Ecoupons />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="addmovies" element={<AddMovies />} />
                    <Route path="addmtickets" element={<AddMTickets />} />
                    <Route path="updatemovie" element={<UpdateMovie />} />
                    <Route path="mcoupons" element={<Mcoupons />} />
                    <Route path="order" element={<Order />} />    
                    <Route path="payoutrequest" element={<PayoutRequest />} />          
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="users" element={<Users />} />
                    <Route path='venues' element={<Venues />} />
                </Route>
            </Routes>
            <ToastContainer autoClose={5000} />
        </Router>
    );
}

export default App;
