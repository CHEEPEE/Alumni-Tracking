class ManageAccountContainer extends React.Component {
  state = {
    student_id: user_id,
    password: "",
    confirmPassword: "",
    isPasswordConfirm: true,
    passwordError: ""
  };

  getProfile(data, args) {
    let profile = JSON.parse(data);
    args.setState({
      ...args.state,
      ...profile
    });
    console.log(profile);
  }

  putState(property, value) {}

  confirmPassword() {
    if (
      document.querySelector("#password").value ===
      document.querySelector("#confirmPassword").value
    ) {
      this.setState({
        isPasswordConfirm: true
      });
    } else {
      this.setState({
        isPasswordConfirm: false,
        passwordError: "Password Not Match"
      });
    }
  }

  updateProfile() {
    ajaxHandler({ ...this.state, requestType: "updateProfile" }, data => {
      console.log(data);
      this.profile;
    });
    console.log(this.state);
  }
  profile() {
    ajaxHandler(
      { requestType: "getProfile", user_id: user_id },
      this.getProfile,
      this
    );
  }
  componentDidMount() {
    this.profile();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row mt-2">
          <div className="col">
            <h3>Account Management</h3>
          </div>
        </div>
        <div className="row mt-3 text-dark">
          <div className="col">
            <h5> Update Profile </h5>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-auto m-3">
            <div className="row d-flex justify-content-between mt-2">
              <form
                
                action="upload.php"
                method="post"
                enctype="multipart/form-data"
              >
                <div className="row">
                  <label className = "d-flex justify-content-between" for="image">
                    <input
                      type="file"
                      name="image"
                      id="image"
                      style={{ display: "none" }}
                    />
                    <img
                      src="../assets/images/placeholder.png"
                      alt="..."
                      class="img-thumbnail rounded-circle"
                    />
                  </label>
                  {/* <input type="file" name="fileToUpload" id="fileToUpload" /> */}
                </div>
                <div className="row mt-2">
                  <input
                    type="submit"
                    className="btn btn-sm"
                    value="Upload"
                    name="submit"
                    style = {{width:"100px"}}
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    First Name
                  </small>
                  <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        first_name: text.target.value
                      });
                    }}
                    defaultValue={this.state.first_name}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Middle Name
                  </small>
                  <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        middle_name: text.target.value
                      });
                    }}
                    defaultValue={this.state.middle_name}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Last Name
                  </small>
                  <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        last_name: text.target.value
                      });
                    }}
                    defaultValue={this.state.last_name}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Email
                  </small>
                  <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        email: text.target.value
                      });
                    }}
                    defaultValue={this.state.email}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Contact Number
                  </small>
                  <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        number: text.target.value
                      });
                    }}
                    defaultValue={this.state.number}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Password
                  </small>
                  <input
                    id="password"
                    type="password"
                    onChange={text => {
                      this.confirmPassword();
                    }}
                    defaultValue={this.state.password}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Confirm Password
                  </small>
                  <input
                    id="confirmPassword"
                    type="password"
                    onChange={text => {
                      this.confirmPassword();
                    }}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                  {this.state.isPasswordConfirm
                    ? ""
                    : errorHandler(this.state.passwordError)}
                </div>
              </div>
              <div className="col">
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Student ID
                  </small>
                  <input
                    disabled
                    type="email"
                    value={this.state.student_id}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Gender
                  </small>
                  <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        gender: text.target.value
                      });
                    }}
                    defaultValue={this.state.gender}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Birthday
                  </small>
                  <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        birthdate: text.target.value
                      });
                    }}
                    defaultValue={this.state.birthdate}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Age
                  </small>
                  <input
                    type="email"
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Current Address
                  </small>
                  <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        address: text.target.value
                      });
                    }}
                    defaultValue={this.state.address}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Permanent Address
                  </small>
                  <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        permanent_address: text.target.value
                      });
                    }}
                    defaultValue={this.state.permanent_address}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Couse
                  </small>
                  <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        course: text.target.value
                      });
                    }}
                    defaultValue={this.state.last_name}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold font-weight-bold text-muted">
                    Batch
                  </small>
                  <input
                    type="email"
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-5">
          <div className="col d-flex justify-content-center">
            <button
              type="button"
              onClick={() => this.updateProfile()}
              class="btn btn-primary"
            >
              Update Profile
            </button>
          </div>
        </div>
      </React.Fragment>
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
