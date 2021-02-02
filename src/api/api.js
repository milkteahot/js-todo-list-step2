const URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';

const option = {
    post: (contents) => ({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contents)
    }),

    delete: () => ({
        method: 'DELETE'
    }),

    put: (contents) => ({
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contents)
    })
};

const request = async (url, option = {}) => {
    try {
        const response = await fetch(url, option);
        if (!response.ok) {
            throw new Error(response.status);
        }
        // console.log(response)
        return await response.json();
    } catch (err) {
        alert(`Error: ${err}`);
    }
};

export const API = {
    getUsers: () => {
        return request(`${URL}/users`);
    },
    addUser: (userName) => {
        const content = {
            name: userName,
        };
        return request(`${URL}/users`, option.post(content));
    },
    getUser: (userId) => {
        return request(`${URL}/users/${userId}`)
    },
    getUserTodos: (userId) => {
        return request(`${URL}/users/${userId}/items`);
    }
};