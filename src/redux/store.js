import { listsReducer } from './board/lists/slice';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    lists: listsReducer,
})

const persistedReducer = persistReducer(
    {
      key: 'root',
      storage,
      whitelist: ['lists']
    },
    rootReducer,
)

export const store = configureStore({
    reducer: persistedReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        })
    }
});

export const persistor = persistStore(store);