import './App.css';
import React from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Calendar from "./components/Calendar";
import Form from "./components/Form";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Main />
      <Calendar />
      <Form />
      <Footer />
    </>
  );
}

export default App;