import React, { Component } from 'react'
import './Template.css'
export class Template extends Component {
    constructor(props) {
        super(props);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }
    onChangeHandler(e) {
        if(typeof this.props.onchange == "function") this.props.onchange(e);
    }
    
       render() {
        return (
            <div className="template">
    <label className="label">{this.props.label}</label>
                <input className="input"id={this.props.id} type={this.props.type} value={this.props.value} disabled={this.props.disable} onChange={(e)=>this.props.onchange(e)} />
            </div>
        )
    }
}

export default Template
