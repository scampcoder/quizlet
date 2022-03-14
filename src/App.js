import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import FrontPg from './components/FrontPg';
import Quiz from './components/Quiz'

function App() {
  return (
    <>
    {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Switch>
        {/* This route is for about component 
          with exact path "/", in component 
          props we passes the imported component*/}
          <Route exact path="/" component={FrontPg} />
          {/* This route is for about component 
          with exact path "/quiz", in component 
          props we passes the imported component*/}
          <Route path="/quiz" component={Quiz} />
          {/* If any route mismatches the upper 
          route endpoints then, redirect triggers 
          and redirects app to home component with to="/" */}
          <Redirect to ="/"/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
