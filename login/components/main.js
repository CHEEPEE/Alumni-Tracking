class MainContainer extends React.Component {
  state = {
    tabs: [<Login context={this} />, <Register context={this} />],
    tabIndex: 0
  };
  switchTab = () => {
    alert("sfsf");
  };
  render() {
    return (
      <React.Fragment>{this.state.tabs[this.state.tabIndex]}</React.Fragment>
    );
  }
}

class Login extends React.Component {
  state = {
    userName: "",
    password: ""
  };
  login = () => {
    console.log(this.state);
    ajaxHandler({ ...this.state, requestType: "auth" }, data => {
      if (isSuccess(data)) {
        window.location.href = "../admin";
      } else {
        alert("login Failed");
      }
    });
  };
  render() {
    return (
      <div className="card border-0 p-3 shadow" style={{ width: "30rem" }}>
        <div className="card-body">
          <div className="row pl-3">
            <h3>Login</h3>
          </div>
          <div className="row w-100 mt-3">
            <form
              id="loginForm"
              className="w-100 pl-3"
              onSubmit={e => {
                e.preventDefault();
                this.login();
              }}
            >
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="exampleInputEmail1"
                  onChange={text => {
                    this.setState({
                      userName: text.target.value
                    });
                  }}
                  defaultValue={this.state.password}
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  onChange={text => {
                    this.setState({
                      password: text.target.value
                    });
                  }}
                  defaultValue={this.state.password}
                  className="form-control form-control-sm"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
              {/* <div className="form-group form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label className="form-check-label" for="exampleCheck1">
                  Check me out
                </label>
              </div> */}
              <button type="submit" className="btn btn-sm btn-primary">
                Login
              </button>
            </form>
            {/* <div className="mt-2 pl-3 d-flex justify-content-center">
              <small>
                Need Account?{" "}
                <a
                  href="#"
                  onClick={() => {
                    this.props.context.setState({ tabIndex: 1 });
                  }}
                >
                  Register
                </a>
              </small>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

class Register extends React.Component {
  state = {
    studentId: "",
    password: "",
    confirmPassword: "",
    alert:"",
    email:"",
  };
  register = () =>{
    if(this.validate()){
      ajaxHandler({ ...this.state, requestType: "registerAccount" }, data => {
        if (isSuccess(data)) {
          window.location.href = "../admin";
        } else {
          alert("Register Failed");
          console.log(data)
        }
      });
    }
  }

  confirmPassword =()=>{
    if(document.querySelector("#password").value !== document.querySelector("#confirmPassword").value){
        this.setState({
          alert:"Password doesn't match"
        })
    }else{
      this.setState({
        alert:""
      })
    }
  }
  validateId = () =>{
    ajaxHandler({ studentId:document.querySelector("#studentId").value, requestType: "findId" }, data => {
      if (data.trim() == "Already Exist") {
        this.setState({
          alert:"ID taken"
        })
      }else{
        this.setState({
          alert:""
        })
      }
    });
  }
  validate(){
    if(this.state.alert.trim()==0){
      return true
    }
    return false
  }

  render() {
    return (
      <div className="card border-0 p-3 shadow" style={{ width: "30rem" }}>
        <div className="card-body">
          <div className="row pl-3">
            <h3>Register Account</h3>
          </div>
          <div className="row w-100 mt-3">
            <form
              id="loginForm"
              className="w-100 pl-3"
              onSubmit={e => {
                e.preventDefault();
                this.register()
              }}
            >
              <div className="form-group">
                <label for="exampleInputEmail1">Student ID</label>
                <input
                  type="text"
                  id = "studentId"
                  className="form-control form-control-sm"
                  onChange={text => {
                    this.setState({
                      studentId: text.target.value
                    });
                    this.validateId()
                  }}
                  defaultValue={this.state.studentId}
                  aria-describedby="emailHelp"
                  placeholder="Student ID"
                  required
                />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control form-control-sm"
                  onChange={text => {
                    this.setState({
                      email: text.target.value
                    });
                  }}
                  defaultValue={this.state.email}
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  id = "password"
                  type="password"
                  onChange={text => {
                    this.setState({
                      password: text.target.value
                    });
                    this.confirmPassword()
                  }}
                  defaultValue={this.state.password}
                  className="form-control form-control-sm"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Confimr Password</label>
                <input
                  id = "confirmPassword"
                  type="password"
                  onChange={text => {
                    this.setState({
                      confirmPassword: text.target.value
                    });
                    this.confirmPassword()
                  }}
                  defaultValue={this.state.confirmPassword}
                  className="form-control form-control-sm"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              {this.state.alert.trim().length==0?"":errorHandler(this.state.alert)}
              <button type="submit" className="btn btn-sm btn-primary">
                Register
              </button>
            </form>
            <div className="mt-2 pl-3 d-flex justify-content-center">
              <small>
                Already Have Account?{" "}
                <a
                  href="#"
                  onClick={() => {
                    this.props.context.setState({ tabIndex: 0 });
                  }}
                >
                  Login
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const errorHandler = error => {
  return (
    <div className="alert mt-2 alert-danger" role="alert">
      <small> {error}</small>
    </div>
  );
};

ReactDOM.render(<MainContainer />, document.querySelector("#mainContainer"));
