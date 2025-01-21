import React, { useState, useEffect } from 'react';
import api from '../../../api.js';
import styles from './PieChart.module.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

const colorPalette = [
    '#FFC107',
    '#FF5722',
    '#FF7043',
    '#D7B68A',
    '#FFCC80',
    '#6D4C41',
    '#FFB300',
    '#FF4500',
    '#F57C00',
    '#FF9E80',
    '#FFD54F',
    '#FF7043',
    '#FFA000',
    '#BF360C',
    '#FFD180',
    '#FFE082',
    '#FF6F00',
    '#FF9100',
    '#FB8C00',
    '#F4511E',
    '#795548',
    '#FFEB3B',
    '#FF9800',
];

const PieChart = ({ status }) => {
    let chartData = {};
    let chartTitle = '';


	const [orders, setOrders] = useState([]);

    const getData = async () => {
        try {
            const response = await api.get(
                `orders/commercial/status/P/`
            );
            if (response.status === 200) {
				console.log(response);
                setOrders(response.data);
            } else {
                alert(
                    'Błąd podczas pobierania zleceń! Odśwież stronę i spróbuj ponownie.'
                );
            }
        } catch (error) {
            alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
        }
    };

	useEffect(() => {
		getData();
	}, []);

    const filteredOrders = orders.filter((order) => order.status === 'P');

    if (status === 'R') {
        chartTitle = 'Liczba udanych i nieudanych warek';
        const successful = filteredOrders.filter(
            (order) => order.rate === true
        ).length;
        const unsuccessful = filteredOrders.filter(
            (order) => order.rate === false
        ).length;

        chartData = {
            labels: ['Udane', 'Nieudane'],
            datasets: [
                {
                    data: [successful, unsuccessful],
                    backgroundColor: ['#4caf50', '#f44336'],
                },
            ],
        };
    } else if (status === 'TB') {
        const beerTypes = filteredOrders.reduce((acc, order) => {
            acc[order.beer_type] = (acc[order.beer_type] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(beerTypes);
        const datasetData = Object.values(beerTypes);

        chartTitle = 'Liczba warek dla każdego typu piwa';
        chartData = {
            labels: labels,
            datasets: [
                {
                    data: datasetData,
                    backgroundColor: colorPalette,
                },
            ],
        };
    }

    return (
        <div className={styles.pieChartContainer}>
            <h2>{chartTitle}</h2>
            <Pie data={chartData} />
        </div>
    );
};

export default PieChart;
