import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import { createShop } from "../redux/actions/userActions";
import axios from "axios";

const styles = (theme) => ({
  ...theme.spread,
  button: {
    color: "blue",
    border: "2px",

    borderStyle: "solid",
    borderColor: "#1B6BEE",
  },
  search: {
    border: "2px",
    borderStyle: "solid",
    marginTop: "15px",
    marginBottom: "0",
    width: "65%",
    lineHeight: "28px",
    height: "40px",
    borderColor: "grey",
  },
});

class shopname extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      owner_details: "",
    };
  }

  checkAvailability = (event) => {
    console.log("inside checkAvailability shopname.js");
    event.preventDefault();

    var newUser = {
      id: this.state.id,
      name: this.state.name,
      owner_details: this.state.owner_details,
    };
    console.log(JSON.stringify(newUser));

    axios.defaults.withCredentials = true;
    axios
      .get(`http://localhost:7000/shops/name/${newUser.name}`, newUser.name)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 200) {
          console.log("creating new shop");
          this.props.createShop(newUser, this.props.history);
          this.props.history.push("/shop");
          alert(`Shop Name is Available`);
        }
      })
      .catch((e) => {
        console.error(e);
        console.log("User name is unavailable");
        alert(`Shop Name Already Present`);
      });
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { authenticatedUser, selectedUser } = this.props.user;
    console.log(selectedUser); //empty for now
    var token = authenticatedUser.token;
    var decoded = jwt_decode(token);
    this.state.id = 40;
    if (decoded.id) {
      this.state.id = decoded.id;
    }
    // this.state.owner_details=selectedUser
    console.log(`token decoded`, decoded.id);
    return (
      <div>
        <br />
        <center>
          <h2>Name Your Shop</h2>
        </center>
        <br />
        <center>
          <h4>Choose a memorable name that reflects your stlye</h4>
        </center>
        <center>
          <div className="input-group">
            <input
              type="search"
              className={classes.search}
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              width={50}
              onChange={this.handleChange}
              name="name"
              value={this.state.name}
            />
            <Button
              type="button"
              className={classes.button}
              onClick={this.checkAvailability}
            >
              Check Availability
            </Button>
          </div>
        </center>
        <center>
          <h5>
            Your shop name will appear in your shop and next to each of your
            listings throughout Etsy
          </h5>
        </center>
        <div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

// export default  connect(mapStateToProps, {} )(withStyles(styles)(shopname));

export default connect(mapStateToProps, { createShop })(
  withStyles(styles)(shopname)
);
