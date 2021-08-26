import React, { Component } from "react";
import {isEmpty} from 'lodash';
import { Main } from "../../pages";

export class ContentsDetail extends Component {
  constructor(props) {
    super(props);
    console.log('ContentsDetail props:::', props);
    this.state = {
      contentType: '',
      viewContent: '',
    }
  }
  componentDidMount() {
    let viewContent = '';
    if(this.props.location.pathname === '/') {
      viewContent = <Main props={this.props} />
    }
    this.setState({
      viewContent: viewContent
    })
  }

  render() {
    return <div>{this.state.viewContent}</div>;
  }
}

export default ContentsDetail;
