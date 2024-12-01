# Projekt BrewIT

## Informacje ogólne

### Informacje techniczne

- styl aplikacji: webowa  
- wymagane technologie: baza danych relacyjna  
- język aplikacji: polski  
- wymagania: bezpieczeństwo, dobra baza danych, estetyka UI, wygoda użytkowania

### Stack technologiczny

- backend: Python (Django)  
- frontend: HTML \+ CSS \+ JS/TS (React)  
- baza danych: PostgreSQL  
- konteneryzacja: Docker  
- skrypty: bash  
- automatyczne budowanie i testowanie konfiguracji: GitHub Actions

### Typy użytkowników

- browar kontraktowy  
- browar komercyjny  
- spółka (pośrednik)

### Główny cel i opis działania aplikacji

Aplikacja umożliwia tworzenie zleceń przez browary kontraktowe dla browarów komercyjnych, które ułatwiają istniejący proces biznesowy wynajmowania urządzeń browaru komercyjnego przez browary kontraktowe. 

Browar komercyjny dodaje swoje urządzenia, a następnie tworzy w systemie okna czasowe na te urządzenia, które informują o dostępności tych urządzeń w podanym terminie na wynajem ze strony browaru kontraktowego. 

Browar kontraktowy przegląda oferty browarów komercyjnych i wybiera odpowiednie dla siebie okna czasowe na konkretne urządzenia (znajdujące się w obrębie jednego browaru komercyjnego). Kiedy doda wszystkie potrzebne sprzęty, może utworzyć zlecenie w systemie, które spowoduje tymczasową rezerwację okien czasowych, oraz wyświetlanie zlecenia browarowi komercyjnemu. 

Browar komercyjny, po otrzymaniu zlecenia, akceptuje je (co powoduje zmianę statusu okna czasowego), co będzie widoczne dla browaru komercyjnego. Oznacza to przystąpienie obu podmiotów do współpracy. 

Po zakończeniu współpracy browar kontraktowy może ocenić zlecenie - w formie udane / nieudane. 

W aplikacji planowane jest zrealizowanie również operacji wspomagających ten cel \- wyświetlanie urządzeń, okien czasowych, szczegółów konkretnych browarów kontraktowych i komercyjnych i innych (wszystkie opisane w niniejszym dokumencie, w sekcji wymagań)

### Typy urządzeń wraz z parametrami

- Tanki warzelne (z zacieraniem):  
	- pojemność  
	- zakres temperatur  
	- przeznaczony do piw kwaśnych (tak/ nie)  
	- cena wynajmu  
- Pojemniki fermentacyjne:  
	- pojemność  
	- zakres temperatury (inny dla dolnej i górnej fermentacji)  
	- przeznaczony do piw kwaśnych (tak/ nie)  
	- cena wynajmu
- Kotły do leżakowania:  
- pojemność  
	- zakres temperatury (inny dla dolnej i górnej fermentacji)  
	- przeznaczony do piw kwaśnych (tak/ nie)  
	- możliwość sztucznego nagazowania (CO2, N2, mieszanka CO2/N2, nie)  
	- cena wynajmu  
- Urządzenia do rozlewania:  
	- obsługiwane pojemniki (butelki, puszki, kegi)  
	- przeznaczony do piw kwaśnych (tak/ nie)  
	- możliwość sztucznego nagazowania (CO2, N2, mieszanka CO2/N2, nie)  
	- cena wynajmu

### Statusy okien czasowych na urządzenia

- wolne  
- zarezerwowane (na czas od stworzenia zlecenia przez browar kontraktowy do zaakceptowania przez browar komercyjny)  
- zajęte (po zaakceptowaniu)  
- niedostępne (nieudostępnione w danym terminie)

### Etapy zlecenia

- (nowe) stworzone przez browar kontraktowy (ten status dostaje każde zlecenie, które właśnie zostało utworzone przez browar kontraktowy)  
- (aktualne) zlecenie, które zostało zaakceptowane przez browar komercyjny  
- (przeszłe) zlecenie, które jest już wykonane (czas zakończenia jest w przeszłości), a poprzednio miało stan “aktualne”  
- (odrzucone) zlecenie, które nie zostało zaakceptowane przez browar komercyjny

### Elementy zlecenia

- status  
- czas utworzenia  
- czas zakończenia  
- wynajmowane okna czasowe  
- dane browaru kontraktowego  
- dane browaru komercyjnego
- typ piwa
- wynikowa objętość piwa
- ocena
- dodatkowe informacje (opis)

## Wymagania

### Wymagania browaru komercyjnego:

