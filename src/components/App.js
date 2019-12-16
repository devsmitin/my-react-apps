import React, { Component } from "react";
import fire from "./fire";
import * as Helper from "../Helper";

import Header from "./Header";
import List from "./List";

import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      details: "",
      maxLen: 240,
      showLoading: true
    };
  }

  componentDidMount() {
    const timeNow = Date.now();
    let user;
    if (localStorage.getItem("react_user")) {
      user = localStorage.getItem("react_user");
      this.setState({
        currentUser: user
      });
      setTimeout(() => {
        const dataRef = fire.database().ref(user);
        this.getUserData(dataRef, user);
      }, 1000);
    } else {
      user = "usr_" + timeNow;
      localStorage.setItem("react_user", user);
      this.setState({
        currentUser: user,
        showLoading: false,
        [user]: {}
      });
    }
  }

  componentDidUpdate = prevState => {
    let userId = this.state.currentUser;
    let userData = this.state[userId];
    let userDataOld = prevState[userId];
    if (userData !== userDataOld) {
      this.writeUserData(userId, userData);
    }
  };

  writeUserData = (ref, refdata) => {
    fire
      .database()
      .ref(ref)
      .set(refdata);
  };

  getUserData = (ref, refData) => {
    ref.on("value", snapshot => {
      let items = snapshot.val();

      items
        ? this.setState({
            [refData]: items
          })
        : this.setState({
            [refData]: {}
          });
    });
    setTimeout(() => {
      // this.notif("Data synced with your data on server", "Data sync finished!");
      this.setState({ showLoading: false });
    }, 2000);
  };

  notif = (msg, title) => {
    Helper.pushNotify(msg, title, "owl-72.png");
    alert(msg);
  };

  onChange = event => {
    // this.setState({ details: event.target.value });
    console.log(event.target.name, event.target.value);

    const value = event.target.value;
    this.setState({
      [event.target.name]: value
    });
  };

  onSubmit = event => {
    event.preventDefault();
    let obj = {
      title: this.state.title.trim(),
      details: this.state.details.trim(),
      time: Date.now()
    };

    let userId = this.state.currentUser;
    let opn = this.state[userId].openItems ? this.state[userId].openItems : [];

    this.setState({
      title: "",
      details: "",
      [userId]: { ...this.state[userId], openItems: [...opn, obj] }
    });
  };

  overflowAlert = () => {
    if (this.getRemainingChars() < 0) {
      return (
        <div className="alert alert-danger text-left mt-3 mb-0">
          Description Too Long.
        </div>
      );
    }
    return "";
  };

  getRemainingChars = () => {
    let chars = this.state.maxLen - this.state.details.length;
    return chars;
  };

  handleDone = id => {
    const remainderList = this.state[this.state.currentUser].openItems.filter(
      (item, index) => {
        if (index !== id) {
          return item;
        } else {
          // this.notif(
          //   item + " marked done successfully!",
          //   "Completed!",
          // );
          return null;
        }
      }
    );
    const doneList = this.state[this.state.currentUser].openItems.filter(
      (item, index) => index === id
    );

    let userId = this.state.currentUser;
    let dn = this.state[userId].doneItems ? this.state[userId].doneItems : [];

    this.setState({
      [userId]: {
        ...this.state[userId],
        openItems: remainderList,
        doneItems: [...dn, ...doneList]
      }
    });
  };

  handleUndo = id => {
    const remainderList = this.state[this.state.currentUser].doneItems.filter(
      (item, index) => {
        if (index !== id) {
          return item;
        } else {
          // this.notif(
          //   item + " added to open tasks successfully!",
          //   "Added Back!",
          // );
          return null;
        }
      }
    );
    const doneList = this.state[this.state.currentUser].doneItems.filter(
      (item, index) => index === id
    );

    let userId = this.state.currentUser;
    let op = this.state[userId].openItems ? this.state[userId].openItems : [];

    this.setState({
      [userId]: {
        ...this.state[userId],
        doneItems: remainderList,
        openItems: [...op, ...doneList]
      }
    });
  };

  handleRemove = (id, currentList) => {
    let itemClicked;
    currentList === "open"
      ? (itemClicked = this.state[this.state.currentUser].openItems)
      : (itemClicked = this.state[this.state.currentUser].doneItems);

    let userId = this.state.currentUser;

    const remainder = itemClicked.filter((item, index) => {
      if (index !== id) {
        return item;
      } else {
        // this.notif(
        //   item + " deleted successfully!",
        //   "Deleted!",
        // );
        return null;
      }
    });
    currentList === "open"
      ? this.setState({
          [userId]: { ...this.state[userId], openItems: remainder }
        })
      : this.setState({
          [userId]: { ...this.state[userId], doneItems: remainder }
        });
  };

  render() {
    return (
      <>
        {this.state.showLoading && Helper.showLoader()}
        <Header userId={this.state.identity} />
        <main className="">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12 col-xl-4">
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h4 className="card-title">Add Tasks</h4>
                    <form onSubmit={this.onSubmit}>
                      <input
                        name="title"
                        type="text"
                        className={
                          "form-control mb-3" +
                          (this.state.title.length === 50 ? " is-invalid" : "")
                        }
                        value={this.state.title}
                        onChange={this.onChange}
                        maxLength="50"
                      />
                      <textarea
                        name="details"
                        className={
                          "form-control mb-3" +
                          (this.state.details.length >= this.state.maxLen
                            ? " is-invalid"
                            : "")
                        }
                        value={this.state.details}
                        onChange={this.onChange}
                        rows="4"
                      />
                      <button
                        className="btn btn-success mr-2"
                        disabled={
                          this.state.details.trim().length === 0 ||
                          this.state.details.length > this.state.maxLen
                        }
                      >
                        Add
                      </button>
                      <span className="btn float-right disabled">
                        {this.state.maxLen - this.state.details.length}
                      </span>
                    </form>
                    {this.overflowAlert()}
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-xl-4">
                <List
                  title={"Open Tasks"}
                  items={
                    this.state[this.state.currentUser] &&
                    this.state[this.state.currentUser].openItems
                  }
                  btn1={this.handleDone}
                  btn1Title={"Done"}
                  btn1Class={"success"}
                  btn2={e => this.handleRemove(e, "open")}
                  btn2Title={"Delete"}
                  btn2Class={"danger"}
                />
              </div>
              <div className="col-md-6 col-xl-4">
                <List
                  title={"Completed Tasks"}
                  items={
                    this.state[this.state.currentUser] &&
                    this.state[this.state.currentUser].doneItems
                  }
                  btn1={this.handleUndo}
                  btn1Title={"Undo"}
                  btn1Class={"warning"}
                  btn2={e => this.handleRemove(e, "done")}
                  btn2Title={"Delete"}
                  btn2Class={"danger"}
                />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default App;
