import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Phonebook.module.css';

const ContactForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleInputChange = event => {
        const { name, value } = event.target;

        if (name === "name") {
            setName(value);
        } else if (name === "number") {
            setNumber(value);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        onSubmit({ name, number });
        setName('');
        setNumber('');
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.label}>
                Name
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleInputChange}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces."
                    required
                />
            </label>

            <label className={styles.label}>
                Number
                <input
                    className={styles.input}
                    type="tel"
                    name="number"
                    value={number}
                    onChange={handleInputChange}
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                />
            </label>

            <button className={styles.button} type="submit">
                Add Contact
            </button>
        </form>
    );
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;

