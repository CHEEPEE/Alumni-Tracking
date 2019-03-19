class MainContainer extends React.Component {
    state = {};
    render() {
      return (
        <React.Fragment>
          <div className="tab-content h-100" id="v-pills-tabContent">
            <div
              className="tab-pane h-100 fade show active"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <ManageHomeContainer/>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-profile"
              role="tabpanel"
              aria-labelledby="v-pills-profile-tab"
            >
              <ManageAccountContainer/>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-messages"
              role="tabpanel"
              aria-labelledby="v-pills-messages-tab"
            >
              <EventsContainer/>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-settings"
              role="tabpanel"
              aria-labelledby="v-pills-settings-tab"
            >
              <AboutContainer/>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
  
  ReactDOM.render(<MainContainer />, document.querySelector("#mainContainer"));