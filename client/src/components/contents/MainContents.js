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

class MainContents extends Component {
  constructor(props) {
    console.log('MainContents props--', props);
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
  this.goDetail = this.goDetail.bind(this)
  }
  componentDidMount() {
    // if(!isEmpty(this.props.location.state) && this.props.location.state.groupType) {
    //   this.setState({groupType: this.props.location.state.groupType});
    // }
    // this.setState({
    //   groupType: this.props.groupType,
    //   columns: this._getDataColumns()
    // });

    this._getDataList();
    // this._getList();
  }
  // componentDidUpdate() {
  //   if(this.state.groupType !== this.props.groupType) {
  //     this.setState({
  //       groupType: this.props.groupType,
  //       columns: this._getDataColumns()
  //     });
  //     this._getCateroeyList();
  //   }
  //   console.log('componentDidUpdate--', this.props);

  // }
 
  
  _getList = async() => {
    const res = await axios.get('/api/posts/list');
    console.log('_getList--', res)
    const bodyEle = this.boardList(res.data.result);
    this.setState({
      bodyEle: bodyEle,
      loading: false,
      dataList: res.data.result
      // password: '',
    }) //사용자가 입력한 값이 재확인 비번과 일치하지 않을 경우
  // this.setState({ hello : res.data.hello })
  }
  _getDataList = async() => {
    const res = await axios.get(`/api/posts/list-members-preview`);
    console.log('_getList--', res);
    let dataList = res.data.result;
    if(!isEmpty(res.data.result)) {
      dataList = res.data.result.map(d => {
        let preContent = d.content;
        if (d.content.length > 100) {
          preContent = d.content.substr(0, 100).concat('...');
        }
        d.preContent = preContent;
        return d;
      });
    }
    this.setState({
      loading: false,
      dataList: dataList
    })
  }
  cardList(list) {

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
  goDetail = (data) => {
    if(this.props) {
      this.props.props.props.history.push({pathname:`/posts/detail`, search: `?id=${data.id}&groupType=${data.group_type}`});
    }
  }

  render() {
    return (
      <div style={{padding: '30px'}}>
       <Row xs={2} md={3} className="g-1">
         {this.state.dataList.map((data,index) =>
              <Col key={index}>
              <Card style={{minHeight:'230px'}}>
                <Card.Body>
                  <Card.Title>{data.subject}</Card.Title>
                  <Card.Text>
                  <div dangerouslySetInnerHTML={ {__html: data.preContent} }></div>
                  </Card.Text>
                  {/* <Card.Link href="#">이 글 자세히</Card.Link> */}
                {/* <Card.Link href="#">이 글 목록</Card.Link> */}
                </Card.Body>
                <div style={{padding: '10px'}}>
                {/* <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.goDetail(data)}>Detail</button> */}
                <button type="button" className="btn btn-outline-secondary btn-sm btn-br mr-10">
                  <Link to={{pathname:`/posts/detail`, search: `?id=${data.id}&groupType=${data.group_type}`}} className="btn-text-s">Detail</Link>
                </button>
                <button type="button" className="btn btn-outline-secondary btn-sm btn-br">
                <NavLink to={`/posts?groupType=${data.group_type}`} className="btn-text-s">
                    List
                  </NavLink>
                </button>

                </div>
              </Card>
            </Col>
         )

         }
          {/* {Array.from({ length: 12 }).map((_, idx) => (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Card title</Card.Title>
                  <Card.Text>
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit longer.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))} */}
        </Row>
              
      </div>
    );
  }
};

export default MainContents;