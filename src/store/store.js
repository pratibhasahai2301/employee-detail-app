import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import {loginFlow, logoutFlow} from '../sagas/loginSaga';
import {watchFetchEmployees} from '../sagas/employeeSaga/fetch';
import watchDeleteEmployee from '../sagas/employeeSaga/delete';
import watchSaveEmployee from '../sagas/employeeSaga/save';
import watchFetchEmployee from '../sagas/employeeSaga/fetchOne';

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
/*eslint-enable */

const sagaMiddleware = createSagaMiddleware();
const appStore = createStore(rootReducer, composeSetup(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(loginFlow);
sagaMiddleware.run(logoutFlow);
sagaMiddleware.run(watchFetchEmployees);
sagaMiddleware.run(watchDeleteEmployee);
sagaMiddleware.run(watchSaveEmployee);
sagaMiddleware.run(watchFetchEmployee);

export default appStore;
