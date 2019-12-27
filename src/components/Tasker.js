import React, { Component } from "react";
import fire from "./fire";
import * as Helper from "../Helper";

import QrReader from "./QrReader";
import Form from "./Form";
import List from "./List";

class Tasker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apptitle: "Task Manager",
      showLoading: true,
      showForm: false,
      showAuth: false
    };
  }

  componentDidMount() {
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
      this.setUserImg(user);
    } else {
      if (Helper.checkDevice()) {
        this.setState({
          showLoading: false,
          showAuth: true
        });
      } else {
        this.setNewUser();
      }
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
      this.notif("Data synced with your data on server", "Data sync finished!");
      this.setState({ showLoading: false });
    }, 2000);
  };

  writeUserData = (ref, refdata) => {
    fire
      .database()
      .ref(ref)
      .set(refdata);
  };

  notif = (msg, title) => {
    // Helper.pushNotify(msg, title, "owl-72.png");
  };

  showAuthScreen = () => {
    return (
      <div className="overlay text-center">
        <button
          className="btn btn-secondary m-2"
          type="button"
          onClick={this.showScanner}
        >
          Login Using QR Code
        </button>
        <button
          className="btn btn-secondary m-2"
          type="button"
          onClick={this.setNewUser}
        >
          New User
        </button>
      </div>
    );
  };

  showScanner = () => {
    this.setState({ scanCode: !this.state.scanCode });
  };

  onScan = userCode => {
    this.setState({
      currentUser: userCode,
      showAuth: false,
      showLoading: true
    });
    localStorage.setItem("react_user", userCode);
    setTimeout(() => {
      const dataRef = fire.database().ref(userCode);
      this.getUserData(dataRef, userCode);
    }, 1000);
    this.setUserImg(userCode);
  };

  setNewUser = () => {
    let user;
    const timeNow = Date.now();
    user = "usr_" + timeNow;
    localStorage.setItem("react_user", user);
    this.setState({
      currentUser: user,
      showLoading: false,
      showAuth: false,
      [user]: {}
    });
    this.setUserImg(user);
  };

  setUserImg = user => {
    if (!Helper.checkDevice() && user !== undefined) {
      let qrProvider = "https://api.qrserver.com/v1/create-qr-code/";
      let queryString = `?data=${user}&size=256x256`;
      this.setState({
        userImg: qrProvider + queryString
      });
    }
  };

  showForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  onSubmit = (formTitle, formDetails) => {
    let obj = {
      title: formTitle.trim(),
      details: formDetails.trim(),
      time: Date.now()
    };

    let userId = this.state.currentUser;
    let oi = this.state[userId].openItems ? this.state[userId].openItems : [];

    this.setState({
      [userId]: { ...this.state[userId], openItems: [...oi, obj] }
    });
  };

  handleDone = id => {
    const remainderList = this.state[this.state.currentUser].openItems.filter(
      (item, index) => {
        if (index !== id) {
          return item;
        } else {
          this.notif(item.title + " marked done successfully!", "Completed!");
          return null;
        }
      }
    );
    const doneList = this.state[this.state.currentUser].openItems.filter(
      (item, index) => index === id
    );

    let userId = this.state.currentUser;
    let di = this.state[userId].doneItems ? this.state[userId].doneItems : [];

    this.setState({
      [userId]: {
        ...this.state[userId],
        openItems: remainderList,
        doneItems: [...di, ...doneList]
      }
    });
  };

  handleUndo = id => {
    const remainderList = this.state[this.state.currentUser].doneItems.filter(
      (item, index) => {
        if (index !== id) {
          return item;
        } else {
          this.notif(item.title + " added to successfully!", "Added Back!");
          return null;
        }
      }
    );
    const doneList = this.state[this.state.currentUser].doneItems.filter(
      (item, index) => index === id
    );

    let userId = this.state.currentUser;
    let oi = this.state[userId].openItems ? this.state[userId].openItems : [];

    this.setState({
      [userId]: {
        ...this.state[userId],
        doneItems: remainderList,
        openItems: [...oi, ...doneList]
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
        this.notif(item.title + " deleted successfully!", "Deleted!");
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
        {this.state.showAuth && this.showAuthScreen()}
        <main className="">
          <div className="container-fluid">
            <div className="row no-gutters-xs">
              <div className="col-md">
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
              <div className="col-md">
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
              {!Helper.checkDevice() && (
                <div className="col-md">
                  <div className="card text-center">
                    <div className="card-body">
                      <h6 className="font-weight-bold mb-3">
                        QR code for mobile login
                      </h6>
                      <img
                        src={this.state.userImg}
                        alt={this.state.currentUser}
                        className="border p-2 bg-white shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="fab-wrapper">
            <button
              className="btn btn-success shadow fab-btn"
              type="button"
              onClick={this.showForm}
            >
              +<span className="d-none">Add Task</span>
            </button>
          </div>

          {this.state.scanCode && (
            <div className="overlay">
              <div className="w-300 mx-auto">
                <QrReader
                  getCode={this.onScan}
                  closeScanner={this.showScanner}
                />
              </div>
            </div>
          )}

          {this.state.showForm && (
            <div className="overlay">
              <Form
                hasClass="w-600 mx-auto shadow-lg"
                submitForm={this.onSubmit}
                closeForm={this.showForm}
              />
            </div>
          )}
        </main>
      </>
    );
  }
}

export default Tasker;
