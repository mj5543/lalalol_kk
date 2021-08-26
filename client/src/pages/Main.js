import React from 'react';
import MainContents from '../components/contents/MainContents';
import Welcome from '../components/animation/Welcome';
// import LightHouse from '../components/animation/LightHouse';
import ShootingStar from '../components/animation/ShootingStar';
const Main = (props) => {
  return (
    <div style={{height: '100vh'}}>
      <Welcome />
      <ShootingStar />
      {/* <LightHouse /> */}
      {/* <MainContents props={props} /> */}

    </div>
  )
}

export default Main;