import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

import ContactItem from './ContactItem';
import {
  selectFilteredContacts,
  selectIsModalDeleteContactOpen,
} from '../../redux/selectors';

import css from './Contacts.module.css';
import { removeContact } from '../../redux/contacts/operations';
import { setIsModalDeleteContactOpen } from '../../redux/global/slice';
import { useState } from 'react';
import { Modal } from '../../components';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);
  console.log(filteredContacts);
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  const isModalDeleteContactOpen = useSelector(selectIsModalDeleteContactOpen);

  const onBtnClick = (id, name) => {
    setData({ id, name });
    dispatch(setIsModalDeleteContactOpen());
  };

  const handleButtonDeleteClick = id => {
    dispatch(removeContact(id));
    dispatch(setIsModalDeleteContactOpen());
  };

  return (
    <>
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
                onBtnClick={onBtnClick}
              />
            );
          })}
        </ul>
      </AnimatePresence>
      <Modal
        title={`Are you sure you want to delete ${data?.name}?`}
        setModalOpen={setIsModalDeleteContactOpen}
        isModalOpen={isModalDeleteContactOpen}
      >
        <button
          type="button"
          onClick={() => {
            handleButtonDeleteClick(data?.id);
          }}
        >
          Delete
        </button>
        <button type="button" onClick={onBtnClick}>
          Cancel
        </button>
      </Modal>
    </>
  );
};

export default ContactList;
