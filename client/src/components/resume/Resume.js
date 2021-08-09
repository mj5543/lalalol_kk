import React, { Component } from 'react';
import './resume.css';
import axios from 'axios';
// import { reset } from 'axe-core';
require('dotenv').config();

class Resume extends Component {
  constructor(props) {
    super(props);
    this.state  = {
      password: '', // 첫번째 패스워드
      rePassword: '', // 두번째 패스워드
      pMessage:'패스워드를 입력하세요.', // 확인 메시지 (패스워드 일치여부를 사용자에게 알려주는 메시지)
      show: false,
      blindStyle: {
        width:'100%'
      },
      hello : '',
      isShowContent: false,
      contentsEl: '',
    };  // 초기 state값을 셋팅해준다. 빈 스트링 값은 false를 뜻한다.
  }
  componentDidMount() {
    this._getHello();
  }

  _getHello = async() => {
    const res = await axios.get('/api/testlist');
    console.log('_getHello--', res)
    // this.setState({ hello : res.data.hello })
  }
  contentsEl =  () => {
    const cardStyle = {
      borderLeft: '0px',
      borderRight: '0px',
    }
    const borderNone = {
      border: 'none'
    }
    const alignCenter = {
      textAlign: 'center',
      verticalAlign: 'middle'
    }
    const theadStyle = {
      borderBottom: '1px'
    }
    return (
      <div class="container">
      <div class="card" style={cardStyle}>
        <div class="row g-0">
          <div class="col-md-2">
            <div className="card-body">
              {/* <h5 class="card-title">Work Experience(technical)</h5> */}
              <h5 class="card-title">Skills</h5>
            </div>
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <div className="row">
                <div className="resume">
    
              <table className="table table-responsive align-middle table-bordered">
                <thead style={theadStyle}>
                  <tr className="align-items-center" style={alignCenter}>
                    <th rowSpan="2" scope="col">Project</th>
                    <th rowSpan="2" scope="col">Experience</th>
                    <th colSpan="3" scope="colgroup" style={borderNone}>development</th>
                  </tr>
                  <tr style={alignCenter}>
                    <th scope="col">Tool</th>
                    <th scope="col">DBMS</th>
                    <th scope="col">WAS</th>
                  </tr>
                </thead>
                <tbody>
               
                  <tr>
                    <td>도로 시설물 재난관리 재난 관리체계 구축</td>
                    <td>2011.08~2012.12</td>
                    <td>Java, jQuery, JSP, HTML, Spring Framework</td>
                    <td>Oracle</td>
                    <td>tomcat,jeus</td>
                  </tr>
                  <tr>
                    <td>LG하우시스 대리점시스템 운영</td>
                    <td>2013.01~2014.05</td>
                    <td>JAVA, JSP/Jstl, HTML, jQuery, JavaScript, Stored Procedure, json</td>
                    <td>Oracle</td>
                    <td>Tomcat, WebSphere</td>
                  </tr>
                  <tr>
                    <td>LG하우시스 직영점시스템 구축</td>
                    <td>2014.05 ~2014.07</td>
                    <td>Java, XML, DevOn, Miplatform</td>
                    <td>Oracle</td>
                    <td>tomcat</td>
                  </tr>
                  <tr>
                    <td>국민권익위원회 행정심판 허브 시스템 구축</td>
                    <td>2014.09~2014.12</td>
                    <td>Java,JQuery,JavaScript,Ajax, Spring framework</td>
                    <td>Oracle</td>
                    <td>Tomcat,JBOSS</td>
                  </tr>
                  <tr>
                    <td>저작권 통합 관리 시스템 운영</td>
                    <td>2015.02~2015.06</td>
                    <td>Java, XML, Spring framework, Miplatform</td>
                    <td>Oracle</td>
                    <td>Tomcat,jeus</td>
                  </tr>
                  <tr>
                    <td>사회보장정보시스템 고도화</td>
                    <td>2015.06~2015.09</td>
                    <td>Java, XML, anyframe, Miplatform, egov</td>
                    <td>Oracle</td>
                    <td>Tomcat,jeus</td>
                  </tr>
                  <tr>
                    <td>대검찰청 업무시스템 Kics 고도화</td>
                    <td>2015.09~2015.12</td>
                    <td>Java, XML, EJB, Trustform,laf/j</td>
                    <td>Oracle</td>
                    <td>Tomcat,jeus</td>
                  </tr>
                  <tr>
                    <td>Acubed 반도체 장비 분석 차트 시스템 프론트엔드 개발</td>
                    <td>2016.01~2017.03</td>
                    <td>AngularJS, AngularJS2, Typescript, Javascript, npm, node.js, jQuery, css, html5, c3js, d3js, , Wijmo5,unserscreJS, Spring framework</td>
                    <td>Oracle</td>
                    <td>Tomcat</td>
                  </tr>
                  <tr>
                    <td>MIPlatform 반도체 장비 분석 차트 시스템 프론트엔드 개발</td>
                    <td>2017.03~2017.09</td>
                    <td>AngularJS2, AngularJS4, Typescript, Javascript, npm, node.js, rxJS, jQuery, c3js, d3js, css, html5 unserscreJS, Wijmo5</td>
                    <td>Oracle</td>
                    <td>Tomcat</td>
                  </tr>
                  <tr>
                    <td>AP Mall CX 리뉴얼</td>
                    <td>2017.09~2017.12</td>
                    <td>Java, JQuery, JavaScript, jsp, Jstl, xml. Ajax, SiteMesh, Spring framework</td>
                    <td>Oracle</td>
                    <td>Tomcat</td>
                  </tr>
                  <tr>
                    <td>onstove 게임 플랫폼 개발 및 운영 유지보수</td>
                    <td>2018.02~2018.12</td>
                    <td>Vue, ES6, Javascript, npm, node.js, jQuery, css, html5, lodash</td>
                    <td>Oracle</td>
                    <td>Tomcat</td>
                  </tr>
                  <tr>
                    <td>Edge&Next 클라우드 HIS 솔루션 개발 </td>
                    <td>2019.01~2021.07</td>
                    <td>Ember.js, ES6, javascript, yarn, nodejs, jQuery</td>
                    <td></td>
                    <td></td>
                  </tr>
                
                </tbody>
              </table>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" style={cardStyle}>
        <div class="row g-0">
          <div class="col-md-2">
          <div className="card-body">
            <h5 class="card-title">Education</h5>
          </div>
          </div>
          <div class="col-md-10">
            <div class="card-body">
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  handleConfirmPassword = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.value !== process.env.REACT_APP_CONTENTS_PASSWORD) {
      this.setState({
        pMessage: "패스워드가 일치하지 않습니다.",
        // password: '',
      }) //사용자가 입력한 값이 재확인 비번과 일치하지 않을 경우
    } else {
      this.setState({
        blindStyle: {
          width:'0%',
        },
        contentsEl: this.contentsEl()
        // password: '',
      }) //사용자가 입력한 값이 재확인 비번과 일치하지 않을 경우

    }
    console.log('password--', this.state.password);
  }
  render() {

    const bilndInputStyle = {
      width: '30%',
      display: 'inline-block'
    }
    if(this.state.isShowContent) {

    }

      return (
        <div style={{padding: '20px'}}>
        <div id="myNav" className="overlay" style={this.state.blindStyle}>
          <div className="overlay-content">
          <input type="password" name="password" className="form-control" 
              style={bilndInputStyle}
              value={this.state.password}
              onChange={this.handleConfirmPassword} />
              <span className="message-p mt-2 fs-4">{this.state.pMessage}</span>
          </div>
        </div>
        {this.state.contentsEl}
          </div>
      );
  }

};

export default Resume;