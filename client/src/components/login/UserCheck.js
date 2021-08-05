import React, { Component } from 'react';

class UserCheck extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      quantity: 1,
      totalAmount: 0
    };
  };


componentDidMount() {
    // this.props.getUsers();
//cart state가 local storage에 있으면 불러오기
    // let cart = localStorage.cart;
    // if(cart) {
    //     this.setState(prevState => ({
    //     cart: JSON.parse(cart)
    //     }), function() {
    //     this.sumTotalAmount();
    //     })
    // }
  };
  render() {
    return (
      <div></div>
    )
  }
}

export default UserCheck;
