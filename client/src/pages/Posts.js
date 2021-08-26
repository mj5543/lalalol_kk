import React from 'react';
import PostList from '../components/posts/PostList';
import PostDetail from '../components/posts/PostDetail';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import queryString from 'query-string';

const Posts = (props) => {
  console.log('Posts props ::', props);
  let elements = '<div></div>'
  const query = queryString.parse(props.location.search);
  if(query.id) {
    elements = <PostDetail categoryGroups={props.categoryGroups} postId={query.id} groupType={query.groupType} isRegist={false} userInfo={props.userInfo} location={props.location} history={props.history}  matchUrl={props.match.url} />
  } else if(props.location.hash !== "") {
      elements = <PostDetail categoryGroups={props.categoryGroups} isRegist={true} groupType={query.groupType} userInfo={props.userInfo} location={props.location} history={props.history} matchUrl={props.match.url} />
  } else {
      // props.history.replace(props.history.location)
      elements = <PostList categoryGroups={props.categoryGroups} pathInfo={props.match} userInfo={props.userInfo} groupType={query.groupType} location={props.location} history={props.history} />
  }

  return (
    <main className="content" style={{backgroundColor: '#fff'}}>
      <div className="container p-0" style={{maxWidth: '960px'}}>

        {/* <h1 className="h3 mb-3">Post Page</h1> */}

        <div className="row">
          <div className="col-12">
            <div className="card">
              {/* <div className="card-header">
                <h5 className="card-title mb-0">Empty card</h5>
              </div> */}
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
  userInfo: state.users.userInfo,
  categoryGroups: state.users.categoryGroups,
});
export default withRouter(
  connect(
    mapStateToProps,
  )(Posts)
);
// export default Posts;