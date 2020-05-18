import React, { Component } from 'react'
import './Form.css'
export class Thankyou extends Component {
  constructor(props){
    super(props)

  }
  render() {
    
    return (
      
      <div className="thankyou">
      <h1>Details entered:</h1>
      
    <label>First Name: {this.props.fname}</label>
    
      <br/>
      <label>Last Name: {this.props.lname}</label>
      <br/>
      <label>E-mail: {this.props.em}</label>
      <br/>
      <label>Age: {this.props.a}</label>
      <br/>
      </div>
    )
  }
}

export default Thankyou
