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
	const [timetableData, setTimetableData] = useState([]);

    const getData = async () => {
        try {
            const response = await api.get(
                `orders/commercial/status/P/`
            );
            if (response.status === 200) {
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

	
    const getDeviceData = async () => {
        try {
            const breweryId = localStorage.getItem('breweryId');
            const response = await api.get(
                `devices/brewery/${breweryId}/with-time-slots/`
            );
            if (response.status === 200) {
                setTimetableData(response.data);
            } else {
                alert('Błąd podczas pobierania urządzeń! Odśwież stronę i spróbuj ponownie.');
            }
        } catch (error) {
            alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
        }
    };

	useEffect(() => {
		getData();
		getDeviceData();
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

    if (status === 'D') {
        const filteredDevices = timetableData;
        const groupedByDate = {};

        filteredDevices.forEach(device => {
            device.timeSlots.forEach(slot => {
                if (slot.status === 'F') {
                    const dateKey = slot.start_timestamp.split('T')[0];
                    if (!groupedByDate[dateKey]) {
                        groupedByDate[dateKey] = { BT: 0, FT: 0, AC: 0, BE: 0 };
                    }
                    groupedByDate[dateKey][device.device_type] += 1;
                }
            });
        });

        const labels = Object.keys(groupedByDate);
        const datasetData = Object.values(groupedByDate).map(dateData => [
            dateData.BT,
            dateData.FT,
            dateData.AC,
            dateData.BE
        ]);

        chartTitle = 'Dzienna liczba dostępnych okien czasowych dla urządzeń typu BT, FT, AC, BE';
        chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'BT',
                    data: datasetData.map(data => data[0]),
                    backgroundColor: "#f0a",
                    borderColor: "#f0a",
                    borderWidth: 1,
                },
                {
                    label: 'FT',
                    data: datasetData.map(data => data[1]),
                    backgroundColor: "#0af",
                    borderColor: "#0af",
                    borderWidth: 1,
                },
                {
                    label: 'AC',
                    data: datasetData.map(data => data[2]),
                    backgroundColor: "#fa0",
                    borderColor: "#fa0",
                    borderWidth: 1,
                },
                {
                    label: 'BE',
                    data: datasetData.map(data => data[3]),
                    backgroundColor: "#0fa",
                    borderColor: "#0fa",
                    borderWidth: 1,
                },
            ],
        };
    } else if (status === 'TQ') {
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
