import React from 'react';
import Code from '../../../lib/code/PrismCode';

const html = ``;
const containerStyle = {
  width: '100%',
  height: '100vh',
  float: 'right',
  backgroundColor: '#f1f1f1',
  padding: '20px'
}
const ReactEvent = () => {
  const code1 = `class Robot extends React.Component {
    render(){
      return (
        <button onClick={this.doAction}>Action!</button>
      )
    }
    doAction(){
      alert("ok");
    }
  }
  
  ReactDOM.render(<Robot />, document.getElementById("root"));`;
  const code2 = `doAction = () => {
    alert(this);
  }
  constructor(props) {
    super(props)
    this.doAction = this.doAction.bind(this)	// constructor 에서 bind 함.
  }
    
  doAction() {
    alert(this);
  }`;
  const code3 = `class Robot extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
      return (
        <button onClick={() => this.doAction("run") }>Action!</button>
      )
    }
    doAction = (action)=>{
      alert(this.props.def_action + " -> " + action);
    }
  }
  
  ReactDOM.render(<Robot def_action="walk" />, document.getElementById("root"));`;
  const code4 = ` render(){
    return (
      <button onClick={this.doAction.bind(this, "run") }>Action!</button>
    )
  }
 <button onClick={this.doAction.bind(this, "run") }>Action!</button> // 버튼클릭 시 작동
 <button onClick={this.doAction(this, "run") }>Action!</button>      // 페이지 load 시 작동`;
 const code5 = `class Robot extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <button onClick={this.doAction.bind(this, "run") }>Action!</button>
    )
  }
  doAction = (action, lastParamIsEventObject)=>{
    alert(this.props.def_action + " -> " + action + " : " + lastParamIsEventObject.type);
  }
}

ReactDOM.render(<Robot def_action="walk" />, document.getElementById("root"));`;
const code6 = `render(){
  return (
    <button onClick={(evnt)=>this.doAction("run", evnt) }>Action!</button>
  )
}`;
  return (
    <div style={containerStyle} className="overflow-auto">
      <div dangerouslySetInnerHTML ={{__html: html}} />
      <p><strong>기본적인 이벤트 사용</strong></p>
      <Code code={code1} language="javascript" />

      <p><strong>doAction  안에서 this 를 Bind 하고 싶을 때.</strong></p>
      <Code code={code2} language="javascript" />

      <p><strong>파라메터 전송</strong></p>
      <p>1. 이벤트를 arrow function&nbsp;</p>
      <Code code={code3} language="javascript" />
      <p>2. 이벤트에서 bind</p>
      <Code code={code4} language="javascript" />

      <p><strong>Event Object </strong></p>
      <Code code={code5} language="javascript" />
      <p>명시적</p>
      <Code code={code6} language="javascript" />
    </div>
  );

};
export default ReactEvent;