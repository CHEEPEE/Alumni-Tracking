class UpdateBusiness extends React.Component {
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
        <AddBusinessModal />
      </React.Fragment>
    );
  }
}

class AddBusinessModal extends React.Component {
  state = {businessName:"",businessCat:""};
  fetchCategoryList = () => {
    ajaxHandler({ requestType: "fetchBusinessCategory" },(data)=>{
      console.log(data);
      var listItem = JSON.parse(data).map(function(object, index) {
        return <option value={object.business_category_id}>{object.business_category_name}</option>;
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
  saveBusiness = () =>{
    console.log(this.state);
    ajaxHandler({ requestType: "saveBusiness",businessName:this.state.businessName,businessCat:this.state.businessCat },(data)=>{
      console.log(data);
     
    });
  }
  componentDidMount(){
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
                  onChange = {context =>{
                    this.setState({
                      businessName:context.target.value
                    })
                  }}
                  aria-describedby="emailHelp"
                  placeholder="Enter Business Name"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Select Business Type</label>
                <select class="form-control" id="businessInLine" onChange = {context =>{
                    this.setState({
                      businessCat:context.target.value
                    })
                  }}>
                </select>
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
              <button type="button" onClick = {()=>this.saveBusiness()} className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class BusinessItem extends React.Component {
  state = {  }
  render() { 
    return ( 
      <React.Fragment>
        <div className = "row">

        </div>
        <div className = "row">
        
        </div>
      </React.Fragment>
     );
  }
}
