import { API } from '../api/api.js';

const userTemplate = ({ name, _id }) => {
    return `<button class="ripple" data-id=${_id}>${name}</button>`;
};

export const loadUsers = () => {
    const $userList = document.querySelector('#user-list');
    const users = API.getUsers();

    users.then((users) => {
        users.map((user) => {
            //afterbegin: element 안에 가장 첫번째 child, 꼭 부모가 있어야 함.
            $userList.insertAdjacentHTML('afterbegin', userTemplate(user));
        });
    });
};

