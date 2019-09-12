import {ActionTypes} from '../constants/Actions';

export const loginSuccess = () => ({type: ActionTypes.LOGIN_SUCCESS});
export const saveToken = (payload) => ({type: ActionTypes.SAVE_TOKEN, payload});
export const loginError = (error) => ({type: ActionTypes.LOGIN_ERROR, error});
export const loginCanceled = () => ({type: ActionTypes.LOGIN_CANCELLED});
export const deleteToken = () => ({type: ActionTypes.DELETE_TOKEN});
