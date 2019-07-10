import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import placeReducer from './reducers/placeReducer'
import countriesReducer from './reducers/countriesReducer'
import regionsReducer from './reducers/regionsReducer'
import clubsReducer from './reducers/clubsReducer'
import loginReducer from './reducers/loginReducer'

const rootReducer = combineReducers({
  places: placeReducer,
  countries: countriesReducer,
  regions: regionsReducer,
  clubs: clubsReducer,
  authentication: loginReducer
})

export default configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk))
}