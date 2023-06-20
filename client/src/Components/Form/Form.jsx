import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from '../Nav/Nav';
import Styles from './Form.module.css';

const URL = 'http://localhost:3001';

function FormPage() {
    const [name, setName] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [duration, setDuration] = useState('');
    const [Season, setSeason] = useState('');
    const [countries, setCountries] = useState([]);
    const [allCountries, setAllCountries] = useState([]);

    useEffect(() => {
        loadCountries();
    }, []);

    const loadCountries = async () => {
        try {
            const response = await axios.get(`${URL}/countries`);
            setAllCountries(response.data);
        } catch (error) {
            console.error('Error al cargar los países:', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Realizar las validaciones
        const errors = [];

        if (name.trim() === '') {
            errors.push({ field: 'name', message: 'El nombre es obligatorio.' });
        }

        if (difficulty === '') {
            errors.push({ field: 'difficulty', message: 'Debe seleccionar una dificultad.' });
        }

        if (duration <= 0 || duration > 5) {
            errors.push({ field: 'duration', message: 'La duración debe ser mayor a cero y menor o igual a 5 horas.' });
        }

        if (Season.trim() === '') {
            errors.push({ field: 'Season', message: 'La temporada es obligatoria.' });
        }

        if (countries.length === 0) {
            errors.push({ field: 'countries', message: 'Debe seleccionar al menos un país.' });
        }

        if (errors.length > 0) {
            console.log('Formulario inválido:', errors);
            return;
        }

        // Realizar la llamada a la API para crear la actividad turística
        try {
            const activityData = {
                name,
                difficulty,
                duration: parseInt(duration),
                Season,
                countries,
            };
            console.log(activityData);

            const response = await axios.post(`${URL}/activities`, activityData);
            console.log('Actividad turística creada:', response.data);

            // Limpiar los campos del formulario después de crear la actividad
            setName('');
            setDifficulty('');
            setDuration('');
            setSeason('');
            setCountries([]);
        } catch (error) {
            console.error('Error al crear la actividad turística:', error);
        }
    };

    const sortedCountries = allCountries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return (
        <div className={Styles.container}>
            <Nav />
            <div className={Styles.form}>

                <h1>Tourist Activity Creation Form</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="difficulty">Difficuty:</label>
                        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                            <option value="">Select an option</option>
                            <option value="Easy">Easy</option>
                            <option value="Medium">Medium</option>
                            <option value="Hard">Hard</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="duration">Duration (hours):</label>
                        <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="Season">Season:</label>
                        <select id="Season" value={Season} onChange={(e) => setSeason(e.target.value)}>
                            <option value="">Select an option</option>
                            <option value="Summer">Summer</option>
                            <option value="Autumn">Autumn</option>
                            <option value="Winter">Winter</option>
                            <option value="Spring">Spring</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="countries">Countries:</label>
                        <select id="countries" multiple value={countries} onChange={(e) => setCountries(Array.from(e.target.selectedOptions, option => option.value))}>
                            <option value="">Select a Country</option>
                            {sortedCountries.map(country => (
                                <option key={country.db_id} value={country.db_id}>{country.name.common}</option>
                            ))}
                        </select>
                    </div>

                    <div className={Styles.divbutton}>
                        <button type="submit">Create Tourist Activity</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormPage;
