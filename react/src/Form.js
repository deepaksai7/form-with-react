import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom';
import Template from './Template'
import Thankyou from './Thankyou'
import './Form.css'

class Form extends Component {
    constructor(props) {
        super(props)
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAgeChange = this.handleAgeChange.bind(this);
        this.handleRetrieveEmailChange = this.handleRetrieveEmailChange.bind(this);
        
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            age: '',
            buttonclicked:false,
            retrieve_email:'',
            rfname:'',
            rlname:'',
            remail:'',
            rage:'' 
        }
    
    }
    randomNumber=(min,max)=> {
        return Math.floor(Math.random()*max)+min;
    }

    createStars=(type,quantity)=>{
         for(let i=0;i<quantity;i++){
             var star=document.createElement('div');
             star.classList.add('star',`type-${type}`);
             star.style.left=`${this.randomNumber(1,99)}%`;
             star.style.bottom=`${this.randomNumber(1,99)}%`;
             star.style.animationDuration=`${this.randomNumber(50,200)}s`;
             document.body.appendChild(star);
         }
         
    }
    
   

    UNSAFE_componentWillMount(){
       
        this.createStars(1,150); 
        this.createStars(2,85); 
        this.createStars(3,70); 
        
    }
    

    setdisable = (id, a) => {
        document.getElementById(id).disabled = a;
    }
    handleFirstNameChange = (event) => {
        
        let f = event.target.value;
        let regName = /^[a-zA-Z '.-]*$/;
        if (f === "") {
            this.setState({

                firstname: ''
                
            })
            this.setdisable("lastname", true);

        }


        if (!regName.test(f)) {
            this.setdisable("lastname", true);
            // document.getElementById("lastname").disabled=true; 
        } else {
            this.setdisable("lastname", false);
            //document.getElementById("lastname").disabled=false;
            this.setState({

                firstname: event.target.value
            })
        }


    }
    handleLastNameChange = (event) => {
        let f = event.target.value;
        let regName = /^[a-zA-Z '.-]*$/;
        if (f === "") {
            this.setState({

                lastname: ''
            })

        }
        if (!regName.test(f)) {
            this.setdisable("email", true);
            // document.getElementById("email").disabled=true;    
        } else {
            this.setdisable("email", false);
            //document.getElementById("email").disabled=false; 
            this.setState({

                lastname: event.target.value
            })
        }
    }
    handleEmailChange = (event) => {
        this.setState({
            email: event.target.value
        })
        let f = event.target.value;
        let regName = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (f === "") {
            this.setState({

                email: ''
            })

        }
        if (!regName.test(f)) {
            this.setdisable("age", true);
            // document.getElementById("age").disabled=true;    
        } else {
            this.setdisable("age", false);
            //document.getElementById("age").disabled=false; 
            this.setState({

                email: event.target.value
            })
        }
    }
    handleAgeChange = (event) => {
        let f = event.target.value;
        let regName = /^[1-9]?[0-9]{1}$|^100$/;
        if (f === "") {
            this.setState({

                age: ''
            })

        }
        if (!regName.test(f)) {
            this.setdisable("button", true);
            // document.getElementById("button").disabled=true;    
        } else {
            this.setdisable("button", false);
            //document.getElementById("button").disabled=false; 
            this.setState({

                age: event.target.value
            })
        }
    }



    handleSubmit = async event => {
        event.preventDefault();

        const fname = this.state.firstname;
        const lname = this.state.lastname;
        const em = this.state.email;
        const a = this.state.age;
       
        const data = { fname, lname, em, a };
        const options = {
            method: 'POST',
            
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        const response = await fetch('http://localhost:8001/api', options);
        const json = await response.json();

        console.log(json)


    }
    //....................................................................................
    handleRetrieveEmailChange = (event) => {
        this.setState({
            retrieve_email: event.target.value
        })
        let f = event.target.value;
        let regName = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (f === "") {
            this.setState({

                email: ''
            })

        }
        if (!regName.test(f)) {
           
              
        } else {
             
            this.setState({

               retrieve_email: event.target.value
            })
        }
    }
    handleRetrieve = async event => {
        console.log("inside handle retrieve");
        event.preventDefault();
       const rem=this.state.retrieve_email;
        
        
        const options = {
            method: 'POST',
    
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({rem:rem})
            
        }
        var rjson;
         await fetch('http://localhost:8001/retrieve', options)
        .then((res)=> { console.log("type is "+typeof(rjson));
            return res.json()
        }).then((res)=>{
            rjson=JSON.parse(res.body)
            console.log("rjson is "+rjson.FirstName);
        
        })
      
       
      
        this.setState({
            rfname:rjson.FirstName,
            rlname:rjson.LastName,
            remail:rjson.Email,
            rage:rjson.Age
        })
    
        ReactDOM.render(
             <Fragment>
                 <div className="retrieveForm">
                 <h1>The details are: </h1>
                 <br/>
        <label>First name: {this.state.rfname}</label><br/>
        <label>Last name: {this.state.rlname}</label><br/>
        <label>Email: {this.state.remail}</label><br/>
        <label>Age: {this.state.rage}</label><br/>
        </div>
             </Fragment>
        ,document.getElementById("retrieve"))
        
       
    }
    render() {
        console.log('render called');
        return (
            <Fragment>
                <form onSubmit={this.handleSubmit} className="form">
                    <Template id="firstname" label='First Name' value={this.state.firstname} disable={false} onchange={this.handleFirstNameChange} />
                    <Template id="lastname" label='Last Name' value={this.state.lastname} disable={true} onchange={this.handleLastNameChange} />
                    <Template id="email" label='E-mail' value={this.state.email} disable={true} onchange={this.handleEmailChange} />
                    <Template id="age" label='Age' value={this.state.age} disable={true} onchange={this.handleAgeChange} />
                    <Template id="button" type='submit' disable={true} />
                   

                </form>
                {this.state.firstname && <Thankyou fname={this.state.firstname} lname={this.state.lastname} em={this.state.email} a={this.state.age} />}
                <form onSubmit={this.handleRetrieve} className="retrieveform">
                <Template id="retrieve_email"  label='Enter Email to retrieve data' value={this.state.retrieve_email} disable={false} onchange={this.handleRetrieveEmailChange} />
                <Template id="button2" type='submit' disable={false} />
                </form>
            </Fragment>
        )
    }
}

export default Form;
