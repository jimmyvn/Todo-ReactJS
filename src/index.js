import React from "react";
import ReactDOM from "react-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TodoList from './components/TodoList'
import './index.css'

ReactDOM.render(
  <>
    <Navbar />
    <TodoList />
    <Footer />
  </>,
  document.getElementById('root')
)