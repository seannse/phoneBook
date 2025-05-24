import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix';

import { addContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/selectors';
import { setIsModalAddContactOpen } from '../../redux/global/slice';
import css from '../../styles/forms.module.css';

const FormAddContacts = () => {
  const [newContact, setNewContact] = useState({
    name: '',
    number: '',
  });
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  useEffect(() => {}, [contacts]);

  const handleChange = event => {
    const { name, value } = event.target;

    setNewContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { name, number } = newContact;
    const validName = name.trim();
    const validNumber = number.trim();

    if (validName === '' || validNumber === '') {
      setNewContact({
        name: '',
        number: '',
      });
      return Notify.info('Please fill in all fields!');
    }

    if (
      contacts.some(
        contact => contact.name.toLowerCase() === validName.toLowerCase()
      )
    ) {
      return Notify.failure(`${name} is already in contacts!`);
    }

    if (contacts.some(contact => contact.number === validNumber)) {
      return Notify.failure(`${number} is already in contacts!`);
    }

    const finalContact = {
      name: validName,
      number: validNumber,
    };

    dispatch(addContact(finalContact));

    setNewContact({
      name: '',
      number: '',
    });
    dispatch(setIsModalAddContactOpen());
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        <input
          className={css.input}
          type="text"
          name="name"
          value={newContact.name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer."
          placeholder="Name"
          minLength="2"
          maxLength="25"
          required
        />
      </label>
      <label className={css.label}>
        <input
          className={css.input}
          type="tel"
          name="number"
          value={newContact.number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          placeholder="Number"
          minLength="7"
          maxLength="19"
          required
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};

export default FormAddContacts;
