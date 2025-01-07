import React, { useState } from 'react';
import styles from './ShowRecipeDetails.module.css';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import ConfirmModal from '../../utils/ConfirmModal';
import Notification from '../../utils/Notification.jsx';

const ShowRecipeDetails = ({
    isPanelOpen,
    setIsPanelOpen,
    recipe,
    setRecipe,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [action, setAction] = useState(null);
    const [isNotificationVisible, setIsNotificationVisible] = useState(false);

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

    const handleAction = (actionType) => {
        setAction(actionType);
        setIsModalOpen(true);
    };

    const confirmAction = () => {
        if (action === 'cancel') {
            console.log('Zlecenie anulowane', recipe.id);
        } else if (action === 'reject') {
            console.log('Zlecenie odrzucone', recipe.id);
        } else if (action === 'accept') {
            console.log('Zlecenie zaakceptowane', recipe.id);
        }
        setIsModalOpen(false);
        closePanel();
        showNotification();
    };

    const cancelAction = () => {
        setIsModalOpen(false);
    };

    const orders = [
        {
            id: 1,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'ABC',
            beer_volume: 120,
            status: 'C',
            contract_brewery_name: 'TwojePiwoPL',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: null,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2025-01-01T08:00:00.000Z',
                    end_timestamp: '2025-01-01T10:00:00.000Z',
                    device_name: 'Maszyna A',
                    device_serial_number: 'SN-001',
                },
                {
                    start_timestamp: '2025-01-01T10:30:00.000Z',
                    end_timestamp: '2025-01-01T12:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-01T10:30:00.000Z',
                    end_timestamp: '2025-01-01T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-02T10:30:00.000Z',
                    end_timestamp: '2025-01-02T12:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-03T10:30:00.000Z',
                    end_timestamp: '2025-01-03T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-04T10:30:00.000Z',
                    end_timestamp: '2025-01-04T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-04T10:30:00.000Z',
                    end_timestamp: '2025-01-04T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-04T10:30:00.000Z',
                    end_timestamp: '2025-01-04T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-01-04T10:30:00.000Z',
                    end_timestamp: '2025-01-04T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
                {
                    start_timestamp: '2025-03-04T10:00:00.000Z',
                    end_timestamp: '2025-03-04T19:00:00.000Z',
                    device_name: 'Maszyna B',
                    device_serial_number: 'SN-002',
                },
            ],
        },
        {
            id: 2,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'DEF',
            beer_volume: 120,
            status: 'P',
            contract_brewery_name: 'BeerCompany123',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: true,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2024-01-02T09:00:00.000Z',
                    end_timestamp: '2024-01-02T11:00:00.000Z',
                    device_name: 'Maszyna X',
                    device_serial_number: 'SN-003',
                },
            ],
        },
        {
            id: 3,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'DEF',
            beer_volume: 120,
            status: 'P',
            contract_brewery_name: 'CosTamCosTam',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: false,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2024-01-03T07:00:00.000Z',
                    end_timestamp: '2024-01-03T09:30:00.000Z',
                    device_name: 'Maszyna Y',
                    device_serial_number: 'SN-004',
                },
            ],
        },
        {
            id: 13,
            created_at: '2024-01-01T10:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'GHJ',
            beer_volume: 120,
            status: 'N',
            contract_brewery_name: 'Januszex',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: null,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2026-01-04T08:00:00.000Z',
                    end_timestamp: '2026-01-04T10:30:00.000Z',
                    device_name: 'Maszyna Z',
                    device_serial_number: 'SN-005',
                },
            ],
        },
        {
            id: 16,
            created_at: '2024-01-01T09:00:00.000Z',
            ended_at: '2024-01-01T10:00:00.000Z',
            beer_type: 'ANDK',
            beer_volume: 120,
            status: 'R',
            contract_brewery_name: '2137',
            contract_brewery_owner_name: 'Jan Kowalski',
            contract_brewery_email: 'example@gmail.com',
            contract_brewery_phone_number: '123456789',
            rate: null,
            price: 500,
            timeslots: [
                {
                    start_timestamp: '2024-01-05T10:00:00.000Z',
                    end_timestamp: '2024-01-05T12:00:00.000Z',
                    device_name: 'Maszyna W',
                    device_serial_number: 'SN-006',
                },
                {
                    start_timestamp: '2024-01-05T12:30:00.000Z',
                    end_timestamp: '2024-01-05T14:00:00.000Z',
                    device_name: 'Maszyna V',
                    device_serial_number: 'SN-007',
                },
            ],
        },
    ];

    return (
        <div>
            {isPanelOpen && recipe && (
                <div className={styles.overlay}>
                    <div className={styles.panel}>
                        <div className={styles.header}>
                            <div className={styles.left}>
                                Przepis #{recipe.id}
                            </div>
                        </div>

                        <div className={styles.details}>
                            <div className={styles.detailBox}>
                                <h3>Szczegóły przepisu</h3>
                                <p>Nazwa przepisu: {recipe.name}</p>
                                <p>Całkowity czas: {recipe.full_time}</p>
                                <p>Całkowita objętość: {recipe.full_volume}</p>
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
                                            <p>Typ urządzenia: {step.device}</p>
                                            <p>Czas: {step.time}</p>
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
                        <div className={styles.currentOrderButtonGroup}>
                            <button
                                onClick={() => handleAction('cancel')}
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
