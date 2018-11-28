class EventManagementContainer extends React.Component {
  state = {
    event: {},
    tab: 0
  };

  onSubmit = () => {
    let whatEvent = document.querySelector("#whatEvent").value;
    let whenEvent = document.querySelector("#whenEvent").value;
    let whereEvent = document.querySelector("#whereEvent").value;
    let requestType = { requestType: "addEvent" };
    let event = {
      ...requestType,
      whatEvent: whatEvent,
      whenEvent: whenEvent,
      whereEvent: whereEvent
    };

    ajaxHandler(event, data => {
      if (isSuccess(data)) {
        getEvents();
        clearValue(event);
        $("#exampleModalCenter").modal("hide");
      }
    });
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

  componentDidMount() {}
  render() {
    const tabs = [<EventsList />, <EventRequestList />];
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <h2>Event Management</h2>
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
              Add Event
            </button>
          </div>
          <div className="col-auto">
            <button
              type="button"
              onClick={this.state.tab==0?this.viewRequest:this.viewEvents}
              className="btn btn-sm btn-light"
            >
              {this.state.tab==0?"View Request":"View Events"}
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
  state = {};
  approveRequest =()=>{
    
  }
  componentDidMount(){
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
  render() {
    return (
      <div className="container mt-2 w-100 border-bottom pb-2">
        <div className="row">
          <h5>
            {this.props.item.whenEvent} @ {this.props.item.whereEvent}
          </h5>
        </div>
        <div className="row">{this.props.item.whatEvent}</div>
        <div className="row mt-2 d-flex flex-row-reverse bd-highlight">
          <button
            type="button"
            className="btn btn-sm btn-danger "
            onClick={() => this.props.removeEvent(this.props.item)}
          >
            Delete Event
          </button>
        </div>
      </div>
    );
  }
}

class EventsItemListRequest extends React.Component {
  render() {
    return (
      <div className="container mt-2 w-100 border-bottom pb-2">
        <div className="row ">
          <h5>
            {this.props.item.whenEvent} @ {this.props.item.whereEvent}
          </h5>
        </div>
        <div className="row">{this.props.item.whatEvent}</div>
        <div className="row mt-2 d-flex flex-row-reverse bd-highlight">
          <div className = "col-auto">
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => this.props.removeEvent(this.props.item)}
          >
            Delete Event
          </button>
          </div>
          <div className = "col-auto">
          <button
            type="button"
            className="btn btn-sm btn-success"
            onClick={() => alert("approve")}
          >
            Approve Event/Advertisement
          </button>
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
    ajaxHandler({ requestType: "deleteEvent", id: data.eventID }, getEvents);
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
