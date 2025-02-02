import React from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

import styles from './TimeSlotsDateNavigator.module.css';

/**
 * TimeSlotDateNavigator - allows to choose day / week to get only proper timeslots
 * @param view - 'daily' or 'weekly' view
 * @param setView - setter for view
 * @param selectedDate - current chosen date (by user)
 * @param setSelectedDate - setter for selectedDate
 * @param startHour - for 'hour' view user can determine timetable start hour
 * @param endHour - for 'hour' view user can determine timetable end hour
 * @param setStartHour - setter for start hour
 * @param setEndHour - setter for end hour
 */
const TimeSlotsDateNavigator = ({
    view,
    setView,
    selectedDate,
    setSelectedDate,
    startHour,
    endHour,
    setStartHour,
    setEndHour,
}) => {
    const formatDate = (date) => {
        return date.toLocaleDateString('pl-PL');
    };

    const handleToday = () => {
        setSelectedDate(new Date());
    };

    const handleDailyView = () => {
        setView('daily');
    };

    const handleWeeklyView = () => {
        setView('weekly');
    };

    const handleStartHourChange = (event) => {
        const newStartHour = parseInt(event.target.value, 10);
        if (newStartHour < endHour) {
            setStartHour(newStartHour);
        } else {
            setStartHour(newStartHour);
            setEndHour(newStartHour + 1);
        }
    };

    const handleEndHourChange = (event) => {
        const newEndHour = parseInt(event.target.value, 10);
        if (newEndHour > startHour) {
            setEndHour(newEndHour);
        }
    };

    const startOfWeek = (date) => {
        const day = date.getDay(),
            diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    const endOfWeek = (startDate) => {
        const endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        return endDate;
    };

    const formatWeekRange = (date) => {
        const startDate = startOfWeek(date);
        const endDate = endOfWeek(startDate);
        return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    };

    const isTodayActive = () => {
        const today = new Date();
        if (view === 'daily') {
            return selectedDate.toDateString() === today.toDateString();
        }
        if (view === 'weekly') {
            const start = startOfWeek(selectedDate);
            const end = endOfWeek(start);
            return today >= start && today <= end;
        }
        return false;
    };

    const handlePrevDate = () => {
        const userType = localStorage.getItem('userType');
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (userType === 'contract_brewery') {
            if (view === 'daily') {
                const prevDate = new Date(selectedDate);
                prevDate.setDate(prevDate.getDate() - 1);

                if (prevDate >= today) {
                    setSelectedDate(prevDate);
                }
            } else if (view === 'weekly') {
                const startDate = startOfWeek(new Date(selectedDate));
                const prevWeek = new Date(startDate);
                prevWeek.setDate(startDate.getDate() - 7);

                if (prevWeek >= today) {
                    setSelectedDate(prevWeek);
                }
            }
        } else {
            if (view === 'daily') {
                setSelectedDate(
                    new Date(selectedDate.setDate(selectedDate.getDate() - 1))
                );
            } else if (view === 'weekly') {
                const startDate = startOfWeek(new Date(selectedDate));
                setSelectedDate(
                    new Date(startDate.setDate(startDate.getDate() - 7))
                );
            }
        }
    };

    const handleNextDate = () => {
        if (view === 'daily') {
            setSelectedDate(
                new Date(selectedDate.setDate(selectedDate.getDate() + 1))
            );
        } else if (view === 'weekly') {
            const startDate = startOfWeek(new Date(selectedDate));
            setSelectedDate(
                new Date(startDate.setDate(startDate.getDate() + 7))
            );
        }
    };

    return (
        <div className={styles.dateNavigator}>
            <button className={styles.arrowButton} onClick={handlePrevDate}>
                <AiOutlineLeft />
            </button>
            <span className={styles.selectedDate}>
                {view === 'daily'
                    ? formatDate(selectedDate)
                    : formatWeekRange(selectedDate)}
            </span>
            <button className={styles.arrowButton} onClick={handleNextDate}>
                <AiOutlineRight />
            </button>
            {view === 'daily' && (
                <div className={styles.hourSelector}>
                    <label className={styles.hourSelectorLabel}>
                        Od:
                        <select
                            className={styles.hourSelectorSelect}
                            value={startHour}
                            onChange={handleStartHourChange}>
                            {Array.from({ length: 24 }, (_, i) => (
                                <option key={i} value={i}>
                                    {i}:00
                                </option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.hourSelectorLabel}>
                        Do:
                        <select
                            className={styles.hourSelectorSelect}
                            value={endHour}
                            onChange={handleEndHourChange}>
                            {Array.from({ length: 23 }, (_, i) => (
                                <option
                                    key={i + 1}
                                    value={i + 1}
                                    disabled={i + 1 <= startHour}>
                                    {i + 1}:00
                                </option>
                            ))}
                            <option key={24} value={24}>
                                23:59
                            </option>
                        </select>
                    </label>
                </div>
            )}

            <div className={styles.spacer}></div>
            <span
                onClick={handleToday}
                className={isTodayActive() ? styles.active : styles.notActive}>
                Dziś
            </span>
            <div className={styles.separator}></div>
            <span
                onClick={handleDailyView}
                className={view === 'daily' ? styles.active : styles.notActive}>
                Widok dzienny
            </span>
            <span
                onClick={handleWeeklyView}
                className={
                    view === 'weekly' ? styles.active : styles.notActive
                }>
                Widok tygodniowy
            </span>
        </div>
    );
};
export default TimeSlotsDateNavigator;
