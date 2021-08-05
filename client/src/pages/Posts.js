import React from 'react';
import PostList from '../components/posts/PostList';
import PostDetail from '../components/posts/PostDetail';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Posts = (props) => {
  console.log('Posts props ::', props);
  let elements = '<div></div>'
  if(props.location.search !== "") {
    const hashArr = props.location.search.split('?id=');
    elements = <PostDetail postId={hashArr[1]} isRegist={false} userInfo={props.userInfo} location={props.location} history={props.history}  matchUrl={props.match.url} />
  } else if(props.location.hash !== "") {
      elements = <PostDetail  isRegist={true} userInfo={props.userInfo} location={props.location} history={props.history} matchUrl={props.match.url} />
  } else {
      elements = <PostList pathInfo={props.match} />
  }

  return (
    <main className="content">
      <div className="container-fluid p-0">

        {/* <h1 className="h3 mb-3">Post Page</h1> */}

        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-header">
                {/* <h5 className="card-title mb-0">Empty card</h5> */}
              </div>
              <div className="card-body">
                {elements}
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}
const mapStateToProps = state => ({
  logged: state.users.logged,
  userInfo: state.users.userInfo
});
export default withRouter(
  connect(
    mapStateToProps,
  )(Posts)
);
// export default Posts;