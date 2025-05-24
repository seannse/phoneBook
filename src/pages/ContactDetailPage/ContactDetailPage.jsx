import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoCaretBackCircleSharp } from 'react-icons/io5';

import { getContacts, updateContact } from '../../redux/contacts/operations';
import { selectContacts, selectIsLoggedIn } from '../../redux/selectors';
import { WithAuthRedirect } from '../../components';

import default_avatar from '../../images/default_avatar.png';
import whatsapp from '../../images/whatsapp.png';
import viber from '../../images/viber.png';
import mobile from '../../images/mobile.png';
import comment from '../../images/comment.png';

import css from './ContactDetailPage.module.css';
import styles from '../../styles/forms.module.css';
import { motion } from 'framer-motion';

function ContactDetailPage() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const { contactId } = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const contact = contacts.find(el => el.id === contactId);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(getContacts());
  }, [dispatch, isLoggedIn]);

  const handleButtonEditClick = () => {
    setIsEditing(true);
  };

  const handleEditFormSubmit = e => {
    if (
      contact.name === e.target.name.value &&
      contact.number === e.target.number.value
    ) {
      setIsEditing(false);
      return;
    }

    e.preventDefault();
    const updatedContact = {
      id: contactId,
      name: e.target.name.value,
      number: e.target.number.value,
    };
    dispatch(updateContact(updatedContact));
    setIsEditing(false);
  };
  const backPath = location.state.from ?? '/';
  console.log(backPath);

  return (
    <div className="section">
      <div className="container">
        <motion.div
          className={css.contact_detail}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.6 }}
        >
          {' '}
          {isEditing ? (
            <form className={styles.form} onSubmit={handleEditFormSubmit}>
              <h1 className={css.name}>Edit contact</h1>
              <input
                className={styles.input}
                defaultValue={contact?.name}
                type="text"
                name="name"
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer."
                required
              />
              <input
                className={styles.input}
                defaultValue={contact?.number}
                type="tel"
                name="number"
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
              <button className={styles.button} type="submit">
                Save
              </button>
            </form>
          ) : (
            <>
              <div className={css.contact_info}>
                <img
                  src={default_avatar}
                  alt="avatar"
                  width="220"
                  height="220"
                />
                <p className={`${css.text} ${css.name}`}>{contact?.name}</p>
                <p className={css.text} href={`tel:${contact?.number}`}>
                  {contact?.number}
                </p>
                <div className={css.icons_wrapper}>
                  <img className={css.icons} src={whatsapp} alt="riajulislam" />
                  <img
                    className={css.icons}
                    src={viber}
                    alt="Laisa Islam Ani"
                  />
                  <img
                    className={css.icons}
                    src={mobile}
                    alt="Md Tanvirul Haque"
                  />
                  <img className={css.icons} src={comment} alt="Ricardo Ruiz" />
                </div>
              </div>
              <button
                className={`${css.btn} ${css.btn_edit}`}
                type="button"
                onClick={handleButtonEditClick}
              >
                Edit
              </button>
              <Link
                to={backPath}
                className={`${css.btn} ${css.btn_back}`}
                type="button"
                onClick={handleButtonEditClick}
                width="25"
                height="25"
              >
                <IoCaretBackCircleSharp />
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default WithAuthRedirect(ContactDetailPage, '/');
