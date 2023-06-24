import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from './Components/Landing/Landing.jsx';
import Form from './Components/Form/Form.jsx'
import Home from './Components/Home/Home.jsx';
import Details from './Components/Details/Details.jsx';
import Nav from './Components/Nav/Nav.jsx'



function App() {

  useEffect(() => {
    document.title = 'Countries Search'; // Cambia el título de la pestaña del navegador
  }, []);

  const { pathname } = useLocation();

  return (
    <div> 
      { pathname !== "/" && < Nav />}
      <Routes>
        <Route path="/" element={<Landing />} Component={Landing} />
        <Route path="/Home" element={<Home />} Component={Home} />
        <Route path="/Details/:id" element={<Details />} Component={Details}/>
        <Route path="/Form" element={<Form />} Component={Form}/>
      </Routes>
      </div>
  );
}

export default App;
