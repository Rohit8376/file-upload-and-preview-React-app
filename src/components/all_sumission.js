import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submission: [],
      byname: false,
      bycountry: false,
      pathval: "/files/",
    };
  }

  deleteval(id) {
    axios.delete("http://localhost:4000/details/" + id).then(() => {
      this.componentDidMount();
    });
  }

  dynamicSort = (val) => {
    var order = 1;
    if (val[0] === "-") {
      order = -1;
      val = val.substr(1);
    }

    return function (a, b) {
      if (order === -1) {
        return b[val].localeCompare(a[val]);
      } else {
        return a[val].localeCompare(b[val]);
      }
    };
  };

  sortbyname = (e) => {
    this.setState({ byname: !this.state.byname });
    this.componentDidMount();
  };

  sortbycounntry = (e) => {
    this.setState({ bycountry: !this.state.bycountry });
    this.componentDidMount();
  };

  downloadfile = (filen) => {
    axios
      .post("http://localhost:4000/uploadfile", { filen: filen })
      .then((res) => {
        if (res) {
          alert("downloaded");
        }
      });
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/details");

    if (this.state.byname) {
      res.data.sort(this.dynamicSort("name"));
    }

    if (this.state.bycountry) {
      res.data.sort(this.dynamicSort("dob"));
    }

    this.setState({ submission: res.data });
  }

  render() {
    return (
      <div>
        <nav className="navbar-fixed">
          <div className="nav-wrapper ">
            <a href="#!" className="brand-logo">
              <i className="material-icons">cloud</i>Pandey
            </a>
            <ul className="right hide-on-med-and-down">
              <li>
                <a href="/">
                  <i className="material-icons">search</i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="material-icons">view_module</i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="material-icons">refresh</i>
                </a>
              </li>
              <li>
                <a href="/">
                  <i className="material-icons">more_vert</i>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <h4 align="center ">List of Total Submissions</h4>
        <br />

        <div className="container row">
          <div className="col s12 m12  ">
            <label style={{ marginRight: "50px" }}>
              <input
                type="checkbox"
                defaultChecked={this.state.byname}
                onChange={(e) => this.sortbyname(e)}
              />
              <span>Filter by name</span>
            </label>
            <label>
              <input
                type="checkbox"
                defaultChecked={this.state.bycountry}
                onChange={(e) => this.sortbycounntry(e)}
              />
              <span>Filter by Date</span>
            </label>
            <br />
            <br />
            <table className="centered responsive-table striped">
              <thead>
                <tr>
                  <th>name</th>
                  <th>dob</th>
                  <th>country</th>
                  <th>resume</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.submission.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.dob}</td>
                    <td>{user.country}</td>
                    <td>{user.resume}</td>

                    <td>
                      <button
                        className=""
                        onClick={(e) => this.deleteval(user.id)}
                      >
                        <i className="material-icons ">delete</i>delete
                      </button>
                      <span>&nbsp;&nbsp;</span>

                      <button className=" " style={{ textAlign: "center" }}>
                        <i className="material-icons ">file_download</i>
                        <Link
                          to={`${this.state.pathval}${user.resume}`}
                          target="_blank"
                          download
                        >
                          download
                        </Link>
                        <span>&nbsp;&nbsp;</span>
                        <a
                          href={`${this.state.pathval}${user.resume}`}
                          target="_blank"
                        >
                          preview
                        </a>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
