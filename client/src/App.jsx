import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './Components/Landing/Landing.jsx';
import Form from './Components/Form/Form.jsx'
import Home from './Components/Home/Home.jsx';
import Details from './Components/Details/Details.jsx';


function App() {

  useEffect(() => {
    document.title = 'Countries Search'; // Cambia el título de la pestaña del navegador
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Details/:id" element={<Details />}/>
        <Route path="/Form" element={<Form />}/>

      </Routes>
    </Router>
  );
}

export default App;
