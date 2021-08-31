import {React} from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginComponent from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import HomeComponent from './pages/Home';
import './App.css';

function App() {
  
  return (
    <div className="App">
      {/* {isAuth ? (<><button onClick={logout}>Logout</button></>): (<><button onClick={login}>Login</button></>)} */}
      <Router>
        <Switch>
          <Route exact path="/" component={LoginComponent}></Route> 
          <ProtectedRoute exact path="/home" component={HomeComponent}></ProtectedRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
