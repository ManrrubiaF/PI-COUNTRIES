import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import Styles from './Form.module.css';
import { onSearching, loadCountries } from '../../Redux/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const URL = 'http://localhost:3001';

function FormPage() {
    const navigate = useNavigate();
    const [buttonstate, setButtonState] = useState(true);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [Data, setData] = useState({
        name: '',
        difficulty: '',
        duration: '',
        Season: '',
        countries: [],
    });
    const allcountries = useSelector((state) => state.countries);


    useEffect(() => {
        loadcountries();

    }, []);

    const loadcountries = () => {
        loadCountries(dispatch);
    };

    const onSearch = (name) => {
        onSearching(name, dispatch);
        navigate('/Home')
    };

    const validation = () => {
        const error = {};

        if (Data.name.length === 0) {
            error.name = "Name is required.";
        }

        if (Data.difficulty === "") {
            error.difficulty = 'Difficulty is required.';
        }

        if (Data.duration <= 0 || Data.duration > 5) {
            error.duration = 'Must be between 1 and 5 hr';
        }

        if (!Data.Season) {
            error.Season = 'Season is required.';
        }

        if (Data.countries.includes("") || Data.countries.length === 0) {
            error.countries = 'Please select at least one country.';
        }

        return error;
    };

    useEffect(() => {
        const resultform = validation()
        setErrors(resultform);
        if (Object.keys(resultform).length === 0) {
            setButtonState(false);
        } else {
            setButtonState(true);
        }


    }, [Data]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!buttonstate) {
            
            try {
                const response = await axios.post(`${URL}/activities`, Data ,{headers: {
                    'Content-Type': 'application/json',
                  }});
                alert('Actividad turística creada:', response.data);

                setData({
                    name: '',
                    difficulty: '',
                    duration: '',
                    Season: '',
                    countries: [],
                });
            } catch (error) {
                console.error('Error al crear la actividad turística:', error);
            }
        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'countries') {
            const selectedCountries = Array.from(event.target.selectedOptions, option => option.value);
            setData(Data => ({
                ...Data,
                [name]: selectedCountries,
            }));
        } else {
            setData(Data => ({
                ...Data,
                [name]: value
            }));
        }

        validation(name, value);
    }

    const sortedCountries = allcountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return (
        <div className={Styles.container}>
            <Nav onSearch={onSearch} />
            <div className={Styles.contenform}>
                <div className={Styles.form}>
                    <h1>Tourist Activity Creation Form</h1>
                    <h2>Checked boxes are required</h2>

                    <form >
                        <div className={Styles.divform}>
                            <label htmlFor="name">Name: <span>*</span></label>
                            <input type="text" name="name" value={Data.name} onChange={handleChange} />
                            {errors.name && (<p>{errors.name}</p>)}
                        </div>


                        <div className={Styles.divform}>
                            <label htmlFor="difficulty">Difficuty: <span>*</span></label>
                            <select name="difficulty" value={Data.difficulty} onChange={handleChange}>
                                <option value="">Select an option</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                            {errors.difficulty && (<p>{errors.difficulty}</p>)}
                        </div>

                        <div className={Styles.divform}>
                            <label htmlFor="duration">Duration (hours): <span >*</span></label>
                            <input type="number" min="1" max="5" name="duration" value={Data.duration} onChange={handleChange} />
                            {errors.duration && (<p>{errors.duration}</p>)}
                        </div>

                        <div className={Styles.divform}>
                            <label htmlFor="Season">Season: <span >*</span></label>
                            <select name="Season" value={Data.Season} onChange={handleChange}>
                                <option value="">Select an option</option>
                                <option value="Summer">Summer</option>
                                <option value="Autumn">Autumn</option>
                                <option value="Winter">Winter</option>
                                <option value="Spring">Spring</option>
                            </select>
                            {errors.Season && (<p>{errors.Season}</p>)}
                        </div>

                        <div className={Styles.divform}>
                            <label htmlFor="countries">Countries: <span>*</span>   Ctrl + Click for multiple selections.</label>
                            <select name="countries" multiple value={Data.countries} onChange={handleChange}>
                                <option value="">Select an option</option>
                                {sortedCountries.map(country => (
                                    <option key={country.db_id} value={country.db_id}>{country.name.common}</option>
                                ))}
                            </select>
                            {errors.countries && (<p>{errors.countries}</p>)}
                        </div>
                    </form>
                    <div className={Styles.divbutton}>
                            {!buttonstate && (
                                <button type="submit" onClick={handleSubmit} >Create Tourist Activity</button>
                            )}
                        </div>

                </div>
            </div>
        </div>
    );
}

export default FormPage;
