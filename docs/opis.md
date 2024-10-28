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

Po zakończeniu współpracy między tymi podmiotami, oba zaznaczają zakończenie współpracy w systemie. Powoduje to oznaczenie zlecenia jako wykonane. 

W aplikacji planowane jest zrealizowanie również operacji wspomagających ten cel \- wyświetlanie urządzeń, okien czasowych, szczegółów konkretnych browarów kontraktowych i komercyjnych i innych (wszystkie opisane w niniejszym dokumencie, w sekcji wymagania systemowe)

### Typy urządzeń wraz z parametrami

- Tanki warzelne (z zacieraniem):  
	- pojemność  
	- zakres temperatur  
	- przeznaczony do piw kwaśnych (tak/ nie)  
- Pojemniki fermentacyjne:  
	- pojemność  
	- zakres temperatury (inny dla dolnej i górnej fermentacji)  
	- przeznaczony do piw kwaśnych (tak/ nie)  
- Kotły do leżakowania:  
	- pojemność  
	- zakres temperatury (inny dla dolnej i górnej fermentacji)  
	- przeznaczony do piw kwaśnych (tak/ nie)  
	- możliwość sztucznej karbonizacji
- Urządzenia do rozlewania:  
	- obsługiwane pojemniki (butelki, puszki, kegi)  
	- przeznaczony do piw kwaśnych (tak/ nie)  
	- możliwość sztucznej karbonizacji

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
- czas rozpoczęcia  
- czas zakończenia  
- wynajmowane urządzenia  
- dane browaru kontraktowego  
- dane browaru komercyjnego  
- dodatkowe informacje

## Wymagania

### Wymagania użytkownika dla browaru kontraktowego

- założenie konta  
- logowanie, wylogowywanie z konta  
- wyświetlanie listy browarów komercyjnych   
- wyświetlanie okien czasowych na dane urządzenia dla konkretnego browaru komercyjnego\*\*\*  
- wyświetlanie szczegółów wybranego browaru komercyjnego  
- modyfikowanie (dodawanie, usuwanie) zawartości "koszyka" (okien czasowych na urządzenia)\*  
- utworzenie zlecenia na podstawie wybranych okien czasowych  
- przeglądanie listy swoich zleceń nowych\*\*, aktualnych\*\*, przeszłych\*\*, odrzuconych \*\*  
- przeglądanie szczegółów konkretnego zlecenia z listy (wszystkich elementów zlecenia)

\* \- w koszyku mogą znajdować się urządzenia jedynie od tego samego browaru komercyjnego

\*\* \- stany zlecenia zostały wypisane w informacjach ogólnych

\*\*\* \- okna czasowe są oznaczone w wyraźny sposób jako wolne / zarezerwowane / zajęte / niedostępne (zgodnie z możliwymi stanami)

### Wymagania użytkownika dla browaru komercyjnego

- założenie konta  
- logowanie, wylogowywanie z konta  
- dodawanie, przeglądanie, usuwanie\* swoich urządzeń (zgodnie z podanymi typami urządzeń) wraz z odpowiednimi parametrami  
- dodawanie, przeglądanie, usuwanie\* dostępnych okien czasowych na swoje urządzenia  
- przeglądanie nowych\*\*, aktualnych\*\*, przeszłych\*\*, odrzuconych \*\* zleceń związanych ze swoimi urządzeniami  
- przeglądanie szczegółów konkretnego zlecenia z listy (statusu; urządzeń, które były w nim wykorzystywane; danych dotyczących stron)  
- wyświetlanie szczegółów danego browaru kontraktowego  
- zmiana statusu zlecenia na aktualne\*\*, odrzucone \*\*  
- wyświetlanie listy zajętych okien czasowych na urządzenia wraz z tymi urządzeniami\*\*\*

\* \- usuwanie (dla urządzeń) jest możliwe tylko gdy dla danego urządzenia nie ma żadnych aktualnych / przyszłych zleceń; (dla okien czasowych) możliwe gdy to okno nie jest zarezerwowane / zajęte

\*\* \- stany zlecenia zostały wypisane w informacjach ogólnych

\*\*\* \-  na podstawie których browar komercyjny, we własnym zakresie, może stworzyć fizyczne przepustki lub listy kontrolne dla pracowników, aby kontrolować uprawnienia do dostępu do konkretnych maszyn

### Wymagania użytkownika dla spółki (pośrednika)

- logowanie, wylogowywanie z konta  
- wyświetlanie okien czasowych na dane urządzenia dla konkretnego browaru komercyjnego\*  
- wyświetlanie listy zleceń dla danego browaru komercyjnego  
- wyświetlanie listy zleceń dla danego browaru kontraktowego  
- wyświetlanie szczegółów wybranego browaru komercyjnego  
- wyświetlanie szczegółów danego browaru kontraktowego

\* \- okna czasowe są oznaczone w wyraźny sposób jako wolne / zarezerwowane / zajęte / niedostępne (zgodnie z możliwymi stanami)

### Wymagania systemowe (funkcjonalności aplikacji)

- założenie konta browaru kontraktowego  
- założenie konta browaru komercyjnego  
- zalogowanie / wylogowanie z konta browaru kontraktowego  
- zalogowanie / wylogowanie z konta browaru komercyjnego  
- zalogowanie / wylogowanie z konta pośrednika  
- wyświetlenie listy browarów komercyjnych  
- wyświetlanie okien czasowych dla urządzeń danego browaru komercyjnego  
- wyświetlanie szczegółów danego browaru komercyjnego  
- wyświetlanie szczegółów danego browaru kontraktowego  
- dodawanie okna czasowego do koszyka  
- sprawdzenie warunku, że okna czasowe w koszyku są w tym samym browarze kontraktowym  
- usunięcie okna czasowego z koszyka  
- utworzenie zlecenia z oknami czasowymi z koszyka  
- przeglądanie listy zleceń (z podziałem wszystkie / nowe / aktualne / przeszłe / odrzucone) dla danego browaru kontraktowego  
- przeglądanie listy zleceń (z podziałem wszystkie / nowe / aktualne / przeszłe / odrzucone) dla danego browaru komercyjnego  
- przeglądanie szczegółów konkretnego zlecenia  
- zmiana statusu zlecenia (według reguł opisanych w wymaganiach użytkownika)  
- dodawanie urządzeń do browaru komercyjnego (z odpowiednimi parametrami)  
- wyświetlanie listy urządzeń dla danego browaru komercyjnego  
- usuwanie urządzeń dla browaru komercyjnego (z ograniczeniami wypisanymi w wymaganiach)  
- dodawanie okien czasowych na dane urządzenie w browarze kontraktowym  
- wyświetlanie listy urządzeń wraz z ich zajętymi oknami czasowymi
