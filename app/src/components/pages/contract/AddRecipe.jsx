import React from 'react';

import styles from './AddRecipe.module.css';
import DashboardHeader from '../../modules/DashboardHeader.jsx';
import ContractSidebar from '../../modules/contract/ContractSidebar.jsx';
import AddRecipeForm from '../../modules/contract/AddRecipeForm.jsx';
import PageTitle from '../../utils/PageTitle.jsx';

const AddRecipe = () => {
    return (
        <div>
            <DashboardHeader />
            <div className={styles.container}>
                <ContractSidebar />
                <div className={styles.addEquipment}>
                    <PageTitle text="Dodaj przepis" />
                    <AddRecipeForm isEditing={true} />
                </div>
            </div>
        </div>
    );
};

export default AddRecipe;
