import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Footer from "./components/Footer";
import MainComponent from "./components/MainComponent";
import Navbar from "./components/Navbar";
import TodoList from './components/TodoList'
import './index.css'

ReactDOM.render(
  <>
    <Navbar />
    <TodoList />
    {/* <MainComponent />
    <App /> */}

    <Footer />
  </>,
  document.getElementById('root')
)