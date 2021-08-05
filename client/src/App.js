// import './App.css';
import './'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./scss/app.scss";
import "./css/icons.css";
import Sidebar from './components/navs/Sidebar';
import NavbarExpandTop from './components/navs/NavbarExpandTop';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Main, Posts, Profile, SignIn, SignUp} from './pages';
import BaseContainer from './components/auth/BaseContainer';
import AuthContainer from './components/auth/AuthContainer';
import LifeCycle from './components/category/menual/react/LifeCycle';
import ReactEvent from './components/category/menual/react/ReactEvent';
import Intro from './components/category/menual/react/Intro';
const App = (props) => {
  console.log('App props', props);
  return (
    <div className="wrapper">
      <Sidebar />
        <div className="main">
        <NavbarExpandTop />
        <Route exact path="/" component={Main}/>
        <Switch>
          <Route path="/profile/:name" component={Profile}/>
          <Route path="/profile" component={Profile}/>
        </Switch>
        <Switch>
          {/* <Route path="/sign-in/:name" component={BaseContainer}/>
          <Route path="/sign-in" render={() => <BaseContainer store={props.store}/>}/> */}
          <Route path="/auth/login/:name" component={BaseContainer}/>
          <Route path="/auth/login" render={() => <BaseContainer store={props.store}/>}/>
        </Switch>
        <Switch>
          <Route path="/auth/sign-up/:name" component={SignUp}/>
          <Route path="/auth/sign-up" component={SignUp}/>
        </Switch>
        <Route path="/posts" component={Posts}/>
        <Route path="/react/lifecycle" component={LifeCycle}/>
        <Route path="/react/event" component={ReactEvent}/>
        <Route path="/react/intro" component={Intro}/>
        <AuthContainer />
          <footer className="footer">
            <div className="container-fluid">
              <div className="row text-muted">
                <div className="col-6 text-start">
                  <p className="mb-0">
                    <a className="text-muted" href="https://adminkit.io/" target="_blank"><strong>AdminKit Demo</strong></a> &copy;
                  </p>
                </div>
                <div className="col-6 text-end">
                  <ul className="list-inline">
                    <li className="list-inline-item">
                      <a className="text-muted" href="https://adminkit.io/" target="_blank">Support</a>
                    </li>
                    <li className="list-inline-item">
                      <a className="text-muted" href="https://adminkit.io/" target="_blank">Help Center</a>
                    </li>
                    <li className="list-inline-item">
                      <a className="text-muted" href="https://adminkit.io/" target="_blank">Privacy</a>
                    </li>
                    <li className="list-inline-item">
                      <a className="text-muted" href="https://adminkit.io/" target="_blank">Terms</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>

  )
}

export default App;
