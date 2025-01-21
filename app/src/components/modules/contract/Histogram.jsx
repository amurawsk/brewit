import React, { useState, useEffect } from 'react';
import api from '../../../api.js';
import styles from './Histogram.module.css';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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

const Histogram = ({ status }) => {
    const beerTypes = {};
    let chartData = {};
    let chartTitle = '';

	const [orders, setOrders] = useState([]);

    const getData = async () => {
        try {
            const response = await api.get(
                `orders/contract/status/P/`
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

    filteredOrders.forEach((order) => {
        const beerType = order.beer_type;
        if (!beerTypes[beerType]) {
            beerTypes[beerType] = { volume: 0, batches: 0 };
        }

        if (status === 'TQ') {
            beerTypes[beerType].volume += order.beer_volume;
        } else if (status === 'QD') {
            beerTypes[beerType].batches += 1;
        }
    });

    if (status === 'TQ') {
        const labels = Object.keys(beerTypes);
        const datasetData = Object.values(beerTypes).map((beer) => beer.volume);

        const backgroundColors = colorPalette.slice(0, labels.length);

        chartTitle = 'Ilość wyprodukowanego piwa';
        chartData = {
            labels: labels,
            datasets: [
                {
                    data: datasetData,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map((color) => color),
                    borderWidth: 1,
                },
            ],
        };
    } else if (status === 'QD') {
        const groupedByDate = {};

        filteredOrders.forEach((order) => {
            const endedDate = new Date(order.ended_at);
            const dateKey = endedDate.toISOString().split('T')[0];

            if (!groupedByDate[dateKey]) {
                groupedByDate[dateKey] = 0;
            }

            groupedByDate[dateKey] += order.beer_volume;
        });

        const labels = Object.keys(groupedByDate);
        const datasetData = Object.values(groupedByDate);

        const backgroundColors = colorPalette.slice(0, labels.length);

        chartTitle = 'Dzienna objętość wyprodukowanego piwa';
        chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Objętość piwa (litry)',
                    data: datasetData,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map((color) => color),
                    borderWidth: 1,
                },
            ],
        };
    } else if (status === 'QM') {
        const groupedByMonth = {};

        filteredOrders.forEach((order) => {
            const endedDate = new Date(order.ended_at);
            const monthKey = `${endedDate.getFullYear()}-${(endedDate.getMonth() + 1).toString().padStart(2, '0')}`;

            if (!groupedByMonth[monthKey]) {
                groupedByMonth[monthKey] = 0;
            }

            groupedByMonth[monthKey] += order.beer_volume;
        });

        const labels = Object.keys(groupedByMonth);
        const datasetData = Object.values(groupedByMonth);

        const backgroundColors = colorPalette.slice(0, labels.length);

        chartTitle = 'Miesięczna objętość wyprodukowanego piwa';
        chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Objętość piwa (litry)',
                    data: datasetData,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map((color) => color),
                    borderWidth: 1,
                },
            ],
        };
    } else if (status === 'QY') {
        const groupedByYear = {};

        filteredOrders.forEach((order) => {
            const endedDate = new Date(order.ended_at);
            const yearKey = endedDate.getFullYear().toString();

            if (!groupedByYear[yearKey]) {
                groupedByYear[yearKey] = 0;
            }

            groupedByYear[yearKey] += order.beer_volume;
        });

        const labels = Object.keys(groupedByYear);
        const datasetData = Object.values(groupedByYear);

        const backgroundColors = colorPalette.slice(0, labels.length);

        chartTitle = 'Roczna objętość wyprodukowanego piwa';
        chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Objętość piwa (litry)',
                    data: datasetData,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map((color) => color),
                    borderWidth: 1,
                },
            ],
        };
    }

    return (
        <div className={styles.pieChartContainer}>
            <h2>{chartTitle}</h2>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        title: { display: false, text: chartTitle },
                    },
                }}
            />
        </div>
    );
};

export default Histogram;
