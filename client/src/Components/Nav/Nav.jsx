import "./Nav.css";
import SearchBar from '../Searchbar/SearchBar';
import { Link } from 'react-router-dom';


const Nav = ({ onSearch }) => {

  
  return (
    <nav className="nav">
      <div className="div_barra">
        <Link to='/Home' className="Home-link"> HOME </Link>
        <Link to='/Form' className="Form-link"> DO YOU WANT TO LOAD A NEW ACTIVITY? </Link>
      </div>
      <div>
        <SearchBar className="Search" onSearch={onSearch} />
      </div>

    </nav>
  );
}

export default Nav;
