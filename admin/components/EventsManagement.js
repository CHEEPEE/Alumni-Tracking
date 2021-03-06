class EventManagementContainer extends React.Component {
  state = {
    event: {},
    tab: 0
  };

  onSubmit = () => {
    let whatEvent = document.querySelector("#whatEvent").value;
    let whenEvent = document.querySelector("#whenEvent").value;
    let whereEvent = document.querySelector("#whereEvent").value;
    let eventType = document.querySelector("#eventType").value;
    let requestType = { requestType: "addEvent" };
    let event = {
      ...requestType,
      whatEvent: whatEvent,
      whenEvent: whenEvent,
      whereEvent: whereEvent,
      eventType: eventType
    };

    let sup = this;
    if (whatEvent != "" && whenEvent != "" && whereEvent != "") {
      ajaxHandler(event, data => {
        if (isSuccess(data)) {
          getEvents();
          clearValue(event);
          $("#exampleModalCenter").modal("hide");
          sup.getAlumni(event);
        }
      });
    } else {
      alert("Fill up All Fields");
    }
  };
  viewRequest = () => {
    this.setState({
      tab: 1
    });
  };

  viewEvents = () => {
    this.setState({
      tab: 0
    });
  };

  getAlumni = eventDetails => {
    let sup = this;
    $.ajax({
      type: "Post",
      url: "functions/index.php",
      data: {
        requestType: "fetchAlumni"
      },
      success: function(data) {
        // console.log(data);
        JSON.parse(data).map((object, index) => {
          sup.sendAnnouncementEmail(eventDetails, object);
        });
      }
    });
  };

  sendAnnouncementEmail = (alumniDetails, EmailDetails) => {
    let sup = this;
    console.log({ ...EmailDetails, ...alumniDetails });
    ajaxHandler(
      {
        ...EmailDetails,
        ...alumniDetails,
        requestType: "sendAnnouncementEmail"
      },
      data => {
        console.log(data);
        if (isSuccess(data)) {
        }
      }
    );
  };

  componentDidMount() {}
  render() {
    const tabs = [<EventsList />, <EventRequestList />];
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h2>Event/Advertisement Management</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-auto">
            <button
              type="button"
              className="btn btn-sm btn-light"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Add Event/Advertisement
            </button>
          </div>
          <div className="col-auto">
            <button
              type="button"
              onClick={this.state.tab == 0 ? this.viewRequest : this.viewEvents}
              className="btn btn-sm btn-light"
            >
              {this.state.tab == 0 ? "View Request" : "View Events"}
            </button>
          </div>
        </div>
        {tabs[this.state.tab]}
        <AddEventModal event={this.state.event} onSubmit={this.onSubmit} />
      </React.Fragment>
    );
  }
}

class EventsList extends React.Component {
  state = {};
  componentDidMount() {
    getEvents();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row mt-2">
          <div className="col text-primary">
            <h5>Event List</h5>
          </div>
        </div>
        <div className="container" id="eventsContainer" />
      </React.Fragment>
    );
  }
}

class EventRequestList extends React.Component {
  state = { eventType: "Choose Type" };
  approveRequest = () => {};
  componentDidMount() {
    getEventsRequest();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row mt-2">
          <div className="col text-primary">
            <h5>Event Request List</h5>
          </div>
        </div>
        <div className="container" id="eventsRequestContainer">
          sdfsfasasf
        </div>
      </React.Fragment>
    );
  }
}

