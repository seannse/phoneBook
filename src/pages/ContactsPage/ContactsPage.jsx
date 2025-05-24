import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ContactList,
  FormFilter,
  Loader,
  WithAuthRedirect,
  AddContactBtn,
  Modal,
  AlphabetFilter,
  FormAddContacts,
} from '../../components';
import {
  selectContacts,
  selectIsLoading,
  selectIsLoggedIn,
  selectIsModalAddContactOpen,
} from '../../redux/selectors';
import { getContacts } from '../../redux/contacts/operations';
import { setIsModalAddContactOpen } from '../../redux/global/slice';

const ContactsPage = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isModalAddContactOpen = useSelector(selectIsModalAddContactOpen);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(getContacts());
  }, [dispatch, isLoggedIn]);

  return (
    <section className="section">
      <div className="container">
        <AddContactBtn />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '20px',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              flexGrow: 1,
            }}
          >
            <FormFilter />
            {contacts.length !== 0 ? (
              <ContactList />
            ) : (
              <p>Your contacts list is empty</p>
            )}
          </div>
          {contacts.length > 1 && <AlphabetFilter />}
        </div>
        {isLoading && <Loader />}
        <Modal
          title={'Add Contact'}
          setModalOpen={setIsModalAddContactOpen}
          isModalOpen={isModalAddContactOpen}
        >
          <FormAddContacts />
        </Modal>
      </div>
    </section>
  );
};

export default WithAuthRedirect(ContactsPage, '/');
