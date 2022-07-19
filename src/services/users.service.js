import axios from 'axios';
import GlobalConstants from '../metadata/GlobalConstants';

export class UsersService {
   
    static addUser(data) {
        return axios.post(`${GlobalConstants.apiUrl}users`, data).then((res) => res).catch(err => err);
    }

    static getUsers() {
        return axios.get(`${GlobalConstants.apiUrl}users`).then((res) => res).catch(err => err);
    }

    static getUser(id) {
        return axios.get(`${GlobalConstants.apiUrl}users/${id}`).then((res) => res).catch(err => err);
    }

    static updateUser(data) {
        return axios.post(`${GlobalConstants.apiUrl}updateUser`, data).then((res) => res).catch(err => err);
    }

    static deleteUser(id) {
        return axios.delete(`${GlobalConstants.apiUrl}users/${id}`).then((res) => res).catch(err => err);
    }

    static checkFieldUnique(fieldName, fieldValue, id = null) {
        const data = {
            id,
            fieldName,
            fieldValue
        };
        return axios.post(`${GlobalConstants.apiUrl}users/checkFieldUnique`, data).then((res) => res).catch(err => err);
    }
}