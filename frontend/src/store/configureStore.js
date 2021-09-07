import {createStore} from "redux";
import rootReducer from "./rootReducer";
import {devToolsEnhancer} from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  	key : "root",
	storage : storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const configureStore = () => {
	let store = createStore(persistedReducer, devToolsEnhancer());
	let persistor = persistStore(store);

	return {store, persistor}
};

export default configureStore;