* Browary komercyjne będą mogły założyć konto  
* Browary komercyjne będą mogły się zalogować i wylogować z konta  
* Browary komercyjne będą mogły dodawać, usuwać i przeglądać swoje urządzenia do systemu  
* Browary komercyjne będą mogły dodawać, modyfikować i przeglądać okna czasowe informujące o dostępności urządzeń (w tym ustawiać jako niedostępne w przypadku awarii)  
* Browary komercyjne będą mogły przeglądać zajęte okna czasowe i urządzenia  
* Browary komercyjne będą mogły przeglądać swoje zlecenia  
* Browary komercyjne będą mogły przeglądać szczegóły zlecenia (statusu; urządzeń, które były w nim wykorzystywane; danych dotyczących stron, typu piwa, docelowej ilości piwa)  
* Browary komercyjne będą mogły wyświetlić szczegóły browaru kontraktowego (nazwa browaru, osoba kontaktowa, kontakt: tel, email, opis)  
* Browary komercyjne będą mogły zmieniać status zlecenia  
* Browary komercyjne będą mogły akceptować lub odrzucać zlecenia

### Wymagania browaru kontraktowego:

* Browary kontraktowe będą mogły założyć konto  
* Browary kontraktowe będą mogły się zalogować i wylogować z konta  
* Browary kontraktowe będą mogły przeglądać browary komercyjne  
* Browary kontraktowe będą mogły przeglądać informacje o browarze komercyjnym (nazwa browaru, właściciel/ osoba kontaktowa, adres, nip, kontakt: tel, email, opis, statystyki)  
* Browary kontraktowe będą mogły przeglądać urządzenia browarów komercyjnych  
* Browary kontraktowe będą mogły przeglądać okna czasowe wynajmu urządzenia browarniczego browaru komercyjnego  
* Browary kontraktowe będą mogły dodawać i usuwać okna czasowe z koszyka  
* Browary kontraktowe będą mogły wyświetlić swój koszyk  
* Browary kontraktowe będą mogły tworzyć zlecenia wynajmu  
* Browary kontraktowe będą mogły przeglądać swoje zlecenia  
* Browary kontraktowe będą mogły przeglądać szczegóły zlecenia  
* Browary kontraktowe będą mogły potwierdzić wykonanie zlecenia  
* Browary kontraktowe będą mogły tworzyć, edytować, usuwać i przeglądać swoje receptury (składniki, ilość, kolejność dodawania, potrzebne urządzenia i czas ich użycia, dodatkowe wymagania, typ piwa, docelowa ilość piwa, ocena (udana, nieudana))  
* Browary kontraktowe będą mogły oceniać wyprodukowane piwo  
* Browary kontraktowe będą mogły wyświetlać statystyki (typy / gatunki produkowanych piw, ilość wyprodukowanego piwa danego typu, ilość wyprodukowanego piwa ogólnie \- histogramy z różną rozdzielczością czasową, liczba udanych / nieudanych warek)

### Wymagania systemowe:

* System umożliwi założenie konta browaru kontraktowego  
* System umożliwi założenie konta browaru komercyjnego  
* System umożliwi zalogowanie / wylogowanie z konta browaru kontraktowego  
* System umożliwi zalogowanie / wylogowanie z konta browaru komercyjnego  
* System umożliwi zalogowanie / wylogowanie z konta pośrednika  
* System umożliwi wyświetlenie listy browarów komercyjnych  
* System umożliwi wyświetlenie listy browarów kontraktowych  
* System umożliwi wyświetlanie okien czasowych dla urządzeń danego browaru komercyjnego  
* System umożliwi wyświetlanie szczegółów danego browaru komercyjnego  
* System umożliwi wyświetlanie szczegółów danego browaru kontraktowego  
* System umożliwi dodawanie okna czasowego do koszyka  
* System umożliwi sprawdzenie warunku, że okna czasowe w koszyku są w tym samym browarze kontraktowym   
* System umożliwi usunięcie okna czasowego z koszyka  
* System umożliwi utworzenie zlecenia z oknami czasowymi z koszyka  
* System umożliwi przeglądanie listy zleceń dla danego browaru kontraktowego  
* System umożliwi przeglądanie listy zleceń dla danego browaru komercyjnego  
* System umożliwi przeglądanie szczegółów konkretnego zlecenia  
* System umożliwi zmianę statusu zlecenia  
* System umożliwi dodawanie urządzeń do browaru komercyjnego  
* System umożliwi wyświetlanie listy urządzeń dla danego browaru komercyjnego  
* System umożliwi usuwanie urządzeń dla browaru komercyjnego  
* System umożliwi dodawanie okien czasowych na dane urządzenie w browarze kontraktowym  
* System umożliwi wyświetlanie listy urządzeń wraz z ich zajętymi oknami czasowymi  
* System umożliwi ocenę piwa browarowi kontraktowemu  
* System umożliwi wyświetlenie koszyka browarowi kontraktowemu
