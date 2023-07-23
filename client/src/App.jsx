import './App.css';

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StickyNoteEdit from "./pages/StickyNoteEdit";

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        loader: async () => {
            return await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
        },
    },
    {
        path: "/edit",
        element: <StickyNoteEdit />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/",
        element: <HomePage />
    }
])
function App() {
    return (
        <div className="App" >
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;