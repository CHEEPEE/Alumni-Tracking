class DashboardContainer extends React.Component {
  state = {};
  render() {
    return <React.Fragment>Dashboard</React.Fragment>;
  }
}

class UserManagementContainer extends React.Component {
  state = {};
  fetchUsers(){
    $.ajax({
      type: "Post",
      url: "functions/index.php",
      data: {
        requestType:"fetchAlumni"
      },
      success: function(data) {
        console.log(data);
        var listItem = JSON.parse(data).map(function(object, index) {
          return (
            <AlumniListItem
              key = {index}
              username = {object.first_name+" "+object.middle_name+" "+object.last_name}
              email = {object.email}
              address = {object.address}
            />
          );
        });
  
        ReactDOM.render(
          <React.Fragment>{listItem}</React.Fragment>,
          document.getElementById("studentListContainer")
        );
      }
    });
  }
  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h2>Manage Users</h2>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <button
              type="button"
              className="m-1 btn btn-light btn-sm"
              data-toggle="modal"
              data-target="#addUserModal"
            >
              Add User
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="form-group form-control-sm">
              <label for="exampleInputEmail1">
                <small>Search User</small>
              </label>
              <input
                type="email"
                className="form-control form-control-sm w-100"
                id="searchUser"
                aria-describedby="emailHelp"
                placeholder="Enter Username"
              />
            </div>
          </div>
        </div>
        <div className="row mt-5 pl-1">
          <div className="col">
            <h3>Account List</h3>
          </div>
        </div>
        <div className="row">
          <div className="col font-weight-bold">
            <small>Name</small>
          </div>
          <div className="col  font-weight-bold">
            <small>Email Address</small>
          </div>
          <div className="col  font-weight-bold">
            <small>Address</small>
          </div>
        </div>
        <div className = "row" id= "studentListContainer">
        </div>
        <AddUserModal fetchUsers = {this.fetchUsers} />
      </React.Fragment>
    );
  }
}

class User {
  constructor(
    fName,
    mName,
    lName,
    email,
    contact,
    gender,
    address,
    permaAddress,
    course,
    birthDate
  ) {
    this.fName = fName;
    this.mName = mName;
    this.lName = lName;
    this.email = email;
    this.contact = contact;
    this.gender = gender;
    this.address = address;
    this.permaAddress = permaAddress;
    this.course = course;
    this.birthDate = birthDate;
  }
  userProperty() {
    return this;
  }
}

class AddUserModal extends React.Component {
  constructor() {
    super();
    this.userProperty = new User();
  }

