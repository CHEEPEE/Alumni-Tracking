class MainContainer extends React.Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div style={{ height: "15%" }} className="row bg-danger">
          <div className="col align-self-center text-center">
            <img className="w-25" src={upload_dir + "ua-logo.png"} />
          </div>
          <div className="col-6 pt-3 text-white text-center">
            <h3>REPUBLIC OF THE PHILIPPINES</h3>
            <h1>UNIVERSITY OF ANTIQUE</h1>
          </div>
          <div className="col  align-self-center text-center align-middle">
            <img className="w-25" src={upload_dir + "ccs-logo.png"} />
          </div>
        </div>
        <div
          style={{
            height: "85%",
            backgroundImage: `url(${upload_dir + "uu.jpg"})`,
            backgroundSize: "cover",
          }}
          className="row"
        >
          <div className="container d-flex align-content-between flex-wrap zero">
            <div className="row w-100">
              <div className="col text-center align-self-center">
                <h1 style = {{paddingTop:200,color:"red",fontSize:"5em"}}>UA-CCS Alumni Information System</h1>
              </div>
            </div>
            <div className="row w-100">
              <div className="col text-center mt-5">
                <a href="login" className="btn btn-primary btn-lg">
                  Get Started
                </a>
              </div>
            </div>
            <div className="row mt-5 text-white p-3 shadow w-100">
              The University of Antique (UA) envisions to be the leading
              university in Science and Technology by 2022. It is committed to
              provide quality, relevant, and responsive, scientific,
              technological and professional education and advanced traning in
              different areas of specialization; and shall undertake research
              and extension services in support to socio economic development of
              Antique, the Filipino nation and the global community.
              <br />
              <br />
              <br />
              To attain the university's vision, we strive to provide our
              students academic support services to attain holistic development.
              we believe that the attainment of the university's vision is a
              partnership between the university and the students.
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<MainContainer />, document.querySelector("#main"));
