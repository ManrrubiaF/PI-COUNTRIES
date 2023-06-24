import Styles from "./Nav.module.css";
import SearchBar from '../Searchbar/SearchBar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";


const Nav = ({ onSearch }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const back = () => {
    dispatch(backclick());
    navigate('/Home');
  }

  
  return (
    <nav className={Styles.nav}>
      <div className={Styles.div_barra}>
        <Link to='/Home' className={Styles.Homelink} onClick={back}> HOME </Link>
        <Link to='/Form' className={Styles.Formlink}> DO YOU WANT TO LOAD A NEW ACTIVITY? </Link>
      </div>
      <div>
        <SearchBar className={Styles.Search} onSearch={onSearch} />
      </div>

    </nav>
  );
}

export default Nav;
