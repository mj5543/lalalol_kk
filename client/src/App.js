// import './App.css';
import './'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./scss/app.scss";
import "./css/icons.css";
import "./css/base.css";
import NavbarExpandTop from './components/navs/NavbarExpandTop';
import { Route, useLocation } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Main, Posts, Profile, SignIn, SignUp} from './pages';
import BaseContainer from './components/auth/BaseContainer';
import AuthContainer from './components/auth/AuthContainer';
import LifeCycle from './components/category/menual/react/LifeCycle';
import ReactEvent from './components/category/menual/react/ReactEvent';
import Intro from './components/category/menual/react/Intro';
import Resume from './components/resume/Resume';
import ContentsContainer from './components/contents/ContentsContainer';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminContainer from './components/admin/AdminContainer';
import SidebarContainer from './components/navs/SidebarContainer';
import Testing from './pages/Testing';

const App = (props) => {
  console.log('App props', props);
  return (
    <div className="wrapper">
      <SidebarContainer store={props.store} />
        <div className="main">
        <NavbarExpandTop />
        <Route exact path="/" component={ContentsContainer}/>
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
        <Route path="/resume" component={Resume}/>
        <Route path="/react/lifecycle" component={LifeCycle}/>
        <Route path="/react/event" component={ReactEvent}/>
        <Route path="/react/intro" component={Intro}/>
        <Route path="/admin" component={AdminContainer}/>
        <Route path="/testing" component={Testing}/>
        {/* <Route path="*">
          <NoMatch />
        </Route> */}
        <AuthContainer />
        {/* info, success, warning, error, default, dark */}
        <ToastContainer
          position="bottom-center"
          hideProgressBar={false}
          autoClose={1500} />
          {/* <footer className="footer">
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
          </footer> */}
        </div>
      </div>

  )
}
function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}
export default App;
