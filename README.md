Task results:

# Otrzymujemy i wyprowadzamy całą listę kontaktów w postaci tabeli (console.table)

node index.js --action list

<img src="./printscreens/ListContacts.jpg" alt="Contacts List">

# Otrzymujemy kontakt po id

node index.js --action get --id 05olLMgyVQdWRwgKfg5J6

<img src="./printscreens/GetContactByID.jpg" alt="Get contact by id">

# Dodajemy kontakt

node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

<img src="./printscreens/AddContact.jpg" alt="Add contact">

# Usuwamy kontakt

node index.js --action remove --id qdggE76Jtbfd9eWJHrssH

<img src="./printscreens/RemoveContact.jpg" alt="Remove contact">
