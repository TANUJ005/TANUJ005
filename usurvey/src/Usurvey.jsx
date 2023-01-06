import React, { Component } from "react";
import { v1 as uuidv1 } from 'uuid';
import './css/Usurvey.css'
import { initializeApp } from "firebase/app";


import "firebase/database"





const firebaseConfig = {
    apiKey: "AIzaSyC_wyYFzXlSvAoKM45u5eNM9QdxFPLUvoA",
    authDomain: "usurvey-f7ce5.firebaseapp.com",
    projectId: "usurvey-f7ce5",
    storageBucket: "usurvey-f7ce5.appspot.com",
    messagingSenderId: "526755723900",
    appId: "1:526755723900:web:3872f4e4f6ae41fd7927f9",
    measurementId: "G-22WB5XBJ43"
  };

const app = initializeApp(firebaseConfig);




class Usurvey extends Component{
    answersSubmitted(){
        
        firebaseConfig.database().ref('https://usurvey-f7ce5-default-rtdb.firebaseio.com/' +this.state.uid).set({
            studentName: this.state.studentName,
            answers: this.state.answers
        });
           this.setState({isSubmitted :true}); 
    }
    clickHandler(event){
        
        this.setState({studentName:  this.input.current.value});

    }
    answerSelected(event){
        var answers = this.state.answers;
        if(event.target.name === 'answer1'){
            answers.answer1 = event.target.value;
        }else if(event.target.name === 'answer2'){
            answers.answer2 = event.target.value;
        }else if(event.target.name === 'answer3'){
            answers.answer3 = event.target.value;
        }
        this.setState({answers : answers ,function(){
            console.log(this.state.answers)
        }})
    }

    
    
    constructor(props){
        super(props);
        this.input = React.createRef();

        this.state = {
            uid: uuidv1(),
            studentName: "",
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''

            }, 
            isSubmitted: false,
          
            

        }
        this.clickHandler = this.clickHandler.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.answersSubmitted = this.answersSubmitted.bind(this);
        
    }
   render(){
    var studentName;
    var questions;
     

     if(this.state.studentName===''&& this.state.isSubmitted===false){
            
        studentName = <div>
            <h1>Enter Your Name</h1>
            <form onSubmit={this.clickHandler}>
                <input type='text' ref={this.input} placeholder="Enter your Name" required ></input><br />
                <button type="submit" className="subbut">Proceed</button>
            </form>
        </div>;
       
    }else if(this.state.studentName !== '' && this.state.isSubmitted === false)
    {
    
        studentName = <h1>Welcome {this.state.studentName}</h1>
        questions = <div className="questions">
            <form onSubmit={this.answersSubmitted}>
                <div className="qone" >
                <label>you are :</label><br />
                <input type="radio" name="question1" value="working" onChange={this.answerSelected}></input>Working
                <input type="radio" name="question1" value="student" onChange={this.answerSelected}></input>Student
                <input type="radio" name="question1" value="Intern" onChange={this.answerSelected}></input>Intern<br />
                </div>
                
                <div className="qtwo">
                <label>What is your Primary Skill :</label><br />
                <input type="radio" name="question2" value="reactjs" onChange={this.answerSelected}></input>React JS
                <input type="radio" name="question2" value="angular" onChange={this.answerSelected}></input>Angular
                <input type="radio" name="question2" value="java" onChange={this.answerSelected}></input>Java
                <input type="radio" name="question2" value="python" onChange={this.answerSelected}></input>python
                </div>

                <div className="qthree">
                <label>Declaration :</label><br />
                <input type="radio" name="question3" value="declaration" onChange={this.answerSelected} ></input>I hereby declare that information provided by me in this form is correct and I will show the supporting documents whenever required.
                </div>

                

                <input className="subbut" type="submit" value="submit"></input>
                
                
                
            </form>
        </div>

       
    }
    else if(this.state.isSubmitted ===true){
        studentName =<div>
            <h2>Details Submitted </h2>
           
        </div>
    }

                
    return(
        <div>
               {studentName}
               {questions}
             
               
             
               
               
          
      
        </div>
    );
   }
}
export default Usurvey;