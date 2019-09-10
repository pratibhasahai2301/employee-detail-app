import {userInfo} from '../data/user-mock.data';

export function authenticate(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = userInfo.find(entry => entry.email === email && entry.password === password);
      if (user) {
        resolve({token: 'P@ssT0ken', user: user});
      } else {
        reject('Invalid Username / password');
      }
    } catch (error) {
      reject(error);
    }
  });
}
