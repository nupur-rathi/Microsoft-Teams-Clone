import './App.css';
import Teams from './pages/Teams';
import { createStore } from 'redux';
import allReducers from './data/reducers/allReducers';
import {Provider} from 'react-redux';
import Authentication from './pages/Authentication';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

const store = createStore (allReducers);

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Route path="/" exact >
            <Authentication />
          </Route>
          <Route path="/teams" exact >
            <Teams />
          </Route>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
