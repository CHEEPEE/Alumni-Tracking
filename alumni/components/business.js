class UpdateBusiness extends React.Component {
  getBusiness = () => {
    ajaxHandler({ requestType: "getBusinesses" }, data => {
      console.log(data);
      var listItem = JSON.parse(data).map(function(object, index) {
        return (
          <BusinessItem
            businessName={object.business_name}

            businessCat={object.categoryName}
            businessStart={object.business_start}
          />
        );
      });
      ReactDOM.render(
        <React.Fragment>{listItem}</React.Fragment>,
        document.querySelector("#businessListContainer")
      );
    });
  };
  componentDidMount() {
    this.getBusiness();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row mt-3 text-dark">
          <div className="col">
            <h5>Business </h5>
          </div>
          <div className="col">
            <button
              type="button"
              data-toggle="modal"
              data-target="#addBusiness"
              className="btn btn-primary btn-sm"
            >
              Add Business
            </button>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <h3>Business List</h3>
          </div>
        </div>
        <div className="row">
          <div className="col" id="businessListContainer" />
        </div>
        <AddBusinessModal />
      </React.Fragment>
    );
  }
}

class BusinessItem extends React.Component {
  state = {};
  render() {
    return (
      <div className="row">
        <div class={"alert alert-light border border-muted w-75 "} role="alert">
          <h4 class="alert-heading">{this.props.businessName}</h4>
          <p>
            <span class="badge badge-muted p-2">
              Business Category: {this.props.businessCat}
            </span>
          </p>
          <hr />
          <div className="row">
            <div className="col-auto">
              <small>Business Started</small>
            </div>
            <div className="col">
              <span class="badge badge-success p-2">
                {this.props.businessStart}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class AddBusinessModal extends React.Component {
  state = { businessName: "", businessCat: "" };
  fetchCategoryList = () => {
    ajaxHandler({ requestType: "fetchBusinessCategory" }, data => {
      console.log(data);
      var listItem = JSON.parse(data).map(function(object, index) {
        return (
          <option value={object.business_category_id}>
            {object.business_category_name}
          </option>
        );
      });
      ReactDOM.render(
        <React.Fragment>
          <option>Select Business Inline</option>
          {listItem}
        </React.Fragment>,
        document.getElementById("businessInLine")
      );
    });
  };
  saveBusiness = () => {
    console.log(this.state);
    ajaxHandler(
      {
        requestType: "saveBusiness",
        businessName: this.state.businessName,
        businessCat: this.state.businessCat,
        businessStart: this.state.businessStart
      },
      data => {
        console.log(data);
        if (data == "success") {
          $("#addBusiness").modal("hide");
        }
      }
    );
  };
  componentDidMount() {
    this.fetchCategoryList();
  }
  render() {
    return (
      <div
        className="modal fade"
        id="addBusiness"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
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
              <div class="form-group">
                <label for="exampleInputEmail1">Business Name</label>
                <input
                  type="text"
                  class="form-control"
                  onChange={context => {
                    this.setState({
                      businessName: context.target.value
                    });
                  }}
                  aria-describedby="emailHelp"
                  placeholder="Enter Business Name"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">
                  Select Business Type
                </label>
                <select
                  class="form-control"
                  id="businessInLine"
                  onChange={context => {
                    this.setState({
                      businessCat: context.target.value
                    });
                  }}
                />
              </div>
              <div class="form-group">
                <small class="form-text font-weight-bold text-muted">
                  Business Started
                </small>
                <input
                  type="date"
                  onChange={text => {
                    this.setState({
                      businessStart: text.target.value
                    });
                  }}
                  defaultValue={this.state.jobStart}
                  class="form-control mt-1 form-control-sm"
                  aria-describedby="emailHelp"
                />
              </div>
              {/* <div class="form-group">
                <small class="form-text font-weight-bold text-muted">
                  Business End
                </small>
                <input
                  type="date"
                  onChange={text => {
                    this.setState({
                      businessEnd: text.target.value
                    });
                  }}
                  defaultValue={this.state.jobStart}
                  class="form-control mt-1 form-control-sm"
                  aria-describedby="emailHelp"
                />
              </div> */}
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
                onClick={() => this.saveBusiness()}
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
