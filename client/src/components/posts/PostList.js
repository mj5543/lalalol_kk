import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Route, Link } from 'react-router-dom';
import BoardDetail from './PostDetail';
import Nav from 'react-bootstrap/Nav';
import moment from 'moment';
class PostList extends Component {
  constructor(props) {
    console.log('props--', props);
    super(props);
    this.state  = {
      password: '', // 첫번째 패스워드
      rePassword: '', // 두번째 패스워드
      pMessage:'패스워드를 입력하세요.', // 확인 메시지 (패스워드 일치여부를 사용자에게 알려주는 메시지)
      show: false,
      blindStyle: {
        width:'100%'
      },
      bodyEle: ''
    };  // 초기 state값을 셋팅해준다. 빈 스트링 값은 false를 뜻한다.
  }
  componentDidMount() {
    this._getList();
  }

  _getList = async() => {
    const res = await axios.get('/api/posts/list');
    console.log('_getList--', res)
    const bodyEle = this.boardList(res.data.result);
    this.setState({
      bodyEle: bodyEle
      // password: '',
    }) //사용자가 입력한 값이 재확인 비번과 일치하지 않을 경우
  // this.setState({ hello : res.data.hello })
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
        <Link to={`${this.props.pathInfo.url}/detail?id=${item.id}`} className="nav-link text-dark">
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
    return moment(date).format('YYYY-MM-DD HH:mm');
  }
  // goDetail() {
  //   return href="#home"
  // } 
  handleConfirmPassword = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    if (e.target.value !== '1234') {
      this.setState({
        pMessage: "패스워드가 일치하지 않습니다.",
        // password: '',
      }) //사용자가 입력한 값이 재확인 비번과 일치하지 않을 경우
    } else {
      this.setState({
        blindStyle: {
          width:'0%'
        }
        // password: '',
      }) //사용자가 입력한 값이 재확인 비번과 일치하지 않을 경우

    }
    console.log('password--', this.state.password);
  }
  render() {
    return (
      <div>
        {/* <Route path={`${this.props.pathInfo.url}/:type`} component={BoardDetail}/> */}
        <div className="clearfix mb-2">
          <button type="button" className="btn btn-dark btn-sm float-end">
          <Link to={`${this.props.pathInfo.url}/#write`} className="text-white" style={{textDecoration: 'none'}}>글쓰기</Link>
          </button>
        </div>
        <div className="card">
          <Table striped bordered hover size="sm">
            <colgroup>
              {/* <col width="5%"></col> */}
              <col width="15%"></col>
              <col width="50%"></col>
              <col width="30%"></col>
            </colgroup>
            <thead>
              <tr>
                {/* <th></th> */}
                <th>작성자</th>
                <th>글 제목</th>
                <th>작성일</th>
              </tr>
            </thead>
            {this.state.bodyEle}
            {/* <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td colSpan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody> */}
          </Table>
        </div>
      
      </div>
    );
  }
};

export default PostList;