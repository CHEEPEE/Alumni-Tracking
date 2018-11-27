class EventsContainer extends React.Component {
  state = {
      event:{}
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
        // getEvents();
        clearValue(event);
      }
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className="row">
            <div className = "col">
                <h2>Advertisement</h2>
            </div>
        </div>
        <div className = "row">
            <div className = "col">
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
        <AddEventModal event={this.state.event} onSubmit={this.onSubmit}/>
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


  function getEvents() {
    ajaxHandler({ requestType: "fetchEvents" }, renderEvents);
  }
  function deleteEvent(data){
    if(confirm("Delete Event?")){
      ajaxHandler({requestType:"deleteEvent",id:data.eventID},getEvents)
    }
  
  }