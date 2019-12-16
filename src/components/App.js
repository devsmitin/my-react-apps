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
      term: "",
      maxLen: 20,
      fb_loading: true
    };
  }

  componentDidMount() {
    const timeNow = Date.now();
    let user;
    if (localStorage.getItem("react_user")) {
      user = localStorage.getItem("react_user");
    } else {
      user = "usr_" + timeNow;
      localStorage.setItem("react_user", user);
    }

    this.setState({
      currentUser: user,
      [user]: { lastUpdate: timeNow, openItems: [], doneItems: [] }
    });

    setTimeout(() => {
      const dataRef = fire.database().ref(user);
      this.getUserData(dataRef, user);
      this.setState({ fb_loading: false });
    }, 1000);
  }

  componentDidUpdate = (prevProps, prevState) => {
    let userId = this.state.currentUser;
    let userData = this.state[userId];
    let userDataOld = prevState[userId];
    if (userData !== userDataOld) {
      this.writeUserData(userId, userData);
    }
  };

  notif = (msg, title) => {
    Helper.pushNotify(msg, title, "owl-72.png");
    alert(msg);
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
      console.log(items);
      
      // let newState = [];
      // for (const item in items) {
      //   if (items.hasOwnProperty(item)) {
      //     const element = items[item];
      //     newState.push(element);
      //   }
      // }
      // this.setState({
      //   [refData]: {...newState}
      // });
    });
    this.notif("Data sync finished", "Success!");
  };

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    let obj = {
      title: this.state.term.trim(),
      completed: false,
      time: Date.now()
    };

    let userId = this.state.currentUser;
    let opn = this.state[userId].openItems;

    this.setState({
      term: "",
      [userId]: { ...this.state[userId], openItems: [...opn, obj] }
    });
  };

  overflowAlert = () => {
    if (this.getRemainingChars() < 0) {
      return (
        <div className="alert alert-warning text-left mt-3 mb-0">
          Warning: Text Too Long
        </div>
      );
    }
    return "";
  };

  getRemainingChars = () => {
    let chars = this.state.maxLen - this.state.term.length;
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

    this.setState({
      [userId]: {
        ...this.state[userId],
        openItems: remainderList,
        doneItems: [
          ...this.state[this.state.currentUser].doneItems,
          ...doneList
        ]
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

    this.setState({
      [userId]: {
        ...this.state[userId],
        doneItems: remainderList,
        openItems: [
          ...this.state[this.state.currentUser].openItems,
          ...doneList
        ]
      }
    });
  };

  handleRemove = (id, active) => {
    let itemClicked;
    active === "open"
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
    active === "open"
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
        {this.state.fb_loading && Helper.showLoader()}
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
                        type="text"
                        className="form-control mb-3"
                        value={this.state.term}
                        onChange={this.onChange}
                      />
                      <button
                        className="btn btn-success mr-2"
                        disabled={
                          this.state.term.trim().length === 0 ||
                          this.state.term.trim().length > this.state.maxLen
                        }
                      >
                        Add
                      </button>
                      <span className="btn float-right disabled">
                        {this.state.maxLen - this.state.term.length}
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
