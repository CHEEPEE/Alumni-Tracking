class ManageAccountContainer extends React.Component {
  state = {
    tabs: [
      <UpdateProfile />,
      <UpdateWork />,
      <UpdateBusiness />,
      <UpdateSecurity />
    ],
    tabIndex: 0
  };
  render() {
    return (
      <React.Fragment>
        <div className="row mt-2">
          <div className="col">
            <h3>Account Management</h3>
          </div>
        </div>
        <nav>
          <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <div
              className="nav-item nav-link active"
              id="nav-home-tab"
              data-toggle="tab"
              onClick={() => {
                this.setState({
                  tabIndex: 0
                });
              }}
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              <i
                style={{ fontSize: "18px" }}
                className="material-icons align-middle mr-2"
              >
                account_circle
              </i>
              Profile
            </div>
            <div
              className="nav-item nav-link"
              id="nav-profile-tab"
              data-toggle="tab"
              onClick={() => {
                this.setState({
                  tabIndex: 1
                });
              }}
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              <i
                style={{ fontSize: "18px" }}
                className="material-icons align-middle mr-2"
              >
                work
              </i>
              Work
            </div>
            <div
              className="nav-item nav-link"
              id="nav-contact-tab"
              data-toggle="tab"
              role="tab"
              onClick={() => {
                this.setState({
                  tabIndex: 2
                });
              }}
              aria-controls="nav-contact"
              aria-selected="false"
            >
              <i
                style={{ fontSize: "18px" }}
                className="material-icons align-middle mr-2"
              >
                business
              </i>
              Business
            </div>
            <div
              className="nav-item nav-link"
              id="nav-contact-tab"
              data-toggle="tab"
              role="tab"
              onClick={() => {
                this.setState({
                  tabIndex: 3
                });
              }}
              aria-controls="nav-contact"
              aria-selected="false"
            >
              <i
                style={{ fontSize: "18px" }}
                className="material-icons align-middle mr-2"
              >
                security
              </i>
              Security
            </div>
          </div>
        </nav>
        {this.state.tabs[this.state.tabIndex]}
      </React.Fragment>
    );
  }
}

class UpdateProfile extends React.Component {
  state = {
    student_id: user_id,
    password: "",
    confirmPassword: "",
    isPasswordConfirm: true,
    passwordError: "",
    photo: "../assets/images/placeholder.png",
    photoName: "",
    batch: "",
    is_graduate: "false"
  };

