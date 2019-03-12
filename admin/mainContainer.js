let chart;
let employmentChart;
class DashboardContainer extends React.Component {
  state = {
    categories: [],
    counterData: [],
    initializeGraph: true,
    employed: 0,
    graduates: 100
  };
  loadGraph = (labels, data) => {
    let context = this;
    let canvas = document.getElementById("chart");
    let ctx = canvas.getContext("2d");
    let employmentChartCtx = document
      .getElementById("employmentChart")
      .getContext("2d");

    let dataSet = {
      // The type of chart we want to create
      type: "pie",
      // The data for our dataset
      data: {
        labels: labels,
        datasets: []
      },

      // Configuration options go here
      options: {
        responsive: true,
        legend: { position: "right" },
        tooltips: { intersect: true, mode: "point" }
      }
    };

    let employementChartDataSet = {
      // The type of chart we want to create
      type: "pie",
      // The data for our dataset
      data: {
        labels: [
          `Employed (${context.state.employed})`,
          `Unemployed (${Math.abs(context.state.graduates - context.state.employed)})`
        ],
        datasets: [
          {
            label: "Employement",
            backgroundColor: ["#4dc9f6", "#58595b"],
            data: [
              context.state.employed,
              Math.abs(context.state.graduates - context.state.employed)
            ]
          }
        ]
      },

      // Configuration options go here
      options: {
        responsive: true,
        legend: { position: "right" },
        tooltips: { intersect: true, mode: "point" }
      }
    };
    console.log(data.length);
    if (data.length != 0) {
      chart = new Chart(ctx, dataSet);
      employmentChart = new Chart(employmentChartCtx, employementChartDataSet);
      // chart.data.labels.pop();
      // chart.data.datasets.forEach((dataset) => {
      //     dataset.data.pop();
      // });

      dataSet.data.datasets.push({
        label: "My First dataset",
        backgroundColor: [
          "#4dc9f6",
          "#f67019",
          "#f53794",
          "#537bc4",
          "#acc236",
          "#166a8f",
          "#00a950",
          "#58595b",
          "#8549ba"
        ],
        data: data
      });
      employmentChart.update();
      chart.update();
    }
  };

