class UpdateBusiness extends React.Component {
  getBusiness = () => {
    let sup = this;
    ajaxHandler({ requestType: "getBusinesses" }, data => {
      console.log(data);
      var listItem = JSON.parse(data).map(function(object, index) {
        return (
          <BusinessItem
            index={index}
            getBusiness={sup.getBusiness}
            business_profile_id={object.id}
            businessName={object.business_name}
            businessCat={object.categoryName}
            business_category={object.business_category}
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
      <React.Fragment>
        <div className="row">
          <div
            class={"alert alert-light border border-muted w-75 "}
            role="alert"
          >
            <h4 class="alert-heading">{this.props.businessName}</h4>
            <p>
              <span class="badge badge-muted p-2">
                Business Category: {this.props.business_category}
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
              <div className="col d-flex justify-content-end">
                <button
                  type="button"
                  // data-toggle="modal"
                  // data-target="#addBusiness"
                  className="btn btn-warning btn-sm "
                  onClick={() => {
                    $("#updateBusiness" + this.props.index).modal("toggle");
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
        <UpdateBusinessModal {...this.props} />
      </React.Fragment>
    );
  }
}

class UpdateBusinessModal extends React.Component {
  state = {};
  updateBusiness = () => {
    let { props } = this;
    console.log("update");

    let business = {
      id: props.business_profile_id,
      businessName: document.querySelector("#updateBusinessName" + props.index)
        .value,
      businessCat: document.querySelector(
        "#updateBusinessCategory" + props.index
      ).value,
      businessStart: document.querySelector(
        "#updateBusinessStart" + props.index
      ).value
    };
    ajaxHandler({ requestType: "updateBusiness", ...business }, data => {
      if (data == "success") {
        props.getBusiness();
        $("#updateBusiness" + props.index).modal("toggle");
      }
    });
  };
  render() {
    let { props } = this;
    return (
      <React.Fragment>
        <div
          className="modal fade"
          id={"updateBusiness" + props.index}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Update Business
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
                    id={"updateBusinessName" + props.index}
                    class="form-control"
                    aria-describedby="emailHelp"
                    defaultValue={props.businessName}
                    placeholder="Enter Business Name"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleFormControlSelect1">
                    Select Business Type
                  </label>
                  <input
                    type="text"
                    id={"updateBusinessCategory" + props.index}
                    defaultValue={props.business_category}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div class="form-group">
                  <small class="form-text font-weight-bold text-muted">
                    Business Started
                  </small>
                  <input
                    type="date"
                    id={"updateBusinessStart" + props.index}
                    defaultValue={props.business_start}
                    class="form-control mt-1 form-control-sm"
                    aria-describedby="emailHelp"
                  />
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
                <div
                  type="button"
                  onClick={() => {
                    this.updateBusiness();
                  }}
                  className="btn btn-primary"
                >
                  Save changes
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
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
                <label for="exampleFormControlSelect1">Business Type</label>
                <input
                  type="text"
                  onChange={text => {
                    this.setState({
                      businessCat: text.target.value
                    });
                  }}
                  defaultValue={this.state.jobStart}
                  class="form-control mt-1 form-control-sm"
                  aria-describedby="emailHelp"
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