  getProfile(data, args) {
    let profile = JSON.parse(data);
    args.setState({
      ...args.state,
      ...profile
    });
    $("#gender").val(profile.gender);
    $("#course").val(profile.course);
    $("#userType").val(profile.is_graduate);
    console.log(profile);
    args.setState({
      photo: upload_dir + profile.photo,
      photoName: profile.photo
    });
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
      if (data == "success") {
        alert("Account Updated");
      }
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

  onSubmit = e => {
    let sup = this;
    e.preventDefault();
    // e.stopPropagation();
    console.log(document.querySelector("#imageUpload"));

    $.ajax({
      url: "functions/upload.php", // Url to which the request is send
      type: "POST", // Type of request to be send, called as method
      data: new FormData(document.querySelector("#imageUpload")), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
      contentType: false, // The content type used when sending data to the server.
      cache: false, // To unable request pages to be cached
      processData: false, // To send DOMDocument or non processed data file it is set to false
      success: function(
        data // A function to be called if request succeeds
      ) {
        console.log(data);
        sup.setState({
          photo: upload_dir + data,
          photoName: data
        });
      }
    });

    // return false
  };
  componentDidMount() {
    let sup = this;
    this.profile();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row mt-3 text-dark">
          <div className="col">
            <h5> Update Profile </h5>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-auto m-3">
            <div className="row d-flex justify-content-between mt-2">
              <form
                id="imageUpload"
                action=""
                method="post"
                onSubmit={e => {
                  console.log(e);
                  this.onSubmit(e);
                }}
                encType="multipart/form-data"
              >
                <div className="row">
                  <label className="d-flex justify-content-between" for="file">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      onChange={e => {
                        $("#submit").click();

                        // alert("changed")
                      }}
                      style={{ display: "none" }}
                    />
                    <img
                      src={this.state.photo}
                      alt="..."
                      class="img-thumbnail rounded-circle"
                    />
                  </label>
                  {/* <input type="file" name="fileToUpload" id="fileToUpload" /> */}
                </div>
                <div className="row mt-2">
                  <input
                    type="submit"
                    id="submit"
                    className="btn btn-sm"
                    value="Upload"
                    name="submit"
                    style={{ width: "0", display: "none" }}
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
                {/* <div class="form-group">
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
                </div> */}
              </div>
              <div className="col">
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Gender
                  </small>
                  <select
                    id="gender"
                    className="form-control mt-1 form-control-sm"
                    onChange={text => {
                      $("#gender").on("change", function() {
                        $("option:selected", this)
                          .hide()
                          .siblings()
                          .show();
                      });
                      this.setState({
                        gender: text.target.value
                      });
                    }}
                    defaultValue={this.state.gender}
                  >
                    <option>...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {/* <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        gender: text.target.value
                      });
                    }}
                    defaultValue={this.state.gender}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  /> */}
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
                {/* <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Age
                  </small>
                  <input
                    type="email"
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div> */}
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
                  <select
                    id="course"
                    onChange={text => {
                      $("#course").on("change", function() {
                        $("option:selected", this)
                          .hide()
                          .siblings()
                          .show();
                      });
                      this.setState({
                        course: text.target.value
                      });
                    }}
                    defaultValue={this.state.last_name}
                    id="course"
                    className="form-control mt-1 form-control-sm"
                  >
                    {" "}
                    <option>...</option>
                    <option value="BSIT">
                      Bachelor Of Science in Inforamation Technology
                    </option>
                    <option value="BSCS">
                      Bachelor Of Science in Computer Science
                    </option>
                    <option value="BSIS">
                      Bachelor Of Science in Information System
                    </option>
                  </select>
                  {/* <input
                    type="email"
                    onChange={text => {
                      this.setState({
                        course: text.target.value
                      });
                    }}
                    defaultValue={this.state.last_name}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  /> */}
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold font-weight-bold text-muted">
                    User Type
                  </small>
                  <select
                    id="userType"
                    onChange={text => {
                      this.setState({
                        is_graduate: text.target.value
                      });
                    }}
                    defaultValue={this.state.is_graduate}
                    className="form-control mt-1 form-control-sm"
                  >
                    {" "}
                    <option value="false">Student</option>
                    <option value="true">Alumni</option>
                  </select>
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold font-weight-bold text-muted">
                    Batch
                  </small>

                  <input
                    type="text"
                    onChange={e => {
                      this.setState({
                        batch: e.target.value
                      });
                    }}
                    defaultValue={this.state.batch}
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

class UpdateSecurity extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    alert: "",
    success: ""
  };

  updatePassword = () => {
    if (this.state.alert === "") {
      ajaxHandler(
        {
          requestType: "changePassword",
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword
        },
        data => {
          console.log(data);
          if (data.trim() == "success") {
            this.setState({
              success: "Updated Successfully"
            });
            document.querySelector("#newPassword").value = "";
            document.querySelector("#confrimPassword").value = "";
            document.querySelector("#oldPassword").value = "";
          } else {
            alert(data);
          }
        }
      );
    }
  };

  confirmPassword() {
    let newPassword = document.querySelector("#newPassword").value;
    let confirmPassword = document.querySelector("#confrimPassword").value;

    if (newPassword != confirmPassword) {
      this.setState({
        alert: "Password doesn't match"
      });
    } else {
      this.setState({
        alert: ""
      });
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="row mt-3 text-dark">
          <div className="col">
            <h5> Update Account Security </h5>
          </div>
        </div>
        <div className="row w-50 mt-3">
          <div className="col">
            {" "}
            {/* d-flex justify-content-center */}
            <div className="row">
              <div className="col">
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Old Password
                  </small>
                  <input
                    id="oldPassword"
                    type="password"
                    onChange={text => {
                      this.setState({
                        oldPassword: text.target.value
                      });
                      // this.confirmPassword();
                    }}
                    defaultValue={this.state.oldPassword}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    New Password
                  </small>
                  <input
                    id="newPassword"
                    type="password"
                    onChange={text => {
                      this.setState({
                        newPassword: text.target.value
                      });
                      this.confirmPassword();
                    }}
                    defaultValue={this.state.newPassword}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Confirm new Password
                  </small>
                  <input
                    id="confrimPassword"
                    type="password"
                    onChange={text => {
                      this.setState({
                        confirmPassword: text.target.value
                      });
                      this.confirmPassword();
                    }}
                    defaultValue={this.state.confirmPassword}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row w-50 mt-3 mb-5">
          <div className="col d-flex justify-content-center">
            <button
              type="button"
              onClick={() => this.updatePassword()}
              class="btn btn-primary"
            >
              Update Password
            </button>
          </div>
        </div>
        <div className="row w-50">
          <div className="col">
            <small>
              {this.state.alert == "" ? "" : errorHandler(this.state.alert)}
              {this.state.success == ""
                ? ""
                : successHandler(this.state.success)}
            </small>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class OptionItem extends React.Component {
  render() {
    return (
      <option value={this.props.value.id}>{this.props.value.category}</option>
    );
  }
}

const successHandler = success => {
  return (
    <div className="alert mt-2 alert-success" role="alert">
      <small> {success}</small>
    </div>
  );
};

const errorHandler = error => {
  return (
    <div className="alert mt-2 alert-danger" role="alert">
      <small> {error}</small>
    </div>
  );
};
