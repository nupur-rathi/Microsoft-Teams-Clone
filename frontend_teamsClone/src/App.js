import './App.css';
import Teams from './pages/Teams';
import Authentication from './pages/Authentication';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

const log={
  isLoggedIn:false,
  onAuthentication(){
    this.isLoggedIn=true;
  },
  getLogInStatus(){
    return this.isLoggedIn;
  }
}

function SecuredRoute({ path, Component }){
  
  return (
    <Route path={path} render={data => log.getLogInStatus() ?
      (<Component {...data}></Component>) :
      (<Redirect to={{pathname: '/'}}></Redirect>)
    }></Route>
  )

}

function App() {

  return (
    <Router>
      <div className="App">
        <Route path="/" exact >
          <Authentication log={log}/>
        </Route>
        <SecuredRoute path="/teams" Component={Teams} >
        </SecuredRoute>
      </div>
    </Router>
  );
}

export default App;
