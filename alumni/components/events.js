class EventsContainer extends React.Component {
  state = {
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

    ajaxHandler(event, data => {
      if (isSuccess(data)) {
        // getEvents();

        clearValue(event);
        $("#exampleModalCenter").modal("hide");
      }
    });
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
              onClick={props.onSubmit}
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
    return (
      <React.Fragment>
        <div className="container ml-3 mt-2 w-100 pb-2">
          <div className="row">
            <small>
              from <a className="text-primary font-weight-bold">@{this.state.first_name}</a>
            </small>
            {this.props.item.eventType == "" ? (
              ""
            ) : (
              <span class="ml-2 badge badge-info">
                <small>{this.props.item.eventType}</small>
              </span>
            )}
          </div>
          <div className="row mt-2">
            <h5>
              {this.props.item.whenEvent} @ {this.props.item.whereEvent}
            </h5>
          </div>
          <div className="row border bg-light rounded border-muted p-2">
            <div className = "col">
            {this.props.item.whatEvent}
            </div>
          </div>
          <div className="row mt-2 d-flex flex-row-reverse bd-highlight" />
        </div>
        {/* <UpdateEventModal event = {this.props.item} eventID={this.props.item.eventID} /> */}
      </React.Fragment>
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

function getEvents() {
  ajaxHandler({ requestType: "fetchEvents" }, renderEvents);
}
function deleteEvent(data) {
  if (confirm("Delete Event?")) {
    ajaxHandler({ requestType: "deleteEvent", id: data.eventID }, getEvents);
  }
}
