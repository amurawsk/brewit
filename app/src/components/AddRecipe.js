import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipe = () => {
    const navigate = useNavigate();

    const Logout = () => navigate('/');
    const AddRecipe = () => navigate('/recipes');

    const [recipeName, setRecipeName] = useState('');
    const [volume, setVolume] = useState('');
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState({
        name: '',
        equipment: '',
        time: '',
        description: '',
    });

    const handleLogout = () => {
        localStorage.removeItem('userType');
        Logout();
    };

    const addStep = () => {
        setSteps([...steps, currentStep]);
        setCurrentStep({ name: '', equipment: '', time: '', description: '' });
    };

    return (
        <div
            className="add_recipe"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '20px',
            }}>
            <button onClick={handleLogout} style={{ alignSelf: 'flex-end' }}>
                Wyloguj
            </button>
            <h1>Witaj w dodawaniu przepisów!</h1>
            <p>Opis</p>
            <form
                onSubmit={AddRecipe}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'right',
                    padding: '20px',
                }}>
                <div style={{ padding: '10px' }}>
                    <label for="name">
                        <b>Nazwa przepisu: </b>
                    </label>
                    <input
                        type="text"
                        placeholder="Wpisz nazwę przepisu"
                        onChange={(e) => setRecipeName(e.target.value)}
                        name="name"
                        required></input>
                </div>
                <div style={{ padding: '10px' }}>
                    <label for="volume">
                        <b>Produkowana objętość: </b>
                    </label>
                    <input
                        type="text"
                        placeholder="Wpisz objętość"
                        onChange={(e) => setVolume(e.target.value)}
                        name="volume"
                        required></input>
                </div>
                <div>
                    <label
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            padding: '10px',
                        }}>
                        <b>Dodaj etap:</b>
                    </label>
                    <div style={{ padding: '5px' }}>
                        <label for="stage_name">
                            <b>Nazwa etapu: </b>
                        </label>
                        <input
                            type="text"
                            placeholder="Wpisz nazwę etapu"
                            value={currentStep.name}
                            onChange={(e) =>
                                setCurrentStep({
                                    ...currentStep,
                                    name: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div style={{ padding: '5px' }}>
                        <label for="stage_name">
                            <b>Całkowity czas: </b>
                        </label>
                        <input
                            type="text"
                            placeholder="Wpisz całkowity czas"
                            value={currentStep.time}
                            onChange={(e) =>
                                setCurrentStep({
                                    ...currentStep,
                                    time: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div style={{ padding: '5px' }}>
                        <label for="device_type">
                            <b>Wybierz typ urządzenia: </b>
                        </label>
                        <select
                            value={currentStep.device}
                            onChange={(e) =>
                                setCurrentStep({
                                    ...currentStep,
                                    device: e.target.value,
                                })
                            }>
                            <option value="brewer">Tank Warzelny</option>
                            <option value="fermenter">
                                Pojemnik fermentacyjny
                            </option>
                            <option value="lager">Kocioł do leżakowania</option>
                            <option value="filler">
                                Urządzenie do rozlewania
                            </option>
                        </select>
                    </div>
                    <div style={{ padding: '5px' }}>
                        <label for="description">
                            <b>Opis: </b>
                        </label>
                        <input
                            type="text"
                            placeholder="Dodaj opis"
                            value={currentStep.description}
                            onChange={(e) =>
                                setCurrentStep({
                                    ...currentStep,
                                    description: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                </div>
                <button
                    type="button"
                    onClick={addStep}
                    style={{ marginTop: '10px' }}>
                    Dodaj etap
                </button>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                    <label>
                        <b>Dodane etapy:</b>
                    </label>
                    <table border="1" cellPadding="10">
                        <thead>
                            <tr>
                                <th>Lp.</th>
                                <th>Nazwa Etapu</th>
                                <th>Czas</th>
                                <th>Urządzenie</th>
                                <th>Opis</th>
                            </tr>
                        </thead>
                        <tbody>
                            {steps.map((step, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{step.name}</td>
                                    <td>{step.time}</td>
                                    <td>{step.device}</td>
                                    <td>{step.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button type="submit">Dodaj przepis</button>
            </form>
        </div>
    );
};

export default AddRecipe;
