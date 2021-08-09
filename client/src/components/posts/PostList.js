import React, { Component } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Route, Link } from 'react-router-dom';
import BoardDetail from './PostDetail';
import Nav from 'react-bootstrap/Nav';
import moment from 'moment';
import DataTable from "react-data-table-component";
import {isEmpty} from 'lodash';

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
      bodyEle: '',
      loading: true,
      dataList: [],
      groupType: '',
      columns: [],
      writeButton: ''

    };  // 초기 state값을 셋팅해준다. 빈 스트링 값은 false를 뜻한다.
  }
  componentDidMount() {
    // if(!isEmpty(this.props.location.state) && this.props.location.state.groupType) {
    //   this.setState({groupType: this.props.location.state.groupType});
    // }
    this.setState({
      groupType: this.props.groupType,
      columns: this._getDataColumns()
    });

    this._getCateroeyList();
    // this._getList();
  }
  componentDidUpdate() {
    if(this.state.groupType !== this.props.groupType) {
      this.setState({
        groupType: this.props.groupType,
        columns: this._getDataColumns()
      });
      this._setWriteButton();
      this._getCateroeyList();
    }
    console.log('componentDidUpdate--', this.props);

  }
  _setWriteButton() {
    if(isEmpty(this.props.userInfo)) {
      return;
    }
    let btnEl = ''
    if (this.props.groupType !== 'GEUST' && this.props.userInfo.grade === 'MASTER') {
      btnEl =  <button type="button" className="btn btn-dark btn-sm btn-fr">
              <Link to={`${this.props.pathInfo.url}?groupType=${this.props.groupType}#write`} className="text-white" style={{textDecoration: 'none'}}>글쓰기</Link>
              </button>
    } else if (this.props.groupType === 'GEUST') {
      btnEl =  <button type="button" className="btn btn-dark btn-sm btn-fr">
              <Link to={`${this.props.pathInfo.url}?groupType=${this.props.groupType}#write`} className="text-white" style={{textDecoration: 'none'}}>글쓰기</Link>
              </button>
    }
    this.setState({
      writeButton: btnEl
    })
  }
  _getDataColumns() {
    return [
      {
        name: "작성자",
        selector: "name",
        sortable: true,
        grow: 1,
      },
      {
        name: "글 제목",
        selector: "subject",
        sortable: true,
        compact: false,
        grow: 8,
        cell: d => <Link to={{pathname:`${this.props.pathInfo.url}/detail`, search: `?id=${d.id}&groupType=${this.props.groupType}`}} className="nav-link text-dark">
        <td>{d.subject}</td>
      </Link>
      },
      {
        name: "작성일",
        selector: "created_at",
        sortable: true,
        right: false,
        grow: 1,
        format: d => moment(d).format('YYYY.MM.DD'),
        // cell: d => <span>{moment(d).format('YYYY.MM.DD')}</span>,
      }
    ]
  }
  
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
  _getCateroeyList = async() => {
    const res = await axios.get(`/api/posts/category-list?groupType=${this.props.groupType}`);
    console.log('_getList--', res)
    // const bodyEle = this.boardList(res.data.result);
    this.setState({
      // bodyEle: bodyEle,
      loading: false,
      dataList: res.data.result
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
  customStyles = () => {
    return {
      rows: {
        style: {
          minHeight: '35px', // override the row height
        }
      },
      headCells: {
        style: {
          minHeight: '40px', // override the row height
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
          fontSize: '13px',
          fontWeight: 'bold',
          lineHeight: '30px'
        },
      },
      cells: {
        style: {
          paddingLeft: '3px', // override the cell padding for data cells
          paddingRight: '3px',
        },
      },
    };
  }
  darkTheme = () => {
    return {
      title: {
        fontSize: '22px',
        fontColor: '#FFFFFF',
        backgroundColor: '#363640',
      },
      contextMenu: {
        backgroundColor: '#E91E63',
        fontColor: '#FFFFFF',
      },
      header: {
        fontSize: '12px',
        fontColor: '#FFFFFF',
        backgroundColor: '#363640',
      },
      rows: {
        fontColor: '#FFFFFF',
        backgroundColor: '#363640',
        borderColor: 'rgba(255, 255, 255, .12)',
        hoverFontColor: 'black',
        hoverBackgroundColor: 'rgba(0, 0, 0, .24)',
      },
      cells: {
        cellPadding: '5px',
      },
    }

  }
  render() {
    return (
      <div>
        {/* <Route path={`${this.props.pathInfo.url}/:type`} component={BoardDetail}/> */}
        <div className="clearfix mb-2">
          {this.state.writeButton}
          {/* <button type="button" className="btn btn-dark btn-sm btn-fr">
            <Link to={`${this.props.pathInfo.url}?groupType=${this.state.groupType}#write`} className="text-white" style={{textDecoration: 'none'}}>글쓰기</Link>
          </button> */}
        </div>
        <div className="card">
          <DataTable
            columns={this.state.columns}
            data={this.state.dataList}
            responsive={true}
            // customTheme={this.darkTheme()}
            customStyles={this.customStyles()}
            defaultSortAsc={false}
            pagination
            paginationPerPage={15}
            highlightOnHover
          />
          {/* <Table striped bordered hover size="sm">
            <colgroup>
              <col width="20%"></col>
              <col width="65%"></col>
              <col width="15%"></col>
            </colgroup>
            <thead>
              <tr>
                <th>작성자</th>
                <th>글 제목</th>
                <th>작성일</th>
              </tr>
            </thead>
            {this.state.bodyEle}
          </Table> */}
        </div>
      
      </div>
    );
  }
};

export default PostList;