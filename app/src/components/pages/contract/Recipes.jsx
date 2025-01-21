import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import PageTitleWithButton from '../../utils/PageTitleWithButton.jsx';
import ShowRecipes from '../../modules/contract/ShowRecipes.jsx';
import ShowRecipeDetails from '../../modules/contract/ShowRecipeDetails.jsx';
import styles from './Recipes.module.css';
import api from '../../../api.js';

const Recipes = () => {
    const navigate = useNavigate();

    const addRecipe = () => navigate('/contract/recipes/add');
    const [recipes, setRecipes] = useState([]);
    const [recipe, setRecipe] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

	const getData = async () => {
        try {
            const response = await api.get(`recipies/`);
            if (response.status === 200) {
                setRecipes(response.data);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log('Error fetching recipes:', error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    const openPanel = (recipe) => {
        setRecipe(recipe);
        setIsPanelOpen(true);
    };

    return (
        <div>
            <DashboardHeader />
            <div className={styles.appContainer}>
                <ContractSidebar />
                <div className={styles.content}>
                    <PageTitleWithButton
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
