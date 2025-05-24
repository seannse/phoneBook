import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.goit.global';

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unSet() {
    axios.defaults.headers.common.Authorization = '';
  },
};

// const $publicHost = axios.create({
//   baseURL: 'https://connections-api.goit.global',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// const $privateHost = axios.create({
//   baseURL: 'https://connections-api.goit.global',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// Це middleware, який перед кожним запитом в поле Authorization
// в хедерах буде підчіпляти токен користувача з локального хранилища
// const authInterceptor = config => {
//   config.headers['Authorization'] = localStorage.getItem('token');
//   return config;
// };

// $privateHost.interceptors.request.use(authInterceptor);

export const UserAPI = {
  async register(formData) {
    const { data } = await axios.post(`users/signup`, formData);
    token.set(data.token);
    return data;
  },
  async login(formData) {
    const { data } = await axios.post(`users/login`, formData);
    token.set(data.token);
    return data;
  },
  async getCurrentUser(persistedToken) {
    token.set(persistedToken);

    const { data } = await axios.get(`/users/current`);
    return data;
  },
  async logOut() {
    const { data } = await axios.post(`/users/logout`);
    token.unSet();
    return data;
  },
};

export const ContactsAPI = {
  async fetchContacts() {
    const { data } = await axios.get(`/contacts`);
    return data;
  },
  async postContact(contactData) {
    const { data } = await axios.post(`/contacts`, contactData);
    return data;
  },
  async deleteContact(contactId) {
    const { data } = await axios.delete(`/contacts/${contactId}`);
    return data;
  },
  async editContact(updatedContact) {
    const { data } = await axios.patch(`/contacts/${updatedContact.id}`, {
      name: updatedContact.name,
      number: updatedContact.number,
    });
    return data;
  },
};