const AddEventModal = props => {
  return (
    <div
      className="modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalCenterTitle">
              Add Event
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
            <div className="row w-100 m-1">
              <form className="w-100">
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label for="exampleInputEmail1">
                        <small class="form-text font-weight-bold text-muted">
                          What Event?
                        </small>
                      </label>
                      <textarea
                        type="email"
                        className="form-control form-control-sm"
                        id="whatEvent"
                        aria-describedby="emailHelp"
                        placeholder={"What Event?"}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label for="exampleInputEmail1">
                        <small class="form-text font-weight-bold text-muted">
                          Date and Time of Event?
                        </small>
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        id="whenEvent"
                        aria-describedby="emailHelp"
                        placeholder={"When Event?"}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <label for="exampleInputEmail1">
                        <small class="form-text font-weight-bold text-muted">
                          Place of Event?
                        </small>
                      </label>
                      <input
                        type="email"
                        className="form-control form-control-sm"
                        id="whereEvent"
                        aria-describedby="emailHelp"
                        placeholder={"Where Event?"}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div class="form-group">
                      <small class="form-text font-weight-bold text-muted">
                        Announcement Type
                      </small>
                      <select
                        id="eventType"
                        className="form-control form-control-sm"
                        onChange={text => {
                          $("#eventType").on("change", function() {
                            $("option:selected", this)
                              .hide()
                              .siblings()
                              .show();
                          });
                          // this.setState({
                          //   gender: text.target.value
                          // });
                        }}
                        // defaultValue = {"Choose Advertisement Type . . ."}
                      >
                        {/* <option selected>Choose Advertisement Type . . .</option> */}
                        <option value="Announcement/Events">
                          Announcement/Events
                        </option>
                        <option value="Job Opportunities">
                          Job Opportunities
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
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
              onClick={props.onSubmit}
              type="button"
              className="btn btn-primary"
            >
              Save Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

class EventsItemList extends React.Component {
  state = {};
  setProfile(data, args) {
    // console.log(data);

    let profile = JSON.parse(data);
    // console.log(profile.first_name);
    args.setState({
      ...args.state,
      ...profile
    });
    args.setState({
      photo: upload_dir + profile.photo
    });
  }
  getUser() {
    let userId = this.props.item.user_id;
    // if(userId){
    //   return false
    // }
    ajaxHandler(
      { requestType: "getProfile", user_id: userId },
      this.setProfile,
      this
    );
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <div className="container mt-2 w-100 border-bottom pb-2">
        <div className="row">
          <small>
            from <a className="text-primary">@{this.state.first_name}</a>
          </small>
          {this.props.item.eventType == "" ? (
            ""
          ) : (
            <span class="ml-2 badge badge-info">
              <small>{this.props.item.eventType}</small>
            </span>
          )}
        </div>
        <div className="row mt-1">
          <h5>
            {this.props.item.whenEvent} @ {this.props.item.whereEvent}
          </h5>
        </div>
        <div className="row">{this.props.item.whatEvent}</div>
        <div className="row mt-2 d-flex flex-row-reverse bd-highlight">
          <button
            type="button"
            className="btn ml-2 btn-sm btn-success "
            // onClick={() => this.props.removeEvent(this.props.item)}
            data-toggle="modal"
            data-target={"#updateEventModal" + this.props.item.eventID}
          >
            Update Event
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger "
            onClick={() => this.props.removeEvent(this.props.item)}
          >
            Delete Event
          </button>
        </div>
        <UpdateEventModal
          event={this.props.item}
          eventID={this.props.item.eventID}
        />
      </div>
    );
  }
}

class EventsItemListRequest extends React.Component {
  state = {};
  setProfile(data, args) {
    console.log(data);

    let profile = JSON.parse(data);
    console.log(profile.first_name);
    args.setState({
      ...args.state,
      ...profile
    });
    args.setState({
      photo: upload_dir + profile.photo
    });
  }

  getUser() {
    let userId = this.props.item.user_id;
    // if(userId){
    //   return false
    // }
    ajaxHandler(
      { requestType: "getProfile", user_id: userId },
      this.setProfile,
      this
    );
  }

  componentDidMount() {
    this.getUser();
  }
  render() {
    return (
      <React.Fragment>
        <div className="container mt-2 w-100 border-bottom pb-2">
          <div className="row">
            <small>
              from <a className="text-primary">@{this.state.first_name}</a>
            </small>
            {this.props.item.eventType == "" ? (
              ""
            ) : (
              <span class="ml-2 badge badge-info">
                <small>{this.props.item.eventType}</small>
              </span>
            )}
          </div>
          <div className="row ">
            <h5>
              {this.props.item.whenEvent} @ {this.props.item.whereEvent}
            </h5>
          </div>
          <div className="row">{this.props.item.whatEvent}</div>
          <div className="row mt-2 d-flex flex-row-reverse bd-highlight">
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => this.props.removeEvent(this.props.item)}
              >
                Delete Event
              </button>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-sm btn-warning"
                data-toggle="modal"
                data-target={"#updateRequestModal" + this.props.item.eventID}
              >
                Update Event/Advertisement
              </button>
            </div>
            <div className="col-auto">
              <button
                type="button"
                className="btn btn-sm btn-success text-white"
                onClick={() => {
                  if (confirm("Approve Event/Announcement?")) {
                    approveAdsRequest(this.props.item.eventID);
                  }
                }}
              >
                Approve Event/Advertisement
              </button>
            </div>
          </div>
        </div>
        <UpdateRequestModal {...this.props} />
      </React.Fragment>
    );
  }
}

