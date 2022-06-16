import {v1} from 'uuid';

let users = [{
    id: "3f963eb0-edb4-11ec-b19a-4d3d05379a01",
    username: 'Pavel Trufanov',
    age: 36,
    hobbies: ['programming', 'music', 'cycling', 'snowboarding']
}];

export const findAll = async () => {
    return users;
}

export const findById = async (id) => {
    return users.filter((user) => user.id === id);
}

export const create = async (user) => {
    user.id = v1();
    users.push(user);
}

export const update = async (user, id) => {
    const result = await findById(id);
    const foundUser = result[0];
    if (foundUser) {
        if (user.username) {
            foundUser.username = user.username;
        }
        if (user.age) {
            foundUser.age = user.age;
        }
        if (user.hobbies) {
            foundUser.hobbies = user.hobbies;
        }
        return true;
    } else {
        return false;
    }
}

export const remove = async (id) => {
    const result = await findById(id);
    const foundUser = result[0];
    if (foundUser) {
        users = users.filter(user => user.id !== id);
        return true;
    } else {
        return false;
    }
}
