import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import moment from 'moment';
import {isEmpty} from 'lodash';
import 'bootstrap/dist/css/bootstrap.css';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';

class ActivityContents extends Component {
  constructor(props) {
    console.log('ActivityContents props--', props);
    super(props);
    this.state  = {
      password: '', // 첫번째 패스워드
      rePassword: '', // 두번째 패스워드
      pMessage:'패스워드를 입력하세요.', // 확인 메시지 (패스워드 일치여부를 사용자에게 알려주는 메시지)
      show: false,
      blindStyle: {
        width:'100%'
      },
      bodyEle: '',
      loading: true,
      dataList: [],
      groupType: '',
      columns: []

    };  // 초기 state값을 셋팅해준다. 빈 스트링 값은 false를 뜻한다.
  }
  componentDidMount() {
    this._getList();
  }
  _getList = async() => {
    const res = await axios.get('/api/posts/activities');
    console.log('_getList--', res)
    // const bodyEle = this.boardList(res.data.result);
    this.setState({
      // bodyEle: bodyEle,
      loading: false,
      dataList: res.data.result
    }) 
  }
 
  boardList(list) {
    try{
      const listItems = list.map((item, index) =>
      <tr key={index}>
        {/* <td>{item.id}</td> */}
        <td>{item.name}</td>
        {/* <Nav.Link href={`${this.props.pathInfo.url}/detail#${item.id}`}>
          <td>{item.subject}</td>
        </Nav.Link> */}
        <Link to={{pathname: `${this.props.pathInfo.url}/detail`, search: `?id=${item.id}&groupType=${this.props.location.state.groupType}`, state: {groupType: this.props.location.state.groupType}}}
        className="nav-link text-dark">
          <td>{item.subject}</td>
        </Link>
        <td>{this.dateTimeFormat(item.created_at)}</td>
      </tr>
      );
      return (
        <tbody>{listItems}</tbody>
      );

    } catch(e) {
      console.log('boardList err', e);
    }
  } 
  dateTimeFormat(date) {
    return moment(date).format('YYYY.MM.DD');
  }

  render() {
    return (
      <div className="col-md-8 col-xl-9">
      <div className="card">
        <div className="card-header">

          <h5 className="card-title mb-0">Activities</h5>
        </div>
        <div className="card-body h-100">
          {this.state.dataList.map(data => 
            <div>
              <div className="d-flex align-items-start">
                <img src={data.user_image} width="36" height="36" className="rounded-circle me-2" alt="Vanessa Tucker" />
                <div className="flex-grow-1">
                  {/* <small className="float-end text-navy">5m ago</small> */}
                  <strong>{data.name}</strong> {data.subject} <strong>게시글이 작성되었습니다.</strong><br />
                  <small className="text-muted">{data.created_at}</small><br />

                </div>
              </div>
              <hr />
            </div>
          )}

{/* 
          <div className="d-flex align-items-start">
            <img src="img/avatars/avatar.jpg" width="36" height="36" className="rounded-circle me-2" alt="Charles Hall" />
            <div className="flex-grow-1">
              <small className="float-end text-navy">30m ago</small>
              <strong>Charles Hall</strong> posted something on <strong>Christina Mason</strong>'s timeline<br />
              <small className="text-muted">Today 7:21 pm</small>

              <div className="border text-sm text-muted p-2 mt-1">
                Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus
                pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante.
              </div>

              <a href="#" className="btn btn-sm btn-danger mt-1"><i className="feather-sm" data-feather="heart"></i> Like</a>
            </div>
          </div>

          <hr />
          <div className="d-flex align-items-start">
            <img src="img/avatars/avatar-4.jpg" width="36" height="36" className="rounded-circle me-2" alt="Christina Mason" />
            <div className="flex-grow-1">
              <small className="float-end text-navy">1h ago</small>
              <strong>Christina Mason</strong> posted a new blog<br />

              <small className="text-muted">Today 6:35 pm</small>
            </div>
          </div>

          <hr />
          <div className="d-flex align-items-start">
            <img src="img/avatars/avatar-2.jpg" width="36" height="36" className="rounded-circle me-2" alt="William Harris" />
            <div className="flex-grow-1">
              <small className="float-end text-navy">3h ago</small>
              <strong>William Harris</strong> posted two photos on <strong>Christina Mason</strong>'s timeline<br />
              <small className="text-muted">Today 5:12 pm</small>

              <div className="row g-0 mt-1">
                <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                  <img src="img/photos/unsplash-1.jpg" className="img-fluid pe-2" alt="Unsplash" />
                </div>
                <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                  <img src="img/photos/unsplash-2.jpg" className="img-fluid pe-2" alt="Unsplash" />
                </div>
              </div>

              <a href="#" className="btn btn-sm btn-danger mt-1"><i className="feather-sm" data-feather="heart"></i> Like</a>
            </div>
          </div>

          <hr />
          <div className="d-flex align-items-start">
            <img src="img/avatars/avatar-2.jpg" width="36" height="36" className="rounded-circle me-2" alt="William Harris" />
            <div className="flex-grow-1">
              <small className="float-end text-navy">1d ago</small>
              <strong>William Harris</strong> started following <strong>Christina Mason</strong><br />
              <small className="text-muted">Yesterday 3:12 pm</small>

              <div className="d-flex align-items-start mt-1">
                <a className="pe-3" href="#">
        <img src="img/avatars/avatar-4.jpg" width="36" height="36" className="rounded-circle me-2" alt="Christina Mason" />
      </a>
                <div className="flex-grow-1">
                  <div className="border text-sm text-muted p-2 mt-1">
                    Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr />
          <div className="d-flex align-items-start">
            <img src="img/avatars/avatar-4.jpg" width="36" height="36" className="rounded-circle me-2" alt="Christina Mason" />
            <div className="flex-grow-1">
              <small className="float-end text-navy">1d ago</small>
              <strong>Christina Mason</strong> posted a new blog<br />
              <small className="text-muted">Yesterday 2:43 pm</small>
            </div>
          </div>

          <hr />
          <div className="d-flex align-items-start">
            <img src="img/avatars/avatar.jpg" width="36" height="36" className="rounded-circle me-2" alt="Charles Hall" />
            <div className="flex-grow-1">
              <small className="float-end text-navy">1d ago</small>
              <strong>Charles Hall</strong> started following <strong>Christina Mason</strong><br />
              <small className="text-muted">Yesterdag 1:51 pm</small>
            </div>
          </div>

          <hr /> */}
          <div className="d-grid">
            <a href="#" className="btn btn-primary">Load more</a>
          </div>
        </div>
      </div>
    </div>

    );
  }
};

export default ActivityContents;