import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setHours, setMinutes, isToday } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import pl from 'date-fns/locale/pl';

import LoadingOverlay from '../../utils/LoadingOverlay.jsx';

import styles from './AddTimeSlotForm.module.css';

import api from '../../../api.js';

registerLocale('pl', pl);

/**
 * AddDeviceForm - gets timeslot start- and end-timestamp from user, picked from day calendar or hour calendar (depends on device_type), on submit sends request to api
 */
const AddTimeSlotForm = () => {
    const navigate = useNavigate();

    const [selectedDevice, setSelectedDevice] = useState(null);
    const [devices, setDevices] = useState([]);
    const [formState, setFormState] = useState({
        device: '',
        price: '',
        dateRange: [null, null],
        timeRange: [null, null],
        specificDate: null,
    });
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            try {
                const breweryId = localStorage.getItem('breweryId');
                const response = await api.get(`devices/brewery/${breweryId}/`);
                if (response.status === 200) {
                    setIsLoading(false);
                    setDevices(response.data);
                } else {
                    setIsLoading(false);
                    alert(
                        'Błąd podczas pobierania urządzeń! Odśwież stronę i spróbuj ponownie.'
                    );
                }
            } catch (error) {
                setIsLoading(false);
                alert('Błąd sieci! Odśwież stronę i spróbuj ponownie.');
            }
        };
        getData();
    }, []);

    const postData = async () => {
        try {
            setIsLoading(true);
            let response;
            const id = selectedDevice.id;

            if (
                formState.dateRange &&
                formState.dateRange[0] !== null &&
                formState.dateRange[1] !== null
            ) {
                formState.dateRange[1].setHours(23, 59, 59);
                formState.dateRange[1].setHours(
                    formState.dateRange[1].getHours() + 24
                );
                response = await api.post(`devices/${id}/time-slots/add/`, {
                    status: 'F',
                    slot_type: 'D',
                    price: formState.price,
                    start_timestamp: formState.dateRange[0],
                    end_timestamp: formState.dateRange[1],
                    device: parseInt(id),
                });
            } else if (
                formState.timeRange &&
                formState.timeRange[0] !== null &&
                formState.timeRange[1] !== null
            ) {
                response = await api.post(`devices/${id}/time-slots/add/`, {
                    status: 'F',
                    slot_type: 'H',
                    price: formState.price,
                    start_timestamp: formState.timeRange[0],
                    end_timestamp: formState.timeRange[1],
                    device: parseInt(id),
                });
            }
            if (response.status === 201) {
                setIsLoading(false);
                navigate('/commercial/time_slots');
            } else {
                setIsLoading(false);
                alert('Dodawanie okna czasowego się nie powiodło!');
            }
        } catch (error) {
            setIsLoading(false);
            alert('Dodawanie okna czasowego się nie powiodło');
        }
    };

    const handleInputChange = (e) => {
        const id = e.target.value;
        const device = devices.find(
            (item) => item.id.toString() === id.toString()
        );
        setSelectedDevice(device);
        setFormState((prevState) => ({
            ...prevState,
            device: id,
            price: '',
            timeRange: [null, null],
            dateRange: [null, null],
            specificDate: null,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        postData();
    };

    const handlePriceChange = (e) => {
        setFormState((prevState) => ({
            ...prevState,
            price: e.target.value,
        }));
    };

    const getPriceLabel = () => {
        if (!selectedDevice) return 'Podaj cenę';
        const { device_type } = selectedDevice;
        return device_type === 'AC' || device_type === 'FT'
            ? 'Podaj cenę (za dzień)'
            : 'Podaj cenę (za godzinę)';
    };
    const getMinDate = () => {
        return new Date();
    };

    const getMinTime = () => {
        if (formState.specificDate && isToday(formState.specificDate)) {
            const now = new Date();
            now.setMinutes(0, 0, 0);
            now.setHours(now.getHours() + 1);
            return now;
        }
        return setHours(setMinutes(formState.specificDate, 0), 0);
    };

    const getMaxTime = () => {
        const now = new Date();
        now.setHours(23, 59, 59, 0);
        return now;
    };

    const handleDateChange = (update) => {
        setFormState((prevState) => ({
            ...prevState,
            dateRange: update,
            timeRange: [null, null],
            specificDate: null,
        }));
    };

    const handleSpecificDateChange = (date) => {
        setFormState((prevState) => ({
            ...prevState,
            specificDate: date,
            dateRange: [null, null],
            timeRange: [null, null],
        }));
    };

    const handleTimeChange = (time, index) => {
        setFormState((prevState) => {
            const updatedTimeRange = [...prevState.timeRange];
            updatedTimeRange[index] = time;

            if (
                index === 0 &&
                updatedTimeRange[1] &&
                updatedTimeRange[1] <= time
            ) {
                updatedTimeRange[1] = null;
            }

            if (prevState.specificDate) {
                const combinedDateTime = new Date(prevState.specificDate);
                const minutes = time.getMinutes();
                if (minutes === 59) {
                    combinedDateTime.setHours(time.getHours() + 1);
                    combinedDateTime.setMinutes(0);
                } else {
                    combinedDateTime.setHours(time.getHours());
                    combinedDateTime.setMinutes(minutes);
                }
                updatedTimeRange[index] = combinedDateTime;
            }

            const updatedFormState = {
                ...prevState,
                timeRange: updatedTimeRange,
                dateRange: [null, null],
            };

            return updatedFormState;
        });
    };

    const renderPicker = () => {
        if (!selectedDevice) return null;

        const { device_type } = selectedDevice;

        if (device_type === 'FT' || device_type === 'AC') {
            return (
                <div className={styles.addTimeSlotForm}>
                    <label className={styles.formLabel}>
                        <b>Wybierz daty dostępności</b>
                    </label>
                    <DatePicker
                        className={styles.addTimeSlotInput}
                        selectsRange
                        startDate={formState.dateRange[0]}
                        endDate={formState.dateRange[1]}
                        onChange={(update) => handleDateChange(update)}
                        isClearable
                        placeholderText="Wybierz zakres dat"
                        locale="pl"
                        dateFormat="dd.MM.yyyy"
                        minDate={getMinDate()}
                        required
                    />
                </div>
            );
        } else if (device_type === 'BT' || device_type === 'BE') {
            return (
                <div className={styles.addTimeSlotForm}>
                    <label className={styles.formLabel}>
                        <b>Wybierz godziny dostępności</b>
                    </label>
                    <DatePicker
                        className={styles.addTimeSlotInput}
                        selected={formState.specificDate}
                        onChange={handleSpecificDateChange}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="Wybierz dzień"
                        locale="pl"
                        minDate={getMinDate()}
                        required
                    />

                    <DatePicker
                        className={styles.addTimeSlotInput}
                        selected={formState.timeRange[0]}
                        onChange={(time) => handleTimeChange(time, 0)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        timeCaption="Początek"
                        dateFormat="HH:mm"
                        placeholderText="Wybierz godzinę początkową"
                        locale="pl"
                        minTime={getMinTime()}
                        maxTime={getMaxTime()}
                        disabled={!formState.specificDate}
                        required
                    />
                    <DatePicker
                        className={styles.timepickerMaxTime}
                        selected={formState.timeRange[1]}
                        onChange={(time) => handleTimeChange(time, 1)}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={60}
                        injectTimes={[setHours(setMinutes(new Date(), 59), 23)]}
                        timeCaption="Koniec"
                        dateFormat="HH:mm"
                        placeholderText="Wybierz godzinę końcową"
                        locale="pl"
                        minTime={
                            formState.timeRange[0]
                                ? new Date(
                                      formState.timeRange[0].getTime() +
                                          60 * 1000
                                  )
                                : getMinTime()
                        }
                        maxTime={getMaxTime()}
                        disabled={
                            !formState.specificDate || !formState.timeRange[0]
                        }
                        required
                    />
                </div>
            );
        }

        return null;
    };

    return (
        <div>
            <LoadingOverlay isLoading={isLoading} />
            <form onSubmit={handleSubmit} className={styles.addTimeSlotForm}>
                <label className={styles.formLabel}>
                    <b>Wybierz urządzenie</b>
                </label>
                <select
                    className={styles.dropboxInput}
                    value={formState.device}
                    onChange={handleInputChange}>
                    <option value="" disabled>
                        Wybierz urządzenie
                    </option>
                    {devices.map((device) => (
                        <option key={device.id} value={device.id}>
                            {' '}
                            {device.name + ' - ' + device.serial_number}{' '}
                        </option>
                    ))}
                </select>
                {selectedDevice && (
                    <div>
                        <label className={styles.formLabel}>
                            <b>{getPriceLabel()}</b>
                        </label>
                        <input
                            className={styles.addTimeSlotInput}
                            type="number"
                            value={formState.price}
                            onChange={handlePriceChange}
                            placeholder="Wpisz cenę (w zł)"
                            required
                        />
                    </div>
                )}
                {renderPicker()}
                <button className={styles.insertTimeSlotButton} type="submit">
                    Dodaj okno czasowe
                </button>
            </form>
        </div>
    );
};

export default AddTimeSlotForm;