  getPercentage(number, total) {
    return (number / total) * 100;
  }
  getStats = (course = "") => {
    let context = this;
    let counterData = [];
    let categories = [];
    let totalCount = 0;
    let graduates = 0;
    ajaxHandler(
      { requestType: "getGraduates", course: course },
      data => {
        let count = JSON.parse(data);
        console.log(count);
        graduates = count.count;
        context.setState({
          graduates: count.count
        });
        employmentChart.update();
      },
      this
    );
    ajaxHandler(
      { requestType: "getStats", course: course },
      data => {
        console.log(data);
        JSON.parse(data).map(function(object, index) {
          totalCount += Number(object.count);
        });
        JSON.parse(data).map(function(object, index) {
          categories.push(`${object.category} (${object.count})`);

          counterData.push(object.count);
        });
        let listItem = JSON.parse(data).map(function(object, index) {
          return (
            <React.Fragment>
              <div className="row mb-2">
                <div className="col text-success font-weight-bold">
                  <small> {`${object.category}`}</small>
                </div>
                <div className="col text-center">
                  <span class="badge badge-light p-2">
                    <small> {`${object.count}`}</small>
                  </span>
                </div>
                <div className="col text-center">
                  <span class="badge badge-light p-1 w-25">
                    <small>
                      {" "}
                      {`${context.getPercentage(object.count, totalCount)}%`}
                    </small>
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        });
        context.setState({
          counterData: counterData,
          categories: categories,
          employed: totalCount
        });
        // **this should render list of categories percentage and count

        // ReactDOM.render(
        //   <React.Fragment>{listItem}</React.Fragment>,
        //   document.querySelector("#jobstats")
        // );
        if (context.state.initializeGraph) {
          context.loadGraph(categories, counterData);
          context.setState({
            initializeGraph: false
          });
        } else {
          setTimeout(function() {
            context.updateGraphData(categories, counterData);
          }, 500);
        }
      },
      this
    );
  };

  updateGraphData(label, counterData) {
    let context = this;
    chart.data.datasets[0].data = counterData;
    employmentChart.data.labels = [
      `Employed (${context.state.employed})`,
      `Unemployed (${Math.abs(context.state.graduates - context.state.employed)})`
    ];
    employmentChart.data.datasets[0].data = [
      this.state.employed,
      Math.abs(this.state.graduates - this.state.employed)
    ];
    employmentChart.update();
    chart.update();
    // chart.data.labels.push("labels");
    // chart.data.datasets.forEach((dataset) => {
    //     dataset.data.push(1);
    // });
  }
  componentDidMount() {
    this.getStats();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h1>Dashboard</h1>
          </div>
        </div>
        <div className="row w-100 border-bottom border-muted mb-2 pb-1">
          <div className="col text-primary">
            <h3>Employment Demographics</h3>
          </div>
          <div className="col">
            <select
              onChange={text => {
                this.getStats(text.target.value);
              }}
              className="form-control form-control-sm"
            >
              <option value="">All Course</option>
              <option value="BSIT">BS Inforamation Technology</option>
              <option value="BSCS">BS Computer Science</option>
              <option value="BSCPE">BS Computer Engineering</option>
            </select>
          </div>
        </div>
        <div className="row pt-2">
          <div className="col bg-light shadow-sm p-3 m-1">
            <div className="row">
              <div className="col">
                <h5>Demographic Title</h5>
              </div>
            </div>
            <canvas id="chart" />
          </div>
          <div className="col bg-light shadow-sm p-3 m-1">
            <div className="row">
              <div className="col">
                <h5>Demographic Title</h5>
              </div>
              <canvas id="employmentChart" />
            </div>
          </div>
          {/* <div className="col" id="jobstats" /> */}
        </div>
        <div className="row">
          <div className="col shadow-sm p-3">
            <div className="row">
              <div className="col">
                <h5>Employement Demographic</h5>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class UserManagementContainer extends React.Component {
  state = { currentJob: { job_title: undefined, job_salary: "" } };
  viewAlumniProfile = userProfile => {
    $("#viewAlumniModal").modal("toggle");
    this.setState({ ...userProfile });
    console.log(this.state);
    this.getUserCurrentWork(userProfile.studentId);
    this.getUserJobHistory(userProfile.studentId);
    this.getBusiness(userProfile.studentId);
  };
  getUserCurrentWork(userId) {
    let sup = this;
    ajaxHandler({ requestType: "fetchCurrentJob", user_id: userId }, data => {
      JSON.parse(data).map(function(object, index) {
        sup.setState({
          currentJob: {
            ...object,
            job_salary: sup.getSalary(object.job_salary)
          }
        });
      });
      console.log(this.state.currentJob);
    });
  }

  getBusiness = userId => {
    let sup = this;
    ajaxHandler({ requestType: "getBusinesses", user_id: userId }, data => {
      let listItem = JSON.parse(data).map((object, index) => (
        <BusinessesItem
          business={{
            ...object
          }}
        />
      ));
      ReactDOM.render(listItem, document.querySelector("#businessesContainer"));
    });
  };
  getUserJobHistory(userId) {
    let sup = this;
    ajaxHandler({ requestType: "fetchJobHistory", user_id: userId }, data => {
      let listItem = JSON.parse(data).map((object, index) => (
        <JobHistoryItem
          currentJob={{
            ...object,
            job_salary: sup.getSalary(object.job_salary)
          }}
        />
      ));
      ReactDOM.render(listItem, document.querySelector("#jobHistoryContainer"));
    });
  }
  fetchUsers() {
    let sup = this;
    $.ajax({
      type: "Post",
      url: "functions/index.php",
      data: {
        requestType: "fetchAlumni"
      },
      success: function(data) {
        // console.log(data);
        var listItem = JSON.parse(data).map(function(object, index) {
          return (
            <AlumniListItem
              key={index}
              username={
                object.first_name +
                " " +
                object.middle_name +
                " " +
                object.last_name
              }
              email={object.email}
              studentId={object.user_id}
              address={object.address}
              course={object.course}
              photo={object.photo}
              fetchUsers={sup.fetchUsers}
              viewProfile={sup.viewAlumniProfile}
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

  getSalary = (job_salary = "s0") => {
    // let job_salary = this.context.job_salary;
    let salary = [
      "Les than 10,000",
      "10,000 - 15,000",
      "16,000 - 20,000",
      "21,000 - 30,000",
      "30,000 - 50,000",
      "50,000 - 80,000",
      "80,000 - 100,000",
      "100,000 - 150, 000",
      "150,000 - 200,000",
      "200,000 - 500,000",
      "Greater than 500,000"
    ];
    let extractNumber = job_salary.replace("s", "");
    return salary[parseInt(extractNumber)];

    // return salary[1]
  };
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
        <div className="row w-100">
          <div className="col-2 font-weight-bold">
            <small>Student ID</small>
          </div>
          <div className="col font-weight-bold">
            <small>Name</small>
          </div>
          <div className="col font-weight-bold">
            <small>Email Address</small>
          </div>
          <div className="col font-weight-bold">
            <small>Address</small>
          </div>
          <div className="col-1 font-weight-bold">
            <small>Course</small>
          </div>
          <div className="col-1 font-weight-bold">
            <small />
          </div>
          <div className="col-1 font-weight-bold">
            <small />
          </div>
          <div className="col-1 font-weight-bold">
            <small />
          </div>
        </div>
        <div className="w-100" id="studentListContainer" />

        <AddUserModal fetchUsers={this.fetchUsers} />
        <div
          className="modal fade"
          id="viewAlumniModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div
            className="modal-dialog modal-lg modal-dialog-centered"
            role="document"
          >
            <div className="modal-content ">
              <div className="modal-body">
                <div className="card-body">
                  <div className="row pl-3">
                    <div className="col">
                      <h3>{this.state.username}</h3>
                    </div>
                  </div>

                  <nav className="row w-100">
                    <div class="nav nav-tabs w-100" id="nav-tab" role="tablist">
                      <a
                        class="nav-item nav-link active"
                        id="nav-home-tab"
                        data-toggle="tab"
                        href="#nav-home"
                        role="tab"
                        aria-controls="nav-home"
                        aria-selected="true"
                      >
                        Profile
                      </a>
                      <a
                        class="nav-item nav-link"
                        id="nav-profile-tab"
                        data-toggle="tab"
                        href="#nav-profile"
                        role="tab"
                        aria-controls="nav-profile"
                        aria-selected="false"
                      >
                        Job
                      </a>
                      <a
                        class="nav-item nav-link"
                        id="nav-contact-tab"
                        data-toggle="tab"
                        href="#nav-contact"
                        role="tab"
                        aria-controls="nav-contact"
                        aria-selected="false"
                      >
                        Business
                      </a>
                    </div>
                  </nav>
                  <div class="tab-content" id="nav-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="nav-home"
                      role="tabpanel"
                      aria-labelledby="nav-home-tab"
                    >
                      <div className="row mt-3">
                        <div className="col">
                          <div className="row">
                            <small>Name</small>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="row font-weight-bold">
                                {this.state.username}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col">
                          <div className="row">
                            <small>Student Number</small>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="row font-weight-bold">
                                {this.state.studentId}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col">
                          <div className="row">
                            <small>Email</small>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="row font-weight-bold">
                                {this.state.email}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col">
                          <div className="row">
                            <small>Course</small>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="row font-weight-bold">
                                {this.state.course}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-1">
                        <div className="col">
                          <div className="row">
                            <small>Address</small>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className="row font-weight-bold">
                                {this.state.address}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="nav-profile"
                      role="tabpanel"
                      aria-labelledby="nav-profile-tab"
                    >
                      <div className="row mt-2">
                        <div className="col">
                          <div className="row mt-1 mb-2">
                            <div className="col font-weight-bold">
                              Work Title
                            </div>
                            <div className="col font-weight-bold">
                              Salary Range
                            </div>
                            {/* <div className="col font-weight-bold">
                              Job Title
                            </div> */}
                            <div className="col font-weight-bold">
                              Start Date
                            </div>
                            {/* <div className="col font-weight-bold">End Date</div> */}
                          </div>
                          <small className="font-weight-bold text-primary">
                            Current Job
                          </small>
                          <div className="row mb-3">
                            <div className="col">
                              {this.state.currentJob.job_title}
                            </div>
                            <div className="col ">
                              {this.state.currentJob.job_salary}
                            </div>
                            {/* <div className="col ">
                              {this.state.currentJob.job_title}
                            </div> */}
                            <div className="col">
                              {this.state.currentJob.job_start}
                            </div>
                          </div>
                          <small className="font-weight-bold text-primary pt-3">
                            Job History
                          </small>
                          <div className="mb-3" id="jobHistoryContainer" />
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="nav-contact"
                      role="tabpanel"
                      aria-labelledby="nav-contact-tab"
                    >
                      <div className="mt-3" id="businessesContainer" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const JobHistoryItem = props => (
  <div className="row">
    <div className="col">{props.currentJob.job_title}</div>
    <div className="col ">{props.currentJob.job_salary}</div>
    {/* <div className="col ">{props.currentJob.job}</div> */}
    <div className="col">{props.currentJob.job_start}</div>
  </div>
);

const BusinessesItem = props => (
  <div className="row">
    <div className="col">
      <div className="row">
        <small>Business Name</small>
      </div>
      <div className="row">{props.business.business_name}</div>
    </div>
    <div className="col">
      <div className="row">
        <small>Business Category</small>
      </div>
      <div className="row">
        <div className="row">{props.business.categoryName}</div>
      </div>
    </div>
    <div className="col">
      <div className="row">
        <small>Business Started</small>
      </div>
      <div className="row">
        <div className="row">{props.business.business_start}</div>
      </div>
    </div>
  </div>
);
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
    lStudentId: "Student ID",
    showPassword: false
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
    document.querySelector("#addUserEmail").value = "";
    document.querySelector("#addUserPassword").value = "";
    document.querySelector("#addUserId").value = "";
    // document.querySelector("#fName").value = "";
    // document.querySelector("#mName").value = "";
    // document.querySelector("#lName").value = "";
    // document.querySelector("#contactNumber").value = "";
    // document.querySelector("#gender").value = "";
    // document.querySelector("#address").value = "";
    // document.querySelector("#permanentAddress").value = "";
    // document.querySelector("#course").value = "";
    // document.querySelector("#birthDate").value = "";
  }
  addUser() {
    let sup = this;
    let studentId = document.querySelector("#addUserId").value;
    let email = document.querySelector("#addUserEmail").value;

    let fName = "";
    let mName = "";
    let lName = "";
    let contact = "";
    let gender = "";
    let address = "";
    let permaAddress = "";
    let course = "";
    let birthDate = "";

    // let fName = document.querySelector("#fName").value;
    // let mName = document.querySelector("#mName").value;
    // let lName = document.querySelector("#lName").value;

    // let contact = document.querySelector("#contactNumber").value;
    // let gender = document.querySelector("#gender").value;
    // let address = document.querySelector("#address").value;
    // let permaAddress = document.querySelector("#permanentAddress").value;
    // let course = document.querySelector("#course").value;
    // let birthDate = document.querySelector("#birthDate").value;

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
    if (true) {
      this.setState({
        alert: "d-none"
      });

      $.ajax({
        url: "functions/index.php",
        method: "POST",
        data: {
          studentId: studentId,
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
          requestType: "addUser",
          password: document.querySelector("#addUserPassword").value
        },
        success: function(data) {
          console.log(data);
          if (data.includes("success")) {
            sup.clearValue();
            $("#addUserModal").modal("hide");
            sup.props.fetchUsers();
          } else if (data === "idTaken") {
            sup.setState({
              alert: "show",
              alertMessage: "Student Id Not Available"
            });
          }
        }
      });
    } else {
      this.setState({
        alert: "show",
        alertMessage: "Please Fill Up All Fields"
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
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content ">
            <div className="modal-body">
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
                      // this.register()
                      this.addUser();
                    }}
                  >
                    <div className="form-group">
                      <label for="exampleInputEmail1">Student ID</label>
                      <input
                        type="text"
                        id="addUserId"
                        className="form-control form-control-sm"
                        onChange={text => {
                          this.setState({
                            studentId: text.target.value
                          });
                          // this.validateId()
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
                        id="addUserEmail"
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
                      <label for="exampleInputEmail1">Password</label>
                      <input
                        type={this.state.showPassword ? "text" : "password"}
                        id="addUserPassword"
                        className="form-control form-control-sm"
                        onChange={text => {
                          this.setState({
                            password: text.target.value
                          });
                        }}
                        aria-describedby="emailHelp"
                        placeholder="Enter Password"
                        required
                      />
                    </div>
                    <div class="form-group form-check">
                      <input
                        type="checkbox"
                        onChange={text => {
                          this.setState({
                            showPassword: !this.state.showPassword
                          });
                        }}
                        class="form-check-input"
                        id="exampleCheck1"
                      />
                      <label class="form-check-label" for="exampleCheck1">
                        show password
                      </label>
                    </div>

                    {/* {this.state.alert.trim().length==0?"":errorHandler(this.state.alert)} */}
                    <button type="submit" className="btn btn-sm btn-primary">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AlumniListItem extends React.Component {
  state = {};
  deleteUser = () => {
    if (confirm("Delete Alumni")) {
      ajaxHandler(
        { user_id: this.props.studentId, requestType: "deleteProfile" },
        data => {
          console.log(data);
          this.props.fetchUsers();
        }
      );
    }
  };
  updateUser = () => {
    console.log("update function");

    let userId = this.props.studentId;
    let new_userId = document.querySelector(
      "#updateStudentId" + this.props.studentId
    ).value;
    let email = document.querySelector("#updatEmail" + this.props.studentId)
      .value;
    ajaxHandler(
      {
        user_id: userId,
        new_userId: new_userId,
        email: email,
        requestType: "updateUserEmailAndUserId"
      },
      data => {
        console.log(data);

        if (data.trim() == "Student ID Taken".trim()) {
          alert("ID already Taken");
        } else {
          this.props.fetchUsers();
          $("#updateUserEmailAndStudentId" + this.props.studentId).modal(
            "toggle"
          );
        }
      }
    );
  };
  render() {
    return (
      <React.Fragment>
        <div className="row w-100 border-bottom pt-2 pb-2">
          <div className="col-2  text-truncate">
            <small className="font-weight-bold text-dark">
              {this.props.studentId}
            </small>
          </div>
          <div className="col  font-weight-light text-truncate">
            <img
              width="25em"
              height="25em"
              className="rounded-circle mr-1"
              src={
                upload_dir +
                (this.props.photo == "" ? "placeholder.png" : this.props.photo)
              }
            />{" "}
            <small>{this.props.username}</small>
          </div>
          <div className="col  font-weight-light text-truncate">
            <small>{this.props.email}</small>
          </div>
          <div className="col font-weight-light text-truncate">
            <small>{this.props.address}</small>
          </div>
          <div className="col-1 font-weight-light text-truncate">
            <small>{this.props.course}</small>
          </div>
          <div className="col-1">
            <button
              type="button"
              onClick={() => {
                $("#updateUserEmailAndStudentId" + this.props.studentId).modal(
                  "toggle"
                );
              }}
              className="btn btn-primary"
            >
              Update
            </button>
          </div>
          <div className="col-1">
            <button
              type="button"
              onClick={() => {
                this.props.viewProfile(this.props);
              }}
              className="btn btn-success"
            >
              View
            </button>
          </div>
          <div className="col-1">
            <button
              type="button"
              onClick={() => {
                this.deleteUser();
              }}
              className="btn btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
        <div
          className="modal fade"
          id={"updateUserEmailAndStudentId" + this.props.studentId}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content ">
              <div className="modal-body">
                <div className="card-body">
                  <div className="row pl-3">
                    <h3>Update User Email And ID</h3>
                  </div>
                  <div className="row w-100 mt-3">
                    <div className="w-100 pl-3">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Student ID</label>
                        <input
                          type="text"
                          id={"updateStudentId" + this.props.studentId}
                          className="form-control form-control-sm"
                          onChange={text => {
                            this.setState({
                              studentId: text.target.value
                            });
                            // this.validateId()
                          }}
                          defaultValue={this.props.studentId}
                          aria-describedby="emailHelp"
                          placeholder="Student ID"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input
                          type="email"
                          id={"updatEmail" + this.props.studentId}
                          className="form-control form-control-sm"
                          onChange={text => {
                            this.setState({
                              email: text.target.value
                            });
                          }}
                          defaultValue={this.props.email}
                          aria-describedby="emailHelp"
                          placeholder="Enter email"
                          required
                        />
                      </div>
                      <div
                        onClick={() => {
                          this.updateUser();
                        }}
                        className="btn btn-sm btn-primary"
                      >
                        Update
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class UpdateUserEmailAndStudentId extends React.Component {
  state = {};
  render() {
    return (
      <div
        className="modal fade"
        id={"updateUserEmailAndStudentId" + this.props.userId}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content ">
            <div className="modal-body">
              <div className="card-body">
                <div className="row pl-3">
                  <h3>Update User Email And ID</h3>
                </div>
                <div className="row w-100 mt-3">
                  <form
                    id="loginForm"
                    className="w-100 pl-3"
                    onSubmit={e => {
                      e.preventDefault();
                      // this.register()
                      // this.addUser();
                    }}
                  >
                    <div className="form-group">
                      <label for="exampleInputEmail1">Student ID</label>
                      <input
                        type="text"
                        id="updateStudentId"
                        className="form-control form-control-sm"
                        onChange={text => {
                          this.setState({
                            studentId: text.target.value
                          });
                          // this.validateId()
                        }}
                        defaultValue={this.props.userId}
                        aria-describedby="emailHelp"
                        placeholder="Student ID"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input
                        type="email"
                        id="updatEmail"
                        className="form-control form-control-sm"
                        onChange={text => {
                          this.setState({
                            email: text.target.value
                          });
                        }}
                        defaultValue={this.props.email}
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        required
                      />
                    </div>
                    {/* <div className="form-group">
                      <label for="exampleInputEmail1">Password</label>
                      <input
                        type={this.state.showPassword ? "text" : "password"}
                        id="password"
                        className="form-control form-control-sm"
                        onChange={text => {
                          this.setState({
                            password: text.target.value
                          });
                        }}
                        // defaultValue={}
                        aria-describedby="emailHelp"
                        placeholder="Enter Password"
                        required
                      />
                    </div> */}
                    {/* <div class="form-group form-check">
                      <input
                        type="checkbox"
                        onChange={text => {
                          this.setState({
                            showPassword: !this.state.showPassword
                          });
                        }}
                        class="form-check-input"
                        id="exampleCheck1"
                      />
                      <label class="form-check-label" for="exampleCheck1">
                        show password
                      </label>
                    </div> */}

                    {/* {this.state.alert.trim().length==0?"":errorHandler(this.state.alert)} */}
                    <button type="submit" className="btn btn-sm btn-primary">
                      Register
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
            <EventManagementContainer />
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
          >
            <EtcContainer />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<MainContainer />, document.querySelector("#mainContainer"));

class RegisterAlumniWhatever extends React.Component {
  state = {
    studentId: "",
    password: "",
    confirmPassword: "",
    alert: "",
    email: ""
  };
  // register = () =>{
  //   if(this.validate()){
  //     ajaxHandler({ ...this.state, requestType: "registerAccount" }, data => {
  //       if (isSuccess(data)) {
  //         window.location.href = "../admin";
  //       } else {
  //         alert("Register Failed");
  //         console.log(data)
  //       }
  //     });
  //   }
  // }

  // confirmPassword =()=>{
  //   if(document.querySelector("#password").value !== document.querySelector("#confirmPassword").value){
  //       this.setState({
  //         alert:"Password doesn't match"
  //       })
  //   }else{
  //     this.setState({
  //       alert:""
  //     })
  //   }
  // }
  // validateId = () =>{
  //   ajaxHandler({ studentId:document.querySelector("#studentId").value, requestType: "findId" }, data => {
  //     if (data.trim() == "Already Exist") {
  //       this.setState({
  //         alert:"ID taken"
  //       })
  //     }else{
  //       this.setState({
  //         alert:""
  //       })
  //     }
  //   });
  // }
  // validate(){
  //   if(this.state.alert.trim()==0){
  //     return true
  //   }
  //   return false
  // }

  render() {
    return (
      <div className="card border-0 p-3 shadow" style={{ width: "30rem" }} />
    );
  }
}

// <div className="row">
// <div className="col">
//   <form>
//     <div className="row">
//       <div className="col">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.lStudentId}</small>
//           </label>
//           <input
//             type="email"
//             className="form-control form-control-sm"
//             id="studentId"
//             aria-describedby="emailHelp"
//             placeholder={this.state.lStudentId}
//           />
//         </div>
//       </div>
//       <div className="col" />
//     </div>

//     {/* accoun name */}
//     <div className="row">
//       {/* first name */}
//       <div className="col">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.lStudentId}</small>
//           </label>
//           <input
//             type="email"
//             className="form-control form-control-sm"
//             id="fName"
//             aria-describedby="emailHelp"
//             placeholder={this.state.lFirstName}
//           />
//         </div>
//       </div>
//       {/* middle name */}
//       <div className="col">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.lMiddleName}</small>
//           </label>
//           <input
//             type="email"
//             className="form-control form-control-sm"
//             id="mName"
//             aria-describedby="emailHelp"
//             placeholder={this.state.lMiddleName}
//           />
//         </div>
//       </div>
//       {/* Last name */}
//       <div className="col">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.lLastName}</small>
//           </label>
//           <input
//             type="email"
//             className="form-control  form-control-sm"
//             id="lName"
//             aria-describedby="emailHelp"
//             placeholder={this.state.lLastName}
//           />
//         </div>
//       </div>
//     </div>
//     {/* contact info */}
//     <div className="row">
//       {/* email address */}
//       <div className="col">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.lEmail}</small>
//           </label>
//           <input
//             type="email"
//             className="form-control  form-control-sm"
//             id="email"
//             aria-describedby="emailHelp"
//             placeholder={this.state.lEmail}
//           />
//         </div>
//       </div>
//       {/* contact Number */}
//       <div className="col">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.lContact}</small>
//           </label>
//           <input
//             type="email"
//             className="form-control  form-control-sm"
//             id="contactNumber"
//             aria-describedby="emailHelp"
//             placeholder={this.state.lContact}
//           />
//         </div>
//       </div>
//     </div>
//     {/* otherInfo */}
//     <div className="row">
//       <div className="col">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.lbirthDate}</small>
//           </label>
//           <input
//             type="date"
//             className="form-control  form-control-sm"
//             id="birthDate"
//             aria-describedby="emailHelp"
//             placeholder={this.state.lbirthDate}
//           />
//         </div>
//       </div>
//       <div className="col">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.lgender}</small>
//           </label>
//           <select
//             id="gender"
//             className="form-control form-control-sm"
//           >
//             <option selected>{this.state.lgender}</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//           </select>
//         </div>
//       </div>
//       <div className="col">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.lCourse}</small>
//           </label>
//           <select
//             id="course"
//             className="form-control form-control-sm"
//           >
//             <option selected>{this.state.lgender}</option>
//             <option value="BSIT">
//               Bachelor Of Inforamation Technology
//             </option>
//             <option value="BSCS">
//               Bacherlor Of Computer Science
//             </option>
//             <option value="BSIS">
//               Bacherlor Of Information System
//             </option>
//           </select>
//         </div>
//       </div>
//     </div>
//     {/* address */}
//     <div className="row">
//       <div className="col-12">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.laddress}</small>
//           </label>
//           <input
//             type="text"
//             className="form-control  form-control-sm"
//             id="address"
//             aria-describedby="emailHelp"
//             placeholder={this.state.laddress}
//           />
//         </div>
//       </div>
//       <div className="col-12">
//         <div className="form-group">
//           <label for="exampleInputEmail1">
//             <small>{this.state.lPermaAddress}</small>
//           </label>
//           <input
//             type="text"
//             className="form-control  form-control-sm"
//             id="permanentAddress"
//             aria-describedby="emailHelp"
//             placeholder={this.state.lPermaAddress}
//           />
//         </div>
//       </div>
//     </div>
//     <div className={"row ml-2 mr-2 " + this.state.alert}>
//       <div className="alert alert-danger w-100" role="alert">
//         <small>{this.state.alertMessage}</small>
//       </div>
//     </div>
//   </form>
// </div>
// </div>
