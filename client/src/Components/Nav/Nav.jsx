import Styles from "./Nav.module.css";
import SearchBar from '../Searchbar/SearchBar';
import { Link } from 'react-router-dom';


const Nav = ({ onSearch }) => {

  
  return (
    <nav className={Styles.nav}>
      <div className={Styles.div_barra}>
        <Link to='/Home' className={Styles.Homelink}> HOME </Link>
        <Link to='/Form' className={Styles.Formlink}> DO YOU WANT TO LOAD A NEW ACTIVITY? </Link>
      </div>
      <div>
        <SearchBar className={Styles.Search} onSearch={onSearch} />
      </div>

    </nav>
  );
}

export default Nav;
