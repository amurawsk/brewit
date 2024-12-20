import React from 'react';
import NavigationBar from '../modules/NavigationBar.js';
import Footer from '../modules/Footer.js';

function Manual() {
    return (
        <div className="manual-page">
            <NavigationBar />
            <div className="homepage">
                <h2>Użytkowanie</h2>
                <p>
                    Aplikacja umożliwia tworzenie zleceń przez browary
                    kontraktowe dla browarów komercyjnych, które ułatwiają
                    istniejący proces biznesowy wynajmowania urządzeń browaru
                    komercyjnego przez browary kontraktowe.
                </p>
                <p>
                    Browar komercyjny dodaje swoje urządzenia, a następnie
                    tworzy w systemie okna czasowe na te urządzenia, które
                    informują o dostępności tych urządzeń w podanym terminie na
                    wynajem ze strony browaru kontraktowego.
                </p>
                <p>
                    Browar kontraktowy przegląda oferty browarów komercyjnych i
                    wybiera odpowiednie dla siebie okna czasowe na konkretne
                    urządzenia (znajdujące się w obrębie jednego browaru
                    komercyjnego). Kiedy doda wszystkie potrzebne sprzęty, może
                    utworzyć zlecenie w systemie, które spowoduje tymczasową
                    rezerwację okien czasowych oraz wyświetlanie zlecenia
                    browarowi komercyjnemu.
                </p>
                <p>
                    Browar komercyjny, po otrzymaniu zlecenia, akceptuje je (co
                    powoduje zmianę statusu okna czasowego), co będzie widoczne
                    dla browaru kontraktowego. Oznacza to przystąpienie obu
                    podmiotów do współpracy.
                </p>
                <p>
                    Po zakończeniu współpracy między tymi podmiotami możliwa
                    jest ocena wykonanej warki przez browar kontraktowy.
                </p>
            </div>
            <Footer />
        </div>
    );
}

export default Manual;