  state = {
    lFirstName: "First Name",
    lMiddleName: "Middle Name",
    lLastName: "Last Name",
    lEmail: "Email Address",
    lContact: "Contact Number",
    lgender: "Select Gender",
    laddress: "Current Address",
    lPermaAddress: "Permanent Address",
    lCourse: "Course",
    lbirthDate: "Birth Date",
    alert: "d-none",
    alertMessage: "",
    lStudentId:"Student ID"
  };
  validateFieds(fields) {
    for (let i in fields) {
      if (fields[i].length === 0) {
        return false;
      }
    }
    return true;
  }
  clearValue() {
    document.querySelector("#fName").value = "";
    document.querySelector("#mName").value = "";
    document.querySelector("#lName").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#contactNumber").value = "";
    document.querySelector("#gender").value = "";
    document.querySelector("#address").value = "";
    document.querySelector("#permanentAddress").value ="";
    document.querySelector("#course").value = "";
    document.querySelector("#birthDate").value = "";
    document.querySelector("#studentId").value = "";
  }
  addUser() {
    let sup = this;
    let studentId = document.querySelector("#studentId").value;
    let fName = document.querySelector("#fName").value;
    let mName = document.querySelector("#mName").value;
    let lName = document.querySelector("#lName").value;
    let email = document.querySelector("#email").value;
    let contact = document.querySelector("#contactNumber").value;
    let gender = document.querySelector("#gender").value;
    let address = document.querySelector("#address").value;
    let permaAddress = document.querySelector("#permanentAddress").value;
    let course = document.querySelector("#course").value;
    let birthDate = document.querySelector("#birthDate").value;

    this.userProperty = new User(
      studentId,
      fName,
      mName,
      lName,
      email,
      contact,
      gender,
      address,
      permaAddress,
      course,
      birthDate
    );

    console.log(this.userProperty);
    let userProperty = this.userProperty;
    if (this.validateFieds(this.userProperty)) {
      this.setState({
        alert: "d-none",
      });

      $.ajax({
        url: "functions/index.php",
        method: "POST",
        data: {
          studentId:studentId,
          fName: fName,
          mName: mName,
          lName: lName,
          email: email,
          contact: contact,
          gender: gender,
          address: address,
          permaAddress: permaAddress,
          course: course,
          birthDate: birthDate,
          requestType: "addUser"
        },
        success: function(data) {
          console.log(data);
          if (data.trim() == "success") {
            sup.clearValue();
            $("#addUserModal").modal("hide");
            sup.props.fetchUsers()

          }else if(data ==="idTaken"){
            sup.setState({
              alert: "show",
              alertMessage:"Student Id Not Available"
            });
          }
        }
      });
    } else {
      this.setState({
        alert: "show",
        alertMessage:"Please Fill Up All Fields"
      });
    }
  }


  
  render() {
    return (
      <div
        className="modal fade"
        id="addUserModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Add Alumni
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col">
                  <form>
                    <div className = "row">
                    <div className="col">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.lStudentId}</small>
                          </label>
                          <input
                            type="email"
                            className="form-control form-control-sm"
                            id="studentId"
                            aria-describedby="emailHelp"
                            placeholder={this.state.lStudentId}
                          />
                        </div>
                      </div>
                      <div className = "col">
                      </div>
                    </div>

                    {/* accoun name */}
                    <div className="row">
                      {/* first name */}
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.lStudentId}</small>
                          </label>
                          <input
                            type="email"
                            className="form-control form-control-sm"
                            id="fName"
                            aria-describedby="emailHelp"
                            placeholder={this.state.lFirstName}
                          />
                        </div>
                      </div>
                      {/* middle name */}
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.lMiddleName}</small>
                          </label>
                          <input
                            type="email"
                            className="form-control form-control-sm"
                            id="mName"
                            aria-describedby="emailHelp"
                            placeholder={this.state.lMiddleName}
                          />
                        </div>
                      </div>
                      {/* Last name */}
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.lLastName}</small>
                          </label>
                          <input
                            type="email"
                            className="form-control  form-control-sm"
                            id="lName"
                            aria-describedby="emailHelp"
                            placeholder={this.state.lLastName}
                          />
                        </div>
                      </div>
                    </div>
                    {/* contact info */}
                    <div className="row">
                      {/* email address */}
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.lEmail}</small>
                          </label>
                          <input
                            type="email"
                            className="form-control  form-control-sm"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder={this.state.lEmail}
                          />
                        </div>
                      </div>
                      {/* contact Number */}
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.lContact}</small>
                          </label>
                          <input
                            type="email"
                            className="form-control  form-control-sm"
                            id="contactNumber"
                            aria-describedby="emailHelp"
                            placeholder={this.state.lContact}
                          />
                        </div>
                      </div>
                    </div>
                    {/* otherInfo */}
                    <div className="row">
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.lbirthDate}</small>
                          </label>
                          <input
                            type="date"
                            className="form-control  form-control-sm"
                            id="birthDate"
                            aria-describedby="emailHelp"
                            placeholder={this.state.lbirthDate}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.lgender}</small>
                          </label>
                          <select
                            id="gender"
                            className="form-control form-control-sm"
                          >
                            <option selected>{this.state.lgender}</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </div>
                      <div className="col">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.lCourse}</small>
                          </label>
                          <select
                            id="course"
                            className="form-control form-control-sm"
                          >
                            <option selected>{this.state.lgender}</option>
                            <option value="BSIT">
                              Bachelor Of Inforamation Technology
                            </option>
                            <option value="BSCS">
                              Bacherlor Of Computer Science
                            </option>
                            <option value="BSIS">
                              Bacherlor Of Information System
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* address */}
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.laddress}</small>
                          </label>
                          <input
                            type="text"
                            className="form-control  form-control-sm"
                            id="address"
                            aria-describedby="emailHelp"
                            placeholder={this.state.laddress}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label for="exampleInputEmail1">
                            <small>{this.state.lPermaAddress}</small>
                          </label>
                          <input
                            type="text"
                            className="form-control  form-control-sm"
                            id="permanentAddress"
                            aria-describedby="emailHelp"
                            placeholder={this.state.lPermaAddress}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={"row ml-2 mr-2 " + this.state.alert}>
                      <div className="alert alert-danger w-100" role="alert">
                        <small>{this.state.alertMessage}</small>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.addUser.bind(this)}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class AlumniListItem extends React.Component {
  state = {  }
  render() { 
    return ( 
      <React.Fragment>
        <div className = 'row w-100 pl-3'>
          <div className = "col">
            {this.props.username}
          </div>
          <div className = "col">
            {this.props.email}
          </div>
          <div className = "col">
            {this.props.address}
          </div>
        </div>
      </React.Fragment>
     );
  }
}

class MainContainer extends React.Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="tab-content" id="v-pills-tabContent">
          <div
            className="tab-pane fade show active"
            id="v-pills-home"
            role="tabpanel"
            aria-labelledby="v-pills-home-tab"
          >
            <DashboardContainer />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
            <UserManagementContainer />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
          >
            <EventManagementContainer/>
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
          >
            ...
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<MainContainer />, document.querySelector("#mainContainer"));