class UpdateRequestModal extends React.Component {
  state = {};

  updateRequest = () => {
    let {
      item: {
        eventID,
        eventStatus,
        eventType,
        timeStamp,
        user_id,
        whatEvent,
        whenEvent,
        whereEvent
      }
    } = this.props;
    let updateRequestData = {
      whatEvent: document.querySelector("#whatEvent" + this.props.item.eventID)
        .value,
      whenEvent: document.querySelector("#whenEvent" + this.props.item.eventID)
        .value,
      whereEvent: document.querySelector(
        "#whereEvent" + this.props.item.eventID
      ).value,
      eventType: document.querySelector("#eventType" + this.props.item.eventID)
        .value,
      eventID: this.props.item.eventID
    };

    console.log(updateRequestData);
    if (
      updateRequestData.whatEvent != "" &&
      updateRequestData.whenEvent != "" &&
      updateRequestData.whereEvent != ""
    ) {
      ajaxHandler(
        { requestType: "updateMyRequest", ...updateRequestData },
        data => {
          if (data.trim() == "success") {
            $("#updateRequestModal" + eventID).modal("toggle");
            getEventsRequest();
          }
        }
      );
    } else {
      alert("Please Fill up All Fields");
    }
  };
  componentDidMount() {
    console.log(this.props);
    console.log(this.props.item.eventID);
  }
  render() {
    let {
      item: {
        eventID,
        eventStatus,
        eventType,
        timeStamp,
        user_id,
        whatEvent,
        whenEvent,
        whereEvent
      }
    } = this.props;
    return (
      <div
        className="modal fade"
        id={"updateRequestModal" + eventID}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Update My Request for Event/Advertisement
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
              <div className="row w-100 m-1">
                <form className="w-100">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label for="exampleInputEmail1">
                          <small>What Event?</small>
                        </label>
                        <textarea
                          type="email"
                          className="form-control form-control-sm"
                          id={"whatEvent" + eventID}
                          aria-describedby="emailHelp"
                          defaultValue={whatEvent}
                          placeholder={"What Event?"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label for="exampleInputEmail1">
                          <small>Date and Time of Event?</small>
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          id={"whenEvent" + eventID}
                          aria-describedby="emailHelp"
                          defaultValue={whenEvent}
                          placeholder={"When Event?"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label for="exampleInputEmail1">
                          <small>Place of Event?</small>
                        </label>
                        <input
                          type="email"
                          className="form-control form-control-sm"
                          id={"whereEvent" + eventID}
                          defaultValue={whereEvent}
                          aria-describedby="emailHelp"
                          placeholder={"Where Event?"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div class="form-group">
                        <small class="form-text font-weight-bold text-muted">
                          Announcement Type
                        </small>
                        <select
                          id={"eventType" + eventID}
                          className="form-control form-control-sm"
                          defaultValue={eventType}
                          onChange={text => {
                            $("#eventType").on("change", function() {
                              $("option:selected", this)
                                .hide()
                                .siblings()
                                .show();
                            });
                            // this.setState({
                            //   gender: text.target.value
                            // });
                          }}
                          // defaultValue = {"Choose Advertisement Type . . ."}
                        >
                          {/* <option selected>Choose Advertisement Type . . .</option> */}
                          <option value="Announcement/Events">
                            Announcement/Events
                          </option>
                          <option value="Job Opportunities">
                            Job Opportunities
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
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
                onClick={() => {
                  this.updateRequest();
                }}
              >
                Save Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function getEvents() {
  ajaxHandler({ requestType: "fetchEvents" }, renderEvents);
}

function getEventsRequest() {
  ajaxHandler({ requestType: "fetchEventsRequest" }, renderEventsRequest);
}
function deleteEvent(data) {
  if (confirm("Delete Event?")) {
    ajaxHandler({ requestType: "deleteEvent", id: data.eventID }, () => {
      getEvents();
      getEventsRequest();
    });
  }
}

function renderEvents(data) {
  // console.log(data);
  var listItem = JSON.parse(data).map(function(object, index) {
    return (
      <EventsItemList
        key={object.eventID}
        item={object}
        removeEvent={deleteEvent}
      />
    );
  });

  ReactDOM.render(
    <React.Fragment>{listItem}</React.Fragment>,
    document.getElementById("eventsContainer")
  );
}
function approveAdsRequest(eventId) {
  ajaxHandler(
    { requestType: "approveEvent", eventId: eventId, status: "approved" },
    getEventsRequest
  );

  ajaxHandler({ requestType: "getEvent", eventId: eventId }, eventDataObj => {
    console.log(eventDataObj);

    JSON.parse(eventDataObj).map(eventDetails => {
      $.ajax({
        type: "Post",
        url: "functions/index.php",
        data: {
          requestType: "fetchAlumni"
        },
        success: function(data) {
          // console.log(data);
          JSON.parse(data).map((object, index) => {
            sendApprovedRequestToAlumni(eventDetails, object);
          });
        }
      });
    });
  });
}

function sendApprovedRequestToAlumni(eventDetails, userDetails) {
  console.log({ ...eventDetails, ...userDetails });
  ajaxHandler(
    {
      ...eventDetails,
      ...userDetails,
      requestType: "sendAnnouncementEmail"
    },
    data => {
      console.log(data);
      if (isSuccess(data)) {
      }
    }
  );
}
function renderEventsRequest(data) {
  console.log(data);
  var listItem = JSON.parse(data).map(function(object, index) {
    return (
      <EventsItemListRequest
        key={object.eventID}
        item={object}
        removeEvent={deleteEvent}
      />
    );
  });

  ReactDOM.render(
    <React.Fragment>{listItem}</React.Fragment>,
    document.getElementById("eventsRequestContainer")
  );
}

class UpdateEventModal extends React.Component {
  state = {
    whatEvent: this.props.event.whatEvent,
    whenEvent: this.props.event.whenEvent,
    whereEvent: this.props.event.whereEvent,
    eventType: this.props.event.eventType
  };

  updateEvent = () => {
    console.log("test");
    let eventID = this.props.event.eventID;
    let event = { requestType: "updateEvent", eventID: eventID, ...this.state };
    ajaxHandler(
      { ...event },
      data => {
        console.log(data);
        getEvents();
        $("#updateEventModal" + this.props.eventID).modal("hide");
      },
      this
    );
  };
  render() {
    return (
      <div
        className="modal fade"
        id={"updateEventModal" + this.props.eventID}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalCenterTitle">
                Update Event/Advertisement
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
              <div className="row w-100 m-1">
                <form className="w-100">
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label for="exampleInputEmail1">
                          <small>What Event?</small>
                        </label>
                        <textarea
                          type="email"
                          defaultValue={this.state.whatEvent}
                          className="form-control form-control-sm"
                          onChange={text => {
                            this.setState({
                              whatEvent: text.target.value
                            });
                          }}
                          id={"whatEvent" + this.props.eventID}
                          aria-describedby="emailHelp"
                          placeholder={"What Event?"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label for="exampleInputEmail1">
                          <small>Date and Time of Event?</small>
                        </label>
                        <input
                          type="email"
                          defaultValue={this.state.whenEvent}
                          className="form-control form-control-sm"
                          id={"whenEvent" + this.props.eventID}
                          onChange={text => {
                            this.setState({
                              whenEvent: text.target.value
                            });
                          }}
                          aria-describedby="emailHelp"
                          placeholder={"When Event?"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label for="exampleInputEmail1">
                          <small>Place of Event?</small>
                        </label>
                        <input
                          type="email"
                          defaultValue={this.state.whereEvent}
                          className="form-control form-control-sm"
                          id={"whereEvent" + this.props.eventID}
                          onChange={text => {
                            this.setState({
                              whereEvent: text.target.value
                            });
                          }}
                          aria-describedby="emailHelp"
                          placeholder={"Where Event?"}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col">
                      <div class="form-group">
                        <small class="form-text font-weight-bold text-muted">
                          Announcement Type
                        </small>
                        <select
                          id={"eventType" + this.props.eventID}
                          className="form-control form-control-sm"
                          onChange={text => {
                            $("#eventType").on("change", function() {
                              $("option:selected", this)
                                .hide()
                                .siblings()
                                .show();
                            });
                            this.setState({
                              eventType: text.target.value
                            });
                          }}
                          defaultValue={this.state.eventType}
                        >
                          {/* <option selected>Choose Advertisement Type . . .</option> */}
                          <option value="Announcement/Events">
                            Announcement/Events
                          </option>
                          <option value="Job Opportunities">
                            Job Opportunities
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </form>
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
                // onClick={props.onSubmit}
                type="button"
                className="btn btn-primary"
                onClick={this.updateEvent}
              >
                Update Event/Advertisement
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
