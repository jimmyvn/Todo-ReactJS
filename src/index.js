import React from "react";
import ReactDOM from "react-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import TodoList from './components/TodoList'
import './index.css'
import TodoProvider from "./context/TodoProvider";

ReactDOM.render(
  <>
    <Navbar />
    <TodoProvider>
      <TodoList />
    </TodoProvider>
    <Footer />
  </>,
  document.getElementById('root')
)