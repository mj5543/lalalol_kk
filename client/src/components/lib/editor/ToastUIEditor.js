import React, { Component } from "react";

import axios from "axios";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Prism from 'prismjs';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
// import 'prismjs/themes/prism.css';
// import "prismjs/themes/prism-tomorrow.css";
import './prism-tomorrow.css';

// import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
 

class ToastUIEditor extends Component {

  editorRef = React.createRef();

  constructor() {
    super();

    this.state = {
      content: "",
    };
    this.onChanged = this.onChanged.bind(this);
  }
  componentDidMount() {
    this._setEditorHTML(this.props.editContent);
  }
  _setEditorHTML(html) {
    this.editorRef.current.getInstance().setHTML(html);
  }
  onChanged() {
    this.props.onTemperatureChange({content: `${this.editorRef.current.getInstance().getHTML()}`});
  }
 

  render() {

    return (

      <>

        <Editor

          previewStyle="vertical"

          height="calc(100vh - 150px)"

          initialEditType="wysiwyg"

          placeholder="글쓰기"

          ref={this.editorRef}
          plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
          onChange={this.onChanged}
          // hooks={{
          //   addImageBlobHook: async (blob, callback) => {
          //     const upload = await this.uploadImage(blob);
          //     callback(upload, "alt text");
          //     return false;
          //   }
          // }}
        />


      </>

    );

  }

}

 

export default ToastUIEditor;