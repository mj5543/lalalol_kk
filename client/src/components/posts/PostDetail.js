import React, { Component } from 'react';
import axios from 'axios';
import DraftEditor from '../lib/editor/DraftEditor';
import Modal from 'react-bootstrap/Modal'
import { uploadFile } from 'react-s3';
import CounterContainer from '../CounterContainer'; 
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { isEmpty } from 'lodash';
import queryString from 'query-string';

class PostDetail extends Component {
  constructor(props) {
    console.log('BoardDetail props--', props, process.env);
    super(props);
    this.state  = {
      title: '',
      content: '',
      file: null,
      image: '',
      email: '',
      editContent: '',
      mode: 'read',
      saveButtonText: '수정',
      actionButtonText: '목록',
      id: '',
      modalShow: false,
      updateBtnEl: '',
    };
    // this.childRef = useRef();
    // this.callChildFunc = useCallback(() => {
    //   console.log(childRef.current.getAlert()); // 자식 컴포넌트 함수 호출
    //   console.log(childRef.current.getRowId()); // 자식 컴포넌트 데이터 가져오기
    // });
    this.modeChange = this.modeChange.bind(this);
    this.actionModeChange = this.actionModeChange.bind(this);
    this.changedContent = this.changedContent.bind(this);
    // this.titleChanged = this.titleChanged.bind(this);
  }
  componentDidMount() {
    const {location, history} = this.props;
    //TODO
    const query = queryString.parse(location.search);
    // if(!state){
    //   history.push('/');
    // }
    console.log('PostDetail - componentDidMount ::', location, history, query);
    if(this.props.postId) {
      this._getData();
    } else {
      const updateBtnEl = <button type="button" className="btn btn-dark btn-sm float-end ms-1" onClick={this.modeChange}>저장</button>;
      this.setState({
        mode: 'modify',
        saveButtonText: '저장',
        actionButtonText: '취소',
        updateBtnEl: updateBtnEl
      })
    }
  }
  componentWillUpdate () {
    // this.modeChange(mode);
  }
  _getData = async() => {
    const res = await axios.get(`/api/posts/detail?id=${this.props.postId}`);
    console.log('/api/posts/detail', res)
    let updateBtnEl = '';
    if(res.data.result.length > 0) {
      // updateBtnEl = <button type="button" className="btn btn-dark btn-sm float-end ms-1" onClick={this.modeChange}>{this.state.saveButtonText}</button>;
      if(!isEmpty(this.props.userInfo) && (this.props.userInfo.email === res.data.result[0].email || res.data.result[0].email === 'test@mail')) {
        updateBtnEl = <button type="button" className="btn btn-dark btn-sm float-end ms-1" onClick={this.modeChange}>{this.state.saveButtonText}</button>;
      }
      this.setState({
        title: res.data.result[0].subject,
        content: res.data.result[0].content,
        id: res.data.result[0].id,
        image: res.data.result[0].image,
        email: res.data.result[0].email,
        updateBtnEl: updateBtnEl
      }) 
    
    }
  }
 
  changedContent(html) {
    this.setState({
      content: html
    });
  }
  actionModeChange() {
    const {history} = this.props;
    if(this.state.actionButtonText === '목록') {
      history.push(this.props.matchUrl);
    } else {
      this.setModalShow(true);
    }
  }
  goList() {
    const {history} = this.props;
    this.setModalShow(false);
    history.push(this.props.matchUrl);
  
  }
  modeChange() {
    if(this.state.mode === 'read') {
      this.setState({
        mode: 'modify',
        saveButtonText: '저장'
      })
    } else {
      if(this.props.isRegist) {
        this._registContent();
      } else {
        this._updateContent();
      }
    }
  }  
  titleChanged = (e) => {
    this.setState({
      title: e.target.value
    })
  }
  async _registContent() {
    const now = new Date();
    const params = {
      name: this.props.userInfo.username,
      email: this.props.userInfo.email,
      password: '1111',
      subject: this.state.title,
      content: this.state.content,
      ip: '',
      created_at: now
    }
    await axios.post('/api/posts/regist', params);
    console.log('complete!');
    const {history} = this.props;
    history.push(this.props.matchUrl);
  }
  async _updateContent() {
    // const params = {
    //   title: this.state.title,
    //   content: this.state.content,
    //   id: this.state.id,
    //   file: this.state.file
    // }
    const formData = new FormData();
    formData.append(`name`, this.props.userInfo.username);
    formData.append(`email`, this.props.userInfo.email);
    formData.append(`file`, this.state.file);
    formData.append(`title`, this.state.title);
    formData.append(`content`, this.state.content);
    formData.append(`id`, this.state.id);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    await axios.post('/api/posts/update', formData, config);
    this.setState({
      mode: 'read',
      saveButtonText: '수정'
    })
    this._getData();
    console.log('complete!');
  }
  _editorElement() {
    return <div>
      {/* <div className="row mb-3">
        <label for="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm">Email</label>
        <div className="col-sm-10">
          <input type="email" className="form-control form-control-sm" id="colFormLabelSm" placeholder="col-form-label-sm" />
        </div>
      </div> */}
        <div className="input-group mb-3">
          <span className="input-group-text" id="inputGroup-sizing-default">Title</span>
          <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" 
            value={this.state.title}
            onChange={this.titleChanged}
          />
        </div>
        <DraftEditor
          editContent={this.state.content}
          tempImageUrl={this.state.tempImageUrl}
          onTemperatureChange={this.changedContent}
        />
    </div>
  }

  setModalShow(isShow) {
    this.setState({
      modalShow: isShow
    })
  }
  render(){
    let contentElement;
    console.log('__dirname--', __dirname);
    console.log('process.env.REACT_APP_S3_BUCKET_NAME--', process.env.REACT_APP_S3_BUCKET_NAME);
    if(this.state.mode !== 'read') {
      contentElement = this._editorElement();
    } else {
      const imageurl = `${this.state.image}`;
      contentElement = <div>
        <div style={{marginBottom: '20px'}}><h2>{this.state.title}</h2></div>
        <div dangerouslySetInnerHTML={ {__html: this.state.content} }></div>
        <img src={`${process.env.PUBLIC_URL}/uploads/${imageurl}`} />
        </div>;
    }
    return (
      <div>
        {/* <CounterContainer /> */}
        <div className="clearfix mb-2">
          {this.state.updateBtnEl}
          <button type="button" className="btn btn-dark btn-sm float-end ms-1" onClick={this.actionModeChange}>{this.state.actionButtonText}</button>
        </div>
        {contentElement}
        <MyVerticallyCenteredModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          onHideConfirm={() => this.goList()}
        />
        {/* <div dangerouslySetInnerHTML={ {__html: this.state.content} }></div> */}
      </div>
    )
  }
}
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <h4>글 작성 취소</h4>
        <p>
          글 작성을 취소하시겠습니까?
        </p>
      </Modal.Body>
      <Modal.Footer>
      <button type="button" className="btn btn-dark btn-sm float-end ms-1" onClick={props.onHide}>취소</button>
        <button type="button" className="btn btn-dark btn-sm float-end ms-1" onClick={props.onHideConfirm}>확인</button>
        {/* <Button onClick={props.onHide}>Close</Button> */}
      </Modal.Footer>
    </Modal>
  );
}
const mapStateToProps = state => ({
  logged: state.users.logged,
  userInfo: state.users.userInfo
});
export default withRouter(
  connect(
    mapStateToProps,
  )(PostDetail)
);
// export default PostDetail;