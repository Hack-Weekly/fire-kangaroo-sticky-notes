import './App.css';

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StickyNoteEdit from "./pages/StickyNoteEdit";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    createBrowserRouter,
    RouterProvider,
    redirect,
} from "react-router-dom"

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
        loader: async () => {
            try {
                let data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/notes`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                }).then(res => res.json())

                if (!Array.isArray(data)) {
                    console.log("Failed to retrieve notes from database.")
                    console.log("Please ensure you are logged in")
                    
                    // Read notes from localStorage
                    data = [];
                    // TODO: load from localStorage instead of database
                }

                return data;
            } catch (err) {
                console.log(err)
                return [];
            }
        },
    },
    {
        path: "/add",
        element: <StickyNoteEdit />,
        loader: async () => {
            let isAuth = await fetch(`${process.env.REACT_APP_BACKEND_URL}/authenticated`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            }).then(res => res.json()).then(json => { 
                return json
            })
            if (!isAuth.auth) {
                toast.warn('To add sticky notes to your board you must first login.');
                return redirect("/");
            }

            return null;
        }
    },
    {
        path: "/edit/:id",
        element: <StickyNoteEdit />,
        loader: async ({ params }) => {
            console.log(params)
            let note = {};
            if (params.id !== null) {
                note = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/note/${params.id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include'
                })
                .then(res => res.json())
                .then(json => {
                    return {title: json.title, text: json.text, color: json.color}
                })
            }


            return note
        }
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/logout",
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


const App = () => {

    return (
        <div className="App" >
            <ToastContainer
                position="bottom-left"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="dark"
            />
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;