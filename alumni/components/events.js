class EventsContainer extends React.Component {
  state = {
    isAdsRendered: true,
    event: {
      eventID: ""
    }
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
    if (whatEvent != "" && whenEvent != "" && whereEvent != "") {
      ajaxHandler(event, data => {
        if (isSuccess(data)) {
          getEvents();
          clearValue(event);
          $("#exampleModalCenter").modal("hide");
        }
      });
    } else {
      alert("Fill up All Fields");
    }
  };
  getEvents = () => {
    if (this.state.isAdsRendered) {
      getMyRequest(this.state.isAdsRendered);
    } else {
      getEvents();
    }
  };
  componentDidMount() {
    getEvents();
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h2>Advertisement</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              Request for Event/Advertisement
            </button>
            <button
              type="button"
              className="btn btn-sm btn-primary ml-3"
              data-toggle="modal"
              onClick={() => {
                this.setState({ isAdsRendered: !this.state.isAdsRendered });
                if (this.state.isAdsRendered) {
                  getMyRequest(this.state.isAdsRendered);
                } else {
                  getEvents();
                }
              }}
            >
              {this.state.isAdsRendered
                ? "View my Request"
                : "View Advertisment"}
            </button>
          </div>
        </div>
        <div className="row" id="eventsContainer" />
        <AddEventModal event={this.state.event} onSubmit={this.onSubmit} />
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
              Add Event/Advertisement
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
                        <small>Date and Time of Event?</small>
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
                        <small>Place of Event?</small>
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
    let profile = JSON.parse(data);
    args.setState({
      ...args.state,
      ...profile
    });
    console.log(profile);
    args.setState({
      photo: upload_dir + profile.photo
    });
  }
  getUser() {
    let userId = this.props.item.user_id;
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
    let { props } = this;
    return (
      <React.Fragment>
        <div className="container ml-3 mt-2 w-100 pb-2">
          <div className="row">
            <small>
              from{" "}
              <a className="text-primary font-weight-bold">
                @{this.state.first_name}
              </a>
            </small>
            {this.props.item.eventType == "" ? (
              ""
            ) : (
              <span class="ml-2 badge badge-info">
                <small>{this.props.item.eventType}</small>
              </span>
            )}
          </div>
          <div className="row mt-2 mb-2">
            <div className="col">
              <h5>
                {this.props.item.whenEvent} @ {this.props.item.whereEvent}
              </h5>
            </div>
            <div className="col d-flex justify-content-end">
              {props.isAdsRendered ? (
                <button
                  type="button"
                  className="btn btn-sm btn-warning ml-3"
                  data-toggle="modal"
                  data-target={"#updateRequestModal" + this.props.item.eventID}
                >
                  Update Event
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="row border bg-light rounded border-muted p-2">
            <div className="col">{this.props.item.whatEvent}</div>
          </div>
          <div className="row mt-2 d-flex flex-row-reverse bd-highlight" />
        </div>
        {/* <UpdateEventModal event = {this.props.item} eventID={this.props.item.eventID} /> */}
        <UpdateRequestModal {...props} />
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
      updateRequestData.FwhereEvent != ""
    ) {
      ajaxHandler(
        { requestType: "updateMyRequest", ...updateRequestData },
        data => {
          if (data == "success") {
            $("#updateRequestModal" + eventID).modal("toggle");
            getMyRequest(true);
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

function renderEvents(data) {
  console.log(data);
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

function getMyRequest(isAdsRendered) {
  ajaxHandler({ requestType: "fetchMyRequest" }, data => {
    var listItem = JSON.parse(data).map(function(object, index) {
      return (
        <EventsItemList
          key={object.eventID}
          item={object}
          isAdsRendered={isAdsRendered}
          removeEvent={deleteEvent}
        />
      );
    });

    ReactDOM.render(
      <React.Fragment>{listItem}</React.Fragment>,
      document.getElementById("eventsContainer")
    );
  });
}

function getEvents() {
  ajaxHandler({ requestType: "fetchEvents" }, renderEvents);
}
function deleteEvent(data) {
  if (confirm("Delete Event?")) {
    ajaxHandler({ requestType: "deleteEvent", id: data.eventID }, getEvents);
  }
}
