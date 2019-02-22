class EtcContainer extends React.Component {
  state = { category: "", businessCategory: "" };
  addCategory = () => {
    if (this.state.category != "") {
      ajaxHandler(
        { requestType: "addCategory", category: this.state.category },
        (data, context) => {
          if (data.trim() != "success") {
            alert(data);
          } else {
            $("#categoryNameInput").val("");
            this.fetchCategoryList();
          }
        },
        this
      );
    } else {
      alert("nah");
    }
  };
  addBusinessCategory = () => {
    let context = this;
    if (this.state.businessCategory != "") {
      console.log(this.state.businessCategory);

      ajaxHandler(
        {
          requestType: "addbusinessCategory",
          addBusinessCategory: this.state.businessCategory
        },
        data => {
          console.log(data);
          if (data.trim() == "success") {
            $("#businessNameInput").val("");
          }
          this.fetchBusinessCategory();
        },this
      );
    }
  };
  fetchBusinessCategory = () => {
    ajaxHandler({ requestType: "fetchBusinessCategory" },renderBusinessCategoryList);
  };
  fetchCategoryList = () => {
    ajaxHandler({ requestType: "fetchJobCategory" }, renderCategoryList);
  };
  componentDidMount() {
    this.fetchCategoryList();
    this.fetchBusinessCategory();
  }
  render() {
    return (
      <React.Fragment>
        <div className="row mt-3">
          <div className="col">
            <div className="row">
              <div className="col">
                <h3>Manage Job Categories</h3>
              </div>
            </div>
            <div className="row">
              <div className="col" id="addCategory">
                {/* category container */}
                <form
                  onSubmit={e => {
                    this.addCategory();
                    e.preventDefault();
                  }}
                >
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Category Name</label>
                        <input
                          type="text"
                          id={"categoryNameInput"}
                          className="form-control form-control-sm"
                          onChange={text => {
                            this.setState({
                              category: text.target.value
                            });
                          }}
                          defaultValue={this.state.category}
                          aria-describedby="emailHelp"
                          placeholder="Enter Category Name"
                        />
                      </div>
                    </div>
                    <div className="col" />
                    <div className="col" />
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <button type="submit" class="btn btn-sm btn-primary">
                          Add Category
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="row">
              <div className="col ml-3" id="categoryListContainer" />
            </div>
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <h3>Manage Business Categories</h3>
              </div>
            </div>
            <div className="row">
              <div className="col" id="addCategory">
                {/* category container */}
                <form
                  onSubmit={e => {
                    this.addBusinessCategory();
                    e.preventDefault();
                  }}
                >
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <label for="exampleInputEmail1">Business Name</label>
                        <input
                          type="text"
                          id={"businessNameInput"}
                          className="form-control form-control-sm"
                          onChange={text => {
                            this.setState({
                              businessCategory: text.target.value
                            });
                          }}
                          defaultValue={this.state.businessCategory}
                          aria-describedby="emailHelp"
                          placeholder="Enter Business Name"
                        />
                      </div>
                    </div>
                    <div className="col" />
                    <div className="col" />
                  </div>
                  <div className="row">
                    <div className="col">
                      <div className="form-group">
                        <button type="submit" class="btn btn-sm btn-primary">
                          Add Business Category
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col ml-3" id="businessCategoryListContainer" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function renderCategoryList(data) {
  var listItem = JSON.parse(data).map(function(object, index) {
    return <CategoryObjectiveItems key={object.id} item={object} />;
  });

  ReactDOM.render(
    <React.Fragment>{listItem}</React.Fragment>,
    document.getElementById("categoryListContainer")
  );
}
function renderBusinessCategoryList(data) {
  var listItem = JSON.parse(data).map(function(object, index) {
    return  <div className="row" key = {object.business_category_id}>{object.business_category_name}</div>;
  });

  ReactDOM.render(
    <React.Fragment>{listItem}</React.Fragment>,
    document.getElementById("businessCategoryListContainer")
  );
}

class CategoryObjectiveItems extends React.Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">{this.props.item.category}</div>
      </React.Fragment>
    );
  }
}
