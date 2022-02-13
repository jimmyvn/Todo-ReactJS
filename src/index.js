import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Footer from "./components/Footer";
import MainComponent from "./components/MainComponent";
import Navbar from "./components/Navbar";
import TodoList from './components/TodoList'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <div className="todo-list-parent">
      <TodoList />
    </div>

    {/* <MainComponent />
    <App /> */}

    <Footer />
  </React.StrictMode>,
  document.getElementById('root')
)