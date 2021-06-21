import './App.css';
import Teams from './pages/Teams';
import { createStore } from 'redux';
import allReducers from './data/reducers/allReducers';
import {Provider} from 'react-redux';

const store = createStore (allReducers);

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Teams />
      </div>
    </Provider>
  );
}

export default App;
