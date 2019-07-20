import React , {Component } from 'react';

import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { regitserUser } from '../../actions/authActions';
import { connect } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component{

  constructor(props){
    super(props);
    this.state ={
      name:"",
      email:"",
      password:"",
      password2:"",
      errors:{}
    };
  }

  onChange(e){
    this.setState({ [e.target.name] : e.target.value});
    
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.errors){
        this.setState({
            errors:nextProps.errors
        });
    }

  }
  
  onSubmit(e){
    e.preventDefault();

    const newUser={
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      password2:this.state.password2
    };

    this.props.regitserUser(newUser,this.props.history);
    
   
  }

  render(){
    
    const {errors} = this.state;
    
    return(
      <div>
           
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                  
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">Create your DevConnector account</p>

                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">

                      <input type="text" className={classnames("form-control form-control-lg",{
                        'is-invalid':errors.name
                      })}
                      placeholder="Name" name="name" value={this.state.name}
                      onChange={this.onChange.bind(this)} />

                      {errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </div>

                    <div className="form-group">

                      <input type="email" 
                      className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                      })} 
                      placeholder="Email Address" name="email"  value={this.state.email}
                      onChange={this.onChange.bind(this)} /> 
                      
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <input type="password" 
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                      })}
                      placeholder="Password" name="password" value={this.state.password} 
                      onChange={this.onChange.bind(this)}/>

                      {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                      )}
                    </div>

                    <div className="form-group">
                      <input type="password" 
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password2
                      })} 
                      placeholder="Confirm Password" name="password2" value={this.state.password2} 
                      onChange={this.onChange.bind(this)}/>
                      {errors.password2 && (
                        <div className="invalid-feedback">{errors.password2}</div>
                      )}
                    </div>

                    <input type="submit" className="btn btn-info btn-block mt-4" />
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Register.propTypes={
  regitserUser:propTypes.func.isRequired,
  user:propTypes.object.isRequired,
  errors:propTypes.object.isRequired
}

const mapStateToProps =(state) =>({
 auth:state.auth,
 errors:state.errors
});

export default connect(mapStateToProps ,{ regitserUser })(withRouter(Register));