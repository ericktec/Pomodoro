import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import TimerProvider from "./contexts/TimerContext";

function App() {
    return (
        <div className="App">
            <TimerProvider>
                <Home />
            </TimerProvider>
        </div>
    );
}

export default App;
