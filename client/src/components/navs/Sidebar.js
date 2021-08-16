import React, { Component } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SimpleBar from "simplebar";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      password: '', // 첫번째 비밀번호
      rePassword: '', // 두번째 비밀번호
      pMessage:'', // 확인 메시지 (비밀번호 일치여부를 사용자에게 알려주는 메시지)
      show: false
    };  // 초기 state값을 셋팅해준다. 빈 스트링 값은 false를 뜻한다.
  }
  initialize = () => {
    this.initializeSimplebar();
    this.initializeSidebarCollapse();
  }
  
  initializeSimplebar = () => {
    const simplebarElement = document.getElementsByClassName("js-simplebar")[0];
  
    if(simplebarElement){
      const simplebarInstance = new SimpleBar(document.getElementsByClassName("js-simplebar")[0]);
  
      /* Recalculate simplebar on sidebar dropdown toggle */
      const sidebarDropdowns = document.querySelectorAll(".js-sidebar [data-bs-parent]");
      
      sidebarDropdowns.forEach(link => {
        link.addEventListener("shown.bs.collapse", () => {
          simplebarInstance.recalculate();
        });
        link.addEventListener("hidden.bs.collapse", () => {
          simplebarInstance.recalculate();
        });
      });
    }
  }
  
  initializeSidebarCollapse = () => {
    const sidebarElement = document.getElementsByClassName("js-sidebar")[0];
    const sidebarToggleElement = document.getElementsByClassName("js-sidebar-toggle")[0];
  
    if(sidebarElement && sidebarToggleElement) {
      sidebarToggleElement.addEventListener("click", () => {
        sidebarElement.classList.toggle("collapsed");
  
        sidebarElement.addEventListener("transitionend", () => {
          window.dispatchEvent(new Event("resize"));
        });
      });
    }
  } 
  componentDidMount() {
    this.initialize();
  }
  render() {
    return (
      <nav id="sidebar" className="sidebar js-sidebar">
			<div className="sidebar-content js-simplebar" style={{fontFamily: 'STIX Two Text', fontSize: '15px'}}>
      <NavLink exact to="/" className="sidebar-brand">
        <span className="align-middle">Minju's Blog</span>
      </NavLink>
				{/* <a className="sidebar-brand" href="index.html">
          <span className="align-middle">#</span>
        </a> */}

				<ul className="sidebar-nav">
					<li className="sidebar-header">
						About
					</li>
          {/* <li className="sidebar-item">
						<a data-bs-target="#pages" data-bs-toggle="collapse" className="sidebar-link" aria-expanded="true">
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-layout align-middle"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
               <span className="align-middle">Pages</span>
						</a>
						<ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
							<li className="sidebar-item"><a className="sidebar-link" href="pages-settings.html">Settings</a></li>
							<li className="sidebar-item"><a className="sidebar-link" href="pages-projects.html">Projects <span className="sidebar-badge badge bg-primary">Pro</span></a></li>
							<li className="sidebar-item"><a className="sidebar-link" href="pages-clients.html">Clients <span className="sidebar-badge badge bg-primary">Pro</span></a></li>
							<li className="sidebar-item"><a className="sidebar-link" href="pages-pricing.html">Pricing <span className="sidebar-badge badge bg-primary">Pro</span></a></li>
							<li className="sidebar-item"><a className="sidebar-link" href="pages-chat.html">Chat <span className="sidebar-badge badge bg-primary">Pro</span></a></li>
							<li className="sidebar-item"><a className="sidebar-link" href="pages-blank.html">Blank Page</a></li>
						</ul>
					</li> */}

          <NavLink exact to="/profile" className="sidebar-item" activeClassName="active"> 
					<li className="sidebar-link">
            <span className="align-middle">Profile</span>
					</li>
          </NavLink>

					{/* <li className="sidebar-item">
            <NavLink exact to="/auth/login" className="sidebar-link"> <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Sign In</span></NavLink>
					</li>

					<li className="sidebar-item">
            <NavLink exact to="/sign-up" className="sidebar-link"> <i className="align-middle" data-feather="sliders"></i> <span className="align-middle">Sign Up</span></NavLink>
					</li> */}

            <NavLink exact to="/resume"  className="sidebar-item" activeClassName="active"> 
              <li className="sidebar-link">
                <span className="align-middle">Resume</span>
              </li>
            </NavLink>

					<li className="sidebar-header">
            Posts
					</li>
          <li className="sidebar-item">
						<a data-bs-target="#posts" data-bs-toggle="collapse" className="sidebar-link collapsed" aria-expanded="false">
               <span className="align-middle">React </span>
						</a>
						<ul id="posts" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <NavLink exact to="/react/intro"  className="sidebar-item" activeClassName="active"> 
              <li className="sidebar-link">
                <span className="align-middle">Start</span>
              </li>
              </NavLink>

              <NavLink exact to="/react/lifecycle" className="sidebar-item" activeClassName="active">
              <li className="sidebar-link">
                <span className="align-middle">LifeCyle</span>
              </li>
              </NavLink>
              <NavLink exact to="/react/event" className="sidebar-item" activeClassName="active">
              <li className="sidebar-link">
                  <span className="align-middle">Event</span>
              </li>
              </NavLink>
              <NavLink to="/posts?groupType=REACT_LIB"
              className="sidebar-item"
              isActive={(match, location) => {
                console.log('match, location', match, location)
                if(location.search.indexOf('REACT_LIB') > -1) {
                  return true;
                } else {
                  return false;
                }
              }}
    
              >
                <li className="sidebar-link">
                    <span className="align-middle">Library</span>
                </li>
              </NavLink>

							{/* <li className="sidebar-item"><a className="sidebar-link" href="pages-settings.html">Settings</a></li>
							<li className="sidebar-item"><a className="sidebar-link" href="pages-projects.html">Projects <span className="sidebar-badge badge bg-primary">Pro</span></a></li>
							<li className="sidebar-item"><a className="sidebar-link" href="pages-clients.html">Clients <span className="sidebar-badge badge bg-primary">Pro</span></a></li>
							<li className="sidebar-item"><a className="sidebar-link" href="pages-pricing.html">Pricing <span className="sidebar-badge badge bg-primary">Pro</span></a></li>
							<li className="sidebar-item"><a className="sidebar-link" href="pages-chat.html">Chat <span className="sidebar-badge badge bg-primary">Pro</span></a></li>
							<li className="sidebar-item"><a className="sidebar-link" href="pages-blank.html">Blank Page</a></li> */}
						</ul>
					</li>
          <NavLink to='/posts?groupType=MASTER'
            isActive={(match, location) => {
              console.log('match, location', match, location)
              if(location.search.indexOf('MASTER') > -1) {
                return true;
              } else {
                return false;
              }
            }}
            className="sidebar-item" activeClassName="active">
              <li className="sidebar-link">
                   <span className="align-middle">My post</span>
              </li>
            </NavLink>
            <NavLink to='/posts?groupType=GEUST'
              isActive={(match, location) => {
                console.log('match, location', match, location)
                if(location.search.indexOf('GEUST') > -1) {
                  return true;
                } else {
                  return false;
                }
              }}
              className="sidebar-item" activeClassName="active">
                <li className="sidebar-link">
                    <span className="align-middle">Geust post</span>
                </li>
            </NavLink>
            <NavLink to='/posts?groupType=GALLERY'
              isActive={(match, location) => {
                console.log('match, location', match, location)
                if(location.search.indexOf('GALLERY') > -1) {
                  return true;
                } else {
                  return false;
                }
              }}
              className="sidebar-item" activeClassName="active">
                <li className="sidebar-link">
                    <span className="align-middle">Gallery</span>
                </li>
            </NavLink>


				</ul>

				<div className="sidebar-cta">
					<div className="sidebar-cta-content">
						{/* <strong className="d-inline-block mb-2">Upgrade to Pro</strong>
						<div className="mb-3 text-sm">
							Are you looking for more components? Check out our premium version.
						</div>
						<div className="d-grid">
							<a href="upgrade-to-pro.html" className="btn btn-primary">Upgrade to Pro</a>
						</div> */}
					</div>
				</div>
			</div>
		</nav>


      )
  }

}

export default Sidebar;
