import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import styles from './Phonebook.module.css';

const Phonebook = () => {
    const initialContacts = [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];

    const [contacts, setContacts] = useState(() => {
        const persistedContacts = localStorage.getItem('contacts');
        return persistedContacts ? JSON.parse(persistedContacts) : initialContacts;
    });
    const [filter, setFilter] = useState('');

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const addContact = ({ name, number }) => {
        const contact = {
            id: nanoid(),
            name,
            number,
        };

        if (contacts.some(c => c.name === name)) {
            alert(`${name} is already in your contacts.`);
            return;
        }

        setContacts([contact, ...contacts]);
    };

    const removeContact = contactId => {
        setContacts(contacts.filter(contact => contact.id !== contactId));
    };

    const changeFilter = newFilter => {
        setFilter(newFilter);
    };

    const getVisibleContacts = () => {
        const normalizedFilter = filter.toLowerCase();

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter)
        );
    };

    const visibleContacts = getVisibleContacts();

    return (
        <div className={styles.container}>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={addContact} />

            <h2>Contacts</h2>
            <p>Find contacts by name</p>
            <Filter value={filter} onChange={changeFilter} />
            <ContactList contacts={visibleContacts} onRemove={removeContact} />
        </div>
    );
}

export default Phonebook;

