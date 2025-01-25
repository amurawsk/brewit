import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ShowRecipeDetails.module.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import ConfirmModal from '../../utils/ConfirmModal';
import Notification from '../../utils/Notification.jsx';
import api from '../../../api.js';

const ShowRecipeDetails = ({
    isPanelOpen,
    setIsPanelOpen,
	orders,
    recipe,
    setRecipe,
}) => {
	console.log("orders: ", orders);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate('/contract/recipes/edit', { state: { recipe } });
    };

	const deviceTypes = {
		BT: 'Tank Warzelny',
		FT: 'Pojemnik fermentacyjny',
		AC: 'Kocioł do leżakowania',
		BE: 'Urządzenie do rozlewania',
	};

    const showNotification = () => {
        setIsNotificationVisible(true);
        setTimeout(() => {
            setIsNotificationVisible(false);
        }, 2000);
    };

    const closePanel = () => {
        setIsPanelOpen(false);
        setRecipe(null);
    };

    const handleAction = (id) => {
        setDeleteId(id);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        const removeRecipe = async () => {
            try {
				const response = await api.post(`recipies/delete/`, {
					id: deleteId,
				});
                if (response.status === 200) {
					setIsModalOpen(false);
					setIsPanelOpen(false);
					setDeleteId(null);
					showNotification();
                } else {
                    console.log("Nie usunieto");
                }
            } catch (error) {
				console.log(error);
            }
        };
		removeRecipe();
    };

    const cancelAction = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            {isPanelOpen && recipe && (
                <div className={styles.overlay}>
                    <div className={styles.panel}>
                        <div className={styles.header}>
                            <div className={styles.left}>
                                Przepis #{recipe.pk}
                            </div>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.detailBox}>
                                <h3>Szczegóły przepisu</h3>
                                <p>Nazwa przepisu: {recipe.name}</p>
                                <p>Całkowity czas: {recipe.full_time} dni</p>
                                <p>
                                    Całkowita objętość: {recipe.full_volume} L
                                </p>
                            </div>
                        </div>

                        <div className={styles.stages_orders_titles}>
                            <h3>Etapy przepisu</h3>
                            <h3>Powiązane zlecenia</h3>
                        </div>
                        <div className={styles.stages_orders}>
                            <div className={styles.stages}>
                                {recipe.steps && recipe.steps.length > 0 ? (
                                    recipe.steps.map((step, index) => (
                                        <div
                                            key={index}
                                            className={styles.detailBox}>
                                            <h4>Etap {index + 1}</h4>
                                            <p>Nazwa etapu: {step.name}</p>
                                            <p>Typ urządzenia: {deviceTypes[step.device_type]}</p>
                                            <p>Czas: {step.time} dni</p>
                                            <p>Opis: {step.description}</p>
                                            {step.ingredients &&
                                                step.ingredients.length > 0 && (
                                                    <div
                                                        className={
                                                            styles.ingredients
                                                        }>
                                                        <h5>Składniki</h5>
                                                        {step.ingredients.map(
                                                            (
                                                                ingredient,
                                                                idx
                                                            ) => (
                                                                <div
                                                                    key={idx}
                                                                    className={
                                                                        styles.detailBox
                                                                    }>
                                                                    <p>
                                                                        Nazwa:{' '}
                                                                        {
                                                                            ingredient.name
                                                                        }
                                                                    </p>
                                                                    <p>
                                                                        Ilość:{' '}
                                                                        {
                                                                            ingredient.amount
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    ))
                                ) : (
                                    <p>Brak etapów receptury</p>
                                )}
                            </div>

                            <div className={styles.orders}>
                                {orders && orders.length > 0 ? (
                                    orders.map((order, index) => (
                                        <div
                                            key={index}
                                            className={styles.detailBox}>
                                            <h4>Zlecenie #{order.id}</h4>
                                            <p>
                                                Zleceniobiorca:{' '}
                                                {order.contract_brewery_name}
                                            </p>
                                            <p>
                                                Utworzone dnia:{' '}
                                                {new Date(
                                                    order.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                            <p>Typ piwa: {order.beer_type}</p>
                                            <p>
                                                Ocena:{' '}
                                                {order.rate === null ? (
                                                    <span
                                                        className={
                                                            styles.emptyRate
                                                        }>
                                                        brak
                                                    </span>
                                                ) : order.rate ? (
                                                    <FaThumbsUp
                                                        className={
                                                            styles.greenThumb
                                                        }
                                                    />
                                                ) : (
                                                    <FaThumbsDown
                                                        className={
                                                            styles.redThumb
                                                        }
                                                    />
                                                )}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Brak powiązanych zleceń</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                onClick={handleEdit}
                                className={styles.editButton}>
                                Edytuj
                            </button>
                            <button
                                onClick={() => handleAction(recipe.pk)}
                                className={styles.cancelButton}>
                                Usuń przepis
                            </button>
                            <button
                                onClick={closePanel}
                                className={styles.okButton}>
                                Zamknij
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <ConfirmModal
                    message="Czy na pewno chcesz usunąć ten przepis?"
                    description="Spowoduje to usunięcie przypisanych zleceń" /*TODO what then */
                    onConfirm={confirmAction}
                    onCancel={cancelAction}
                />
            )}

            <Notification
                message="Operacja zakończona sukcesem!"
                isVisible={isNotificationVisible}
            />
        </div>
    );
};

export default ShowRecipeDetails;
