import React, { Component } from 'react';
import axios from 'axios';
import { uploadFile } from 'react-s3';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromHTML, ContentState, AtomicBlockUtils } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import {isEmpty} from 'lodash';

class DraftEditor extends Component {
  constructor(props) {
    console.log('BoardDetail props--', props);
    super(props);
    this.state  = {
      editorState: EditorState.createEmpty(),
      content: '',
      editContent: '',
      tempFileType: ''
    };
    this.handleChange = this.handleChange.bind(this);
    // this.uploadImageCallBack = this.uploadImageCallBack(this);
  }
  componentDidMount() {
    this.calcState(this.props.editContent);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('prevState ', prevState);
    console.log('prevProps ', prevProps);
  }
  handleChange(e) {
    this.props.onTemperatureChange(`${e}`);
  }
  calcState(value) {
    if (value) {
      console.log(value)
      const blocksFromHTML = convertFromHTML(value);
      console.log('contentBlocks', blocksFromHTML.contentBlocks)
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap,
      );
      this.setState({
        editorState: EditorState.createWithContent(state)
      })
    }
  }
  insertImageBlock() {
    const contentState = this.state.editorState.getCurrentContent();
    console.log(
      "contentStateRaw",
      JSON.stringify(convertToRaw(contentState), null, 2)
    );
    console.log('this.state.tempFileType--', this.state.tempFileType);
    const contentStateWithEntity = contentState.createEntity(
      this.state.tempFileType,
      "IMMUTABLE",
      // { src: this.props.tempImageUrl }
    );
    const newEditorState = EditorState.set(this.state.editorState, {
      currentContent: contentStateWithEntity
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const insertedEditorState = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      " "
    );
    this.setState({
      editorState: insertedEditorState
    });
  }
  _getData = async() => {
    const res = await axios.get(`/api/posts/detail?id=${this.props.postId}`);
    console.log('/api/posts/detail', res)
    if(res.data.result.length > 0) {
      this.setState({
        title: res.data.result[0].subject,
        content: res.data.result[0].content
      }) 
  
    }
  }
  onEditorStateChange = (currentState) => {
    // editorState에 값 설정
    this.setState({
      editorState: currentState
    });
    const htmlContent = draftToHtml(convertToRaw(currentState.getCurrentContent()));
    console.log('htmlContent', htmlContent)
    this.handleChange(htmlContent);
    // this.props.changedContent = draftToHtml(convertToRaw(currentState.getCurrentContent()));

  };
  editContent = (content) => {
    this.setState({
      editContent: content
    }) 

  }
  uploadImageCallBack = (file) => {
    console.log('file---', file)
    this.setState({
      tempFileType: file.type
    }) 
    const awsconfig = {
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      region: process.env.REACT_APP_AWS_REGION,
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    }
    // this.insertImageBlock()
    return new Promise((resolve, reject) => {
      console.log('resolve file---', file);
      uploadFile(file, awsconfig)
        .then(res => {
          console.log(res)
          resolve({ data: { link: res.location } });
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
      }
    );
  }
  render(){
    return (
      <div>
      <Editor
        // 에디터와 툴바 모두에 적용되는 클래스
        wrapperClassName="wrapper-class"
        // 에디터 주변에 적용된 클래스
        editorClassName="editor"
        // 툴바 주위에 적용된 클래스
        toolbarClassName="toolbar-class"
        // 툴바 설정
        toolbar={{
          // inDropdown: 해당 항목과 관련된 항목을 드롭다운으로 나타낼것인지
          inline: { inDropdown: false },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: false },
          image: { 
            uploadCallback: this.uploadImageCallBack,
            inputAccept: 'image/*',
            previewImage: true,
            urlEnabled: false,
            uploadEnabled: true,
            alt: { present: false, mandatory: false } 
          },
        }} 
        placeholder="내용을 작성해주세요."
        // 한국어 설정
        localization={{
          locale: 'ko',
        }}
        spellCheck
        // 초기값 설정
        editorState={this.state.editorState}
        // 에디터의 값이 변경될 때마다 onEditorStateChange 호출
        onEditorStateChange={this.onEditorStateChange}
      />      
      </div>
    )
  }
}
export default DraftEditor;