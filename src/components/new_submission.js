import axios from "axios";
import React, { Component } from "react";
import { Select, Input, DatePicker } from "antd";
import "antd/dist/antd.css";

const { Option } = Select;

export default class loginintern extends Component {
  state = {
    options: [],
    name: "",
    dob: "",
    country: "",
    resume: "",
    selectedfile: null,
    isSubmit: true,
  };

  loginSubmit = (e) => {
    //  e.preventDefault()
    if (this.state.resume !== "") {
      axios.post("http://localhost:4000/details", {
        name: this.state.name,
        dob: this.state.dob,
        country: this.state.country,
        resume: this.state.resume,
      });
      // used to upload the file
      let file = this.state.selectedfile;
      let formdata = new FormData();
      formdata.append("file", file, file.name);
      axios.post("http://localhost:4000/upload", formdata);

      this.setState({ isSubmit: false });

      this.componentDidMount();
    }
  };

  async componentDidMount() {
    const res = await axios.get("https://restcountries.eu/rest/v2/all");
    res.data.map((country) =>
      this.state.options.push({ value: country.name, label: country.name })
    );

    this.setState({ name: "", dob: "", country: "", resume: "" });
  }

  render() {
    return (
      <>
        <nav className="navbar-fixed">
          <div className="nav-wrapper ">
            <a href="#!" className="brand-logo">
              <i className="material-icons">cloud</i>pandey
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="sass.html">
                  <i className="material-icons">search</i>
                </a>
              </li>
              <li>
                <a href="badges.html">
                  <i className="material-icons">view_module</i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="material-icons">refresh</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <h5 style={{ marginTop: "50px", marginLeft: "300px", color: "red" }}>
            Please Submit your response{" "}
          </h5>
          <div className="row">
            <div className="col s6 offset-s3" style={{ marginTop: "50px" }}>
              <div className="form">
                <form onSubmit={(e) => this.loginSubmit(e)}>
                  <div className="input-field col s10">
                    <i className="material-icons prefix">account_circle</i>
                    <Input
                      onChange={(e) => this.setState({ name: e.target.value })}
                      style={{ width: "85%", marginLeft: "45px" }}
                      required
                    />
                    <label htmlFor="autocomplete-input"> Full name </label>
                  </div>
                  <div className="input-field col s10">
                    <i className="material-icons prefix">child_care</i>

                    <Select
                      showSearch
                      style={{
                        width: "85%",
                        marginLeft: "45px",
                        marginTop: "10px",
                      }}
                      placeholder="Select Country"
                      onChange={(e) => this.setState({ country: e })}
                      required
                    >
                      {this.state.options.map(({ value, label }, index) => (
                        <Option key={index} value={value}>
                          {label}
                        </Option>
                      ))}
                    </Select>
                  </div>
                  <div className="col s10">
                    <i
                      className="material-icons prefix"
                      style={{ marginTop: "15px" }}
                    >
                      perm_contact_calendar
                    </i>
                    <DatePicker
                      onChange={(date, dateString) =>
                        this.setState({ dob: dateString })
                      }
                      style={{
                        width: "85%",
                        marginLeft: "21px",
                        marginTop: "25px",
                      }}
                      required
                      placeholder="Date of Birth"
                    />
                  </div>
                  <br />
                  <br />
                  <div
                    className="input-field col s10"
                    style={{ marginBottom: "50px" }}
                  >
                    <i className="material-icons  prefix">attach_file</i>
                    <Input
                      type="file"
                      onChange={(e) =>
                        this.setState({
                          resume: e.target.files[0].name,
                          selectedfile: e.target.files[0],
                        })
                      }
                      style={{
                        width: "85%",
                        marginLeft: "45px",
                        marginTop: "15px",
                      }}
                      required
                    />
                  </div>
                  <br /> <br /> <br />
                  <input
                    className="btn btn-primary"
                    type="submit"
                    value="Submit"
                    style={{ width: "75%", marginLeft: "21px" }}
                    //  style={{ width: "350px", marginLeft: "70px" }}
                  />
                  <br />
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
