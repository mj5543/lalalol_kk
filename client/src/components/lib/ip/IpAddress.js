import React, {Component} from "react";
// import axios from "axios";

class IpAddress extends Component {
    constructor() {
        super();

        this.state = {
            ip: "",
            locationInfo: ''
        };
    }

    componentDidMount = () => {
        this.getIpInfo();
    };

    getIpInfo = async() => {
      const ipData = await fetch('https://geolocation-db.com/json/'); 
      const locationIp = await ipData.json(); 
      console.log(locationIp);
      console.log(locationIp.IPv4);
    };
    
    render = () => {
      return (
        <div></div>
      );
        // let self = this;
        // if (self.state.loading) {
        //     return (
        //         <div className="App">
        //             <h1>Loading IP Address</h1>
        //         </div>
        //     );
        // } else {
        //     return (
        //         <div className="App">
        //             <h1>IP: {self.state.ip}, {self.state.country} </h1>
        //         </div>
        //     );
        // }

    };
}

export default IpAddress;