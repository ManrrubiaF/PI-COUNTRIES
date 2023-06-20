import './SearchBar.css';
import { useState } from 'react';

export default function SearchBar({ onSearch }) {
   const [name, setname] = useState('');

   const handleChange = (event) => {
      setname(event.target.value)
   }

   return (
      <div>
         <input className='input' type='search' onChange={handleChange} value={name} />
         <button className='button' onClick={() =>{onSearch(name); setname('')}}>SEARCH</button>
      </div>
   );
}