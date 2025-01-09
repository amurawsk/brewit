import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTittleWithButton from '../../utils/PageTittleWithButton.jsx';
import ShowRecipes from '../../modules/contract/ShowRecipes.jsx';
import ShowRecipeDetails from '../../modules/contract/ShowRecipeDetails.jsx';
import styles from './Recipes.module.css';

const Recipes = () => {
    const navigate = useNavigate();

    const addRecipe = () => navigate('/contract/recipes/add');
    const [recipe, setRecipe] = useState(null);
    const [recipeFields, setRecipeFields] = useState({});
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const recipes = [
        {
            id: 1,
            name: 'Przepis na piwo',
            full_time: '2 tygodnie',
            full_volume: 20,
            steps: [
                {
                    name: 'Przygotowanie brzeczki',
                    device: 'Tank Warzelny',
                    time: '60 minut',
                    description:
                        'Gotuj wodę i dodaj składniki, aby przygotować brzeczkę.',
                    ingredients: [
                        { name: 'Woda', quantity: '15L' },
                        { name: 'Słód jęczmienny', quantity: '3kg' },
                        { name: 'Chmiel', quantity: '50g' },
                        { name: 'Drożdże piwne', quantity: '10g' },
                    ],
                },
                {
                    name: 'Fermentacja',
                    device: 'Pojemnik fermentacyjny',
                    time: '10-14 dni',
                    description:
                        'Przenieś brzeczkę do fermentora i pozostaw do fermentacji.',
                    ingredients: [
                        { name: 'Brzeczka', quantity: '20L' },
                        { name: 'Drożdże piwne', quantity: '10g' },
                    ],
                },
                {
                    name: 'Butelkowanie',
                    device: 'Urządzenie do rozlewania',
                    time: '1-2 godziny',
                    description:
                        'Zabutelkowanie piwa i dodanie cukru do refermentacji.',
                    ingredients: [
                        { name: 'Piwo po fermentacji', quantity: '20L' },
                        { name: 'Cukier', quantity: '50g' },
                    ],
                },
                {
                    name: 'Dojrzewanie',
                    device: 'Kocioł do leżakowania',
                    time: '1-2 tygodnie',
                    description:
                        'Pozostaw piwo w butelkach do pełnego dojrzenia.',
                    ingredients: [{ name: 'Piwo w butelkach', quantity: '20L' }],
                },
            ],
        },
    ];

    const openPanel = (recipe) => {
        setRecipe(recipe);
        setRecipeFields({ ...recipe });
        setIsPanelOpen(true);
    };

    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTittleWithButton
                        text="Przepisy"
                        buttonText="Dodaj nowy przepis"
                        buttonFunction={addRecipe}
                    />

                    {recipes.length === 0 ? (
                        <p className={styles.noDevicesMessage}>
                            Brak przepisów. Dodaj nowy przepis.
                        </p>
                    ) : (
                        <ShowRecipes recipes={recipes} openPanel={openPanel} />
                    )}
                </div>
            </div>

            <ShowRecipeDetails
                isPanelOpen={isPanelOpen}
                setIsPanelOpen={setIsPanelOpen}
                recipe={recipe}
                setRecipe={setRecipe}
            />
        </div>
    );
};

export default Recipes;
