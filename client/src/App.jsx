import './App.css';

import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
    return (
        <div className="App" >
            <Header />
            <HomePage />
        </div>
    );
}

export default App;