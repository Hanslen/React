import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Input from './Input/Input';

class App extends Component {
  inputChangedHandler = (e) => {
    e.preventDefault();

  }
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.logForm
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;
    // console.log(updatedFormElement.valid);
    let formIsValid = true;
    for(let inputIdentifier in updatedForm){
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({logForm: updatedForm,formIsValid: formIsValid});
  }
  checkValidity(value, rules){
    let isValid = true;
    if(!rules){
      // console.log("No rules");
      return true;
    }
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }
    if(rules.isEmail){
      // console.log("Checking Email");
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    if(rules.isPhone){
      //isnumeric check, acutally it is not a phone check
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    //other possible rules
    // if (rules.minLength) {
    //     isValid = value.length >= rules.minLength && isValid
    // }

    // if (rules.maxLength) {
    //     isValid = value.length <= rules.maxLength && isValid
    // }
    return isValid;
  }
  state = {
    formIsValid: false,
    logForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Please enter your email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      phone: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Please enter your phone'
        },
        value:'',
        validation: {
          required: true,
          isPhone: true
        },
        valid: false,
        touched: false
      }
    }
  }
  render() {
    const formElementsArray = [];
    for(let key in this.state.logForm){
      formElementsArray.push({
        id: key,
        config: this.state.logForm[key]
      });
    }
    return (
      <div className="App">
        <form onSubmit={this.test}>
          {
            formElementsArray.map(formElement => (
              <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
            ))
          }
          <button disabled={!this.state.formIsValid}>Submit</button> 
        </form>
      </div>
    );
  }
}

export default App;
