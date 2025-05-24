import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import ContactItem from './ContactItem';
import { selectFilteredContacts } from '../../redux/selectors';

import css from './Contacts.module.css';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <AnimatePresence mode="popLayout">
      <ul className={css.contact_list}>
        {filteredContacts.map(({ id, name, number }, idx) => {
          return (
            <ContactItem
              key={id}
              id={id}
              name={name}
              number={number}
              idx={idx}
            />
          );
        })}
      </ul>
    </AnimatePresence>
  );
};

export default ContactList;
