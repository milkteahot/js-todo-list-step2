import { API } from '../api/api.js';
import { MINIMUM_USER_NAME_LENGTH } from '../constant/user.js';

const inputUserName = () => {
    const userName = prompt('유저 이름을 입력하세요');
    if (userName.length < MINIMUM_USER_NAME_LENGTH) {
        return alert('유저 이름은 2글자 이상이어야 합니다.');
    }
    API.addUser(userName);
};

// const URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';

export const addUser = async () => {
    console.log('add');
    const $userCreateButton = document.querySelector('.user-create-button');
    $userCreateButton.addEventListener('click', inputUserName);
};