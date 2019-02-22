class ManageHomeContainer extends React.Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div style={{ heigth: "300px" }} className="container-fluid h-50">
          <div className="row w-100 h-100">
            <div
              id="carouselExampleControls"
              className="carousel slide w-100"
              data-ride="carousel"
            >
              <div className="carousel-inner h-100 w-100">
                <div className="carousel-item h-100 w-100 active">
                  <div
                    className="d-block h-100 w-100"
                    style={{
                      backgroundImage: `url(${upload_dir + "ua.jpg"})`,
                      heigth: "200px"
                    }}
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item h-100 w-100">
                  <div
                    className="d-block h-100 w-100"
                    style={{
                      backgroundImage: `url(${upload_dir + "uaa.jpg"})`,
                      heigth: "200px"
                    }}
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item h-100 w-100">
                  <div
                    className="d-block h-100 w-100"
                    style={{
                      backgroundImage: `url(${upload_dir + "uu.jpg"})`,
                      heigth: "200px"
                    }}
                    alt="Third slide"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h1>
                University of Antique College of Computer Studies Alumni
                Information System
              </h1>
            </div>
          </div>
          <div className="row">
            <div className="col-3" />
            <div className="col">
              <div className="row">
                <h3>The University Seal</h3>
              </div>
              <div className="row">
                <div className="col-12">
                  The University seal has the following symbolism as approved by
                  the Board of Representatives by virtue of BOR Resolution No.
                  96, Series of 2010
                </div>

                <div className="col-12 pt-2">
                  <h5>Birds in Flight</h5>
                </div>

                <div className="col-12">
                  The four flying birds symbolize the four core values of the
                  university which are excellence, commitment, integrity, social
                  responsibility as well as its four thrusts which are
                  instruction, research, extension, and resource generation.
                </div>

                <div className="col-12 pt-2">
                  <h5>The Flora</h5>
                </div>

                <div className="col-12">
                  The plant signifies agriculture which ic the major livelihood
                  of the province.
                </div>

                <div className="col-12 pt-2">
                  <h5>Water</h5>
                </div>

                <div className="col-12">
                  The water represents the body of water in the shores of
                  Antique and signifies aquaculture as another major livelihodd
                  of Antiqueños.
                </div>
                <div className="col-12 pt-2">
                  <h5>Light</h5>
                </div>

                <div className="col-12">
                  The light represents studies, research, truth and education.
                </div>

                <div className="col-12 pt-2">
                  <h5>Triangle</h5>
                </div>

                <div className="col">
                  The triangle represents the stability of the University amidst
                  the challenges of change and time.
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
