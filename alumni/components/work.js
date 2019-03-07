class UpdateWork extends React.Component {
  state = {
    currentJobProfile: { name: "Something awsome" },
    loaded: false,
    job_salary: ""
  };
  fetchJob = () => {
    let context = this;
    ajaxHandler({ requestType: "fetchCurrentJob" }, data => {
      JSON.parse(data).map(function(object, index) {
        // console.log(object);
        context.setState({
          currentJobProfile: { ...object },
          loaded: true
        });
        context.setState({
          job_salary: context.getSalary(object.job_salary),
          job_start: context.dateFormater(object.job_start)
        });
      });

      console.log(context.state.currentJobProfile);
    });
  };

  fetchJobHistory = () => {
    let context = this;
    ajaxHandler({ requestType: "fetchJobHistory" }, data => {
      console.log(data);

      let listItem = JSON.parse(data).map(function(object, index) {
        return (
          <JobHistoryItem
            object={object}
            getSalary={context.getSalary}
            dateFormater={context.dateFormater}
          />
        );
      });

      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.querySelector("#jobHistory")
      );

      // console.log(context.state.currentJobProfile);
    });
  };

  dateFormater = dateInString => {
    let date = dateInString.split("-");
    console.log(date);
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "October",
      "September",
      "November",
      "December"
    ];

    return `${months[date[1] - 1]} - ${date[2]} - ${date[0]}`;
  };

  getSalary = job_salary => {
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
    let extractNumber = job_salary.match(/\d+/g)[0] - 1;
    return salary[extractNumber];
    // return salary[1]
  };

  componentDidMount() {
    this.fetchJob();
    this.fetchJobHistory();
  }
  render() {
    // let jobProf = new JObProfiles();
    return (
      <React.Fragment>
        <div className="row pt-3">
          <div className="col">
            <button
              type="button"
              data-toggle="modal"
              data-target="#addJobDesModal"
              className="btn btn-primary btn-sm"
            >
              Add Job
            </button>
          </div>
        </div>
        <div className="row pt-3">
          <div className="col">
            <h5 className="text-muted">Current Job</h5>
            {this.state.currentJobProfile.job_title == null ? (
              ""
            ) : (
              <div className={"row"}>
                <div className="col">
                  <div class={"alert alert-primary"} role="alert">
                    <h4 class="alert-heading">
                      {this.state.currentJobProfile.job_title}
                    </h4>
                    <p>
                      <span class="badge badge-primary p-2">
                        Salary: {this.state.job_salary}
                      </span>
                    </p>
                    <hr />
                    <div className="row">
                      <div className="col-auto">
                        <small>Job Started</small>
                      </div>
                      <div className="col">
                        <span class="badge badge-success p-2">
                          {this.state.job_start}
                        </span>
                      </div>
                      <div className="col  d-flex justify-content-end">
                        <button
                          type="button"
                          data-toggle="modal"
                          data-target="#updateModal"
                          className="btn btn-warning btn-sm "
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="col">
            <div className="row">
              <h5 className="text-muted">Job History</h5>
            </div>
            <div className="row">
              <div className="col" id="jobHistory" />
            </div>
          </div>
        </div>

        <div className="row mt-3 mb-5 d-none">
          <div className="col d-flex justify-content-center">
            <button
              type="button"
              onClick={() => this.updateProfile()}
              class="btn btn-primary"
            >
              Update Job Description
            </button>
          </div>
        </div>
        <UpdateCurrentJob
          {...this.state.currentJobProfile}
          fetchJob={this.fetchJob}
        />
        <AddJobModal
          fetchJob={this.fetchJob}
          fetchJobHistory={this.fetchJobHistory}
        />
      </React.Fragment>
    );
  }
}
class JobHistoryItem extends React.Component {
  state = {};

  componentDidMount() {
    this.setState({
      currentJobProfile: { ...this.props.object },
      loaded: true
    });
    this.setState({
      job_salary: this.props.getSalary(this.props.object.job_salary),
      job_start: this.props.dateFormater(this.props.object.job_start)
    });
  }

  render() {
    return (
      <div className="row">
        <div class={"alert alert-light border border-muted w-75 "} role="alert">
          <h4 class="alert-heading">{this.props.object.job_title}</h4>
          <p>
            <span class="badge badge-muted p-2">
              Salary: {this.state.job_salary}
            </span>
          </p>
          <hr />
          <div className="row">
            <div className="col-auto">
              <small>Job Started</small>
            </div>
            <div className="col">
              <span class="badge badge-success p-2">
                {this.state.job_start}
              </span>
            </div>
            {/* <div className="col  d-flex justify-content-end">
              <button
                type="button"
                data-toggle="modal"
                className="btn btn-warning btn-sm "
              >
                Edit
              </button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

class UpdateCurrentJob extends React.Component {
  state = {};
  fetchJobCategory = () => {
    let sup = this;
    ajaxHandler({ requestType: "fetchJobCategory" }, data => {
      console.log(data);
      let listItem = JSON.parse(data).map(function(object, index) {
        return (
          <option key={index} value={object.id}>
            {object.category}
          </option>
        );
      });
      ReactDOM.render(
        <React.Fragment>
          <small class="form-text font-weight-bold text-muted">
            Job Inline
          </small>
          <select
            // onChange={text => {
            //   // this.setState({ jobInline: text.target.value });
            // }}
            class="form-control form-control-sm"
            id="currentJobInlineUpdate"
          >
            <option value="nan">Select Inline Job</option>
            {listItem}
          </select>
        </React.Fragment>,
        document.getElementById("updatejobInlineSelect")
      );
      // $("#currentJobInline").val(sup.props.job_inline);
    });
    console.log(this.props.job_inline);
  };

  updateJob = () => {
    let sup = this;
    let currentJob = {
      jobTitle: this.getValue("currentJobTitle"),
      jobSalary: this.getValue("salaryRangeCurrent"),
      jobStart: this.getValue("jobStartCurrent"),
      jobEnd: this.getValue("jobEndCurrent"),
      jobInline: this.getValue("currentJobInlineUpdate")
    };
    console.log({ ...currentJob });
    ajaxHandler({ requestType: "updateCurrentJob", ...currentJob }, data => {
      console.log(data);
      $("#updateModal").modal("toggle");
      sup.props.fetchJob();
    });
  };

  getValue = id => {
    return document.querySelector("#" + id).value;
  };

  componentDidMount() {
    this.fetchJobCategory();
    console.log(this.props);
    // $("#salaryRangeCurrent").val(this.props.job_salary);
    // document.querySelector("#salaryRangeCurrent").value = this.props.job_salary;
  }
  render() {
    return (
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Current Job Description
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
                <div className="col p-3">
                  <div class="form-group">
                    <small class="form-text font-weight-bold text-muted">
                      Job Title
                    </small>
                    <input
                      type="text"
                      onChange={text => {
                        this.setState({
                          jobTitle: text.target.value
                        });
                      }}
                      id="currentJobTitle"
                      defaultValue={this.props.job_title}
                      class="form-control mt-1 form-control-sm"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="form-group">
                    <small class="form-text font-weight-bold text-muted">
                      Job Salary
                    </small>
                    <select
                      id="salaryRangeCurrent"
                      class="form-control"
                      // defaultValue={this.props.job_salary}
                    >
                      <option value="s1" selected>
                        Less than 10K
                      </option>
                      <option value="s2">10K- 15K</option>
                      <option value="s3">16K - 20K</option>
                      <option value="s4">21K - 30K</option>
                      <option value="s5">30K - 50K</option>
                      <option value="s6">50K - 80K</option>
                      <option value="s7">80K - 100K</option>
                      <option value="s8">100K - 150K</option>
                      <option value="s9">150K - 200k</option>
                      <option value="s10">200K - 500K</option>
                      <option value="s11">Greater than 500K</option>
                    </select>
                  </div>
                </div>
                <div className="col p-3">
                  <div class="form-group">
                    <small class="form-text font-weight-bold text-muted">
                      Job Started
                    </small>
                    <input
                      type="date"
                      onChange={text => {
                        this.setState({
                          jobStart: text.target.value
                        });
                      }}
                      id="jobStartCurrent"
                      defaultValue={this.props.job_start}
                      class="form-control mt-1 form-control-sm"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class={"form-group"}>
                    <small class="form-text font-weight-bold text-muted">
                      Job End
                    </small>
                    <input
                      type="date"
                      onChange={text => {
                        this.setState({
                          jobEnd: text.target.value
                        });
                      }}
                      id="jobEndCurrent"
                      defaultValue={this.props.job_end}
                      class={"form-control mt-1 form-control-sm"}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="form-group" id="updatejobInlineSelect" />
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
                onClick={() => {
                  this.updateJob();
                }}
                type="button"
                className="btn btn-primary"
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

class UpdateJobHistoryModall extends React.Component {
  state = {};
  fetchJobCategory = () => {
    let sup = this;
    ajaxHandler({ requestType: "fetchJobCategory" }, data => {
      console.log(data);
      let listItem = JSON.parse(data).map(function(object, index) {
        return (
          <option key={index} value={object.id}>
            {object.category}
          </option>
        );
      });
      ReactDOM.render(
        <React.Fragment>
          <small class="form-text font-weight-bold text-muted">
            Job Inline
          </small>
          <select
            value={sup.props.job_inline}
            onChange={text => {
              this.setState({ jobInline: text.target.value });
            }}
            class="form-control form-control-sm"
          >
            <option>Select Inline Job</option>
            {listItem}
          </select>
        </React.Fragment>,
        document.getElementById("updateJobHistory")
      );
    });
  };
  componentDidMount() {
    this.fetchJobCategory();
  }
  render() {
    return (
      <div
        className="modal fade"
        id="updateModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Current Job Description
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
                <div className="col p-3">
                  <div class="form-group">
                    <small class="form-text font-weight-bold text-muted">
                      Job Title
                    </small>
                    <input
                      type="text"
                      onChange={text => {
                        this.setState({
                          jobTitle: text.target.value
                        });
                      }}
                      defaultValue={this.props.job_title}
                      class="form-control mt-1 form-control-sm"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="form-group">
                    <small class="form-text font-weight-bold text-muted">
                      Job Salary
                    </small>
                    <select
                      onChange={select => {
                        this.setState({
                          jobSalary: select.target.value
                        });
                      }}
                      class="form-control"
                      value={this.props.job_salary}
                    >
                      <option value="s1" selected>
                        Less than 10K
                      </option>
                      <option value="s2">10K- 15K</option>
                      <option value="s3">16K - 20K</option>
                      <option value="s4">21K - 30K</option>
                      <option value="s5">30K - 50K</option>
                      <option value="s6">50K - 80K</option>
                      <option value="s7">80K - 100K</option>
                      <option value="s8">100K - 150K</option>
                      <option value="s9">150K - 200k</option>
                      <option value="s10">200K - 500K</option>
                      <option value="s11">Greater than 500K</option>
                    </select>
                  </div>
                </div>
                <div className="col p-3">
                  <div class="form-group">
                    <small class="form-text font-weight-bold text-muted">
                      Job Started
                    </small>
                    <input
                      type="date"
                      onChange={text => {
                        this.setState({
                          jobStart: text.target.value
                        });
                      }}
                      defaultValue={this.props.job_start}
                      class="form-control mt-1 form-control-sm"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class={"form-group"}>
                    <small class="form-text font-weight-bold text-muted">
                      Job End
                    </small>
                    <input
                      type="date"
                      onChange={text => {
                        this.setState({
                          jobEnd: text.target.value
                        });
                      }}
                      defaultValue={this.props.job_end}
                      class={"form-control mt-1 form-control-sm"}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="form-group" id="updateJobHistory" />
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
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AddJobModal extends React.Component {
  state = {
    isCurrentWork: true,
    jobInline: "",
    jobTitle: "",
    jobSalary: "",
    jobStart: "",
    jobEnd: "",
    jobInline: ""
  };
  submitProfile = () => {
    console.log(this.state);
    ajaxHandler(
      { requestType: "addJobDes", ...this.state },
      data => {
        console.log(data);
        if (data.trim() == "success") {
          alert("Profile Updated");
          $("#addJobDesModal").modal("hide");
          this.props.fetchJob();
        }
      },
      this
    );
  };

  fetchJobCategory() {
    ajaxHandler({ requestType: "fetchJobCategory" }, data => {
      console.log(data);
      var listItem = JSON.parse(data).map(function(object, index) {
        return <option value={object.id}>{object.category}</option>;
      });
      ReactDOM.render(
        <React.Fragment>
          <small class="form-text font-weight-bold text-muted">
            Job Inline
          </small>
          <select
            onChange={text => {
              this.setState({ jobInline: text.target.value });
            }}
            class="form-control form-control-sm"
          >
            <option>Select Inline Job</option>
            {listItem}
          </select>
        </React.Fragment>,
        document.getElementById("jobInlineSelect")
      );
    });
  }

  currentWork = () => {
    let isCurrentWork = document.getElementById("isCurrentWork").checked;
    // console.log(isCurrentWork);
    this.setState({
      isCurrentWork: isCurrentWork
    });
  };
  componentDidMount() {
    this.fetchJobCategory();
  }
  render() {
    return (
      <div
        className="modal fade"
        id="addJobDesModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Job Description
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
                <div className="col p-3">
                  <div class="form-group">
                    <small class="form-text font-weight-bold text-muted">
                      Job Title
                    </small>
                    <input
                      type="text"
                      onChange={text => {
                        this.setState({
                          jobTitle: text.target.value
                        });
                      }}
                      defaultValue={this.state.jobTitle}
                      class="form-control mt-1 form-control-sm"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="form-group">
                    <small class="form-text font-weight-bold text-muted">
                      Job Salary
                    </small>
                    <select
                      onChange={select => {
                        this.setState({
                          jobSalary: select.target.value
                        });
                      }}
                      class="form-control"
                    >
                      <option value="s1" selected>
                        Less than 10K
                      </option>
                      <option value="s2">10K- 15K</option>
                      <option value="s3">16K - 20K</option>
                      <option value="s4">21K - 30K</option>
                      <option value="s5">30K - 50K</option>
                      <option value="s6">50K - 80K</option>
                      <option value="s7">80K - 100K</option>
                      <option value="s8">100K - 150K</option>
                      <option value="s9">150K - 200k</option>
                      <option value="s10">200K - 500K</option>
                      <option value="s11">Greater than 500K</option>
                    </select>
                  </div>
                </div>
                <div className="col p-3">
                  <div class="form-group">
                    <small class="form-text font-weight-bold text-muted">
                      Job Started
                    </small>
                    <input
                      type="date"
                      onChange={text => {
                        this.setState({
                          jobStart: text.target.value
                        });
                      }}
                      defaultValue={this.state.jobStart}
                      class="form-control mt-1 form-control-sm"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class={"form-group"}>
                    <small class="form-text font-weight-bold text-muted">
                      Job End
                    </small>
                    <input
                      type="date"
                      onChange={text => {
                        this.setState({
                          jobEnd: text.target.value
                        });
                      }}
                      defaultValue={this.state.jobEnd}
                      class={"form-control mt-1 form-control-sm"}
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div class="form-group" id="jobInlineSelect" />
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
                onClick={this.submitProfile}
                type="button"
                className="btn btn-primary"
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
