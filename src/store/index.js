import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['login', 'createAction', 'editAction', 'loading']
}


const persistedReducer = persistReducer(rootPersistConfig, rootReducer)


// const loggerMiddleware = createLogger()


export let store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
    )
  )
)
export let persistor = persistStore(store)
