import React, { Component } from "react";
import fb_db from "./fire";
import * as Helper from "../../Helper";

import QrReader from "./QrReader";
import Form from "./Form";
import List from "./List";
import AuthScreen from "./AuthScreen";
import { qrProvider } from "../../config";

class Tasker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoading: true,
      showForm: false,
      showAuth: false,
    };
  }

  componentDidMount() {
    let user = localStorage.getItem("react_user");
    if (user) {
      this.setState(
        {
          currentUser: user,
          otp: user.replace("dz_", ""),
        },
        () => {
          const dataRef = fb_db.database().ref(user);
          this.getUserData(dataRef, user);
        }
      );
    } else {
      this.setState({
        showLoading: false,
        showAuth: true,
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    let { userLists, currentUser } = this.state;
    let userDataOld = prevState.userLists;
    if (JSON.stringify(userLists) !== JSON.stringify(userDataOld)) {
      this.writeUserData(currentUser, userLists);
    }
  };

  getUserData = (ref, userId) => {
    ref.on("value", (snapshot) => {
      let items = snapshot.val();
      if (items) {
        this.setState(
          {
            currentUser: userId,
            userLists: items,
            otp: userId.replace("dz_", ""),
          },
          () => {
            localStorage.setItem("react_user", userId);
            // this.notif(
            //   "Data synced with your data on server",
            //   "Data sync finished!"
            // );
            this.setUserImg(userId);
          }
        );
      } else {
        this.notif("User not found!", "Error!");
        setTimeout(() => {
          this.setState({ showLoading: false, showAuth: true });
        }, 2 * 1000);
      }
    });
  };

  writeUserData = (ref, refdata) => {
    fb_db
      .database()
      .ref(ref)
      .set(refdata);
  };

  notif = (msg, title) => {
    Helper.pushNotify(msg, title, "owl-72.png");
  };

  toggleScanner = () => {
    this.setState({ scanCode: !this.state.scanCode });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  onScan = (userId) => {
    this.setState(
      {
        showAuth: false,
        showLoading: true,
      },
      () => {
        // setTimeout(() => {
        const dataRef = fb_db.database().ref(userId);
        this.getUserData(dataRef, userId);
        // }, 1000);
        this.setUserImg(userId);
      }
    );
  };

  setNewUser = () => {
    const timeNow = Date.now();
    let d_obj = new Date(timeNow);
    let last_four =
      d_obj.getMilliseconds() +
      d_obj.getSeconds() +
      parseInt(Math.random() * 7999) +
      1000;

    let first_two = parseInt(Math.random() * 39) + 10;
    let uid = Helper.aRandomLetter() + first_two + "-" + last_four;
    let user = "dz_" + uid;

    localStorage.setItem("react_user", user);
    this.setState(
      {
        currentUser: user,
        showLoading: false,
        showAuth: false,
        otp: uid,
        userLists: { last_update: Date.now() },
      },
      () => {
        this.setUserImg(user);
      }
    );
  };

  setUserImg = (user) => {
    if (user !== undefined) {
      let queryString = `?data=${user}&size=256x256`;
      this.setState({
        userImg: qrProvider.EndPoint + queryString,
        showLoading: false,
      });
    }
  };

  onSubmit = (formTitle, formDetails) => {
    let { userLists } = this.state;
    let obj = {
      title: formTitle.trim(),
      details: formDetails.trim(),
      time: Date.now(),
    };

    let oi = userLists.openItems ? userLists.openItems : [];

    this.setState({
      userLists: {
        ...userLists,
        openItems: [...oi, obj],
        last_update: Date.now(),
      },
    });
  };

  handleDone = (id) => {
    let { userLists } = this.state;
    const remainderList = userLists.openItems.filter((item, index) => {
      if (index !== id) {
        return item;
      } else {
        this.notif(item.title + " marked as closed!", "Closed!");
        return null;
      }
    });
    const doneList = userLists.openItems.filter((item, index) => index === id);
    let di = userLists.doneItems ? userLists.doneItems : [];
    this.setState({
      userLists: {
        ...userLists,
        openItems: remainderList,
        doneItems: [...di, ...doneList],
        last_update: Date.now(),
      },
    });
  };

  handleUndo = (id) => {
    let { userLists } = this.state;
    const remainderList = userLists.doneItems.filter((item, index) => {
      if (index !== id) {
        return item;
      } else {
        this.notif(item.title + " marked as open!", "Reopened!");
        return null;
      }
    });
    const doneList = userLists.doneItems.filter((item, index) => index === id);
    let oi = userLists.openItems ? userLists.openItems : [];
    this.setState({
      userLists: {
        ...userLists,
        doneItems: remainderList,
        openItems: [...oi, ...doneList],
        last_update: Date.now(),
      },
    });
  };

  handleRemove = (id, currentList) => {
    let itemClicked;
    let { userLists } = this.state;

    currentList === "open"
      ? (itemClicked = userLists.openItems)
      : (itemClicked = userLists.doneItems);

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
          userLists: {
            ...userLists,
            openItems: remainder,
            last_update: Date.now(),
          },
        })
      : this.setState({
          userLists: {
            ...userLists,
            doneItems: remainder,
            last_update: Date.now(),
          },
        });
  };

  handleLogout = () => {
    localStorage.setItem("react_user", "");
    window.location.reload();
  };

  render() {
    const {
      currentUser,
      showLoading,
      showAuth,
      showForm,
      scanCode,
      userImg,
      otp,
      userLists,
    } = this.state;

    let openItems = {
      title: "Open Items",
      items: userLists && userLists.openItems,
      btn1Title: "Mark closed",
      btn1: this.handleDone,
      btn2Title: "Delete",
      btn2: (e) => this.handleRemove(e, "open"),
    };

    let doneItems = {
      title: "Closed Items",
      items: userLists && userLists.doneItems,
      btn1Title: "Reopen",
      btn1: this.handleUndo,
      btn2Title: "Delete",
      btn2: (e) => this.handleRemove(e, "done"),
    };

    return (
      <>
        {showLoading && Helper.showLoader()}
        {showAuth && (
          <AuthScreen
            showScanner={this.toggleScanner}
            setNewUser={this.setNewUser}
            login={this.onScan}
          />
        )}
        <main className="container">
          <h1 className="h3 font-weight-bold my-3">Tasker</h1>
          <div className="row">
            <div className="col-lg-8">
              <div className="">
                <List {...openItems} />
              </div>
              <div className="">
                <List {...doneItems} />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card card-body text-center">
                <p className="">
                  User ID: <strong>{otp}</strong>
                </p>
                {!Helper.checkDevice() && (
                  <>
                    <h6 className="font-weight-bold mb-3">
                      QR code for mobile login
                    </h6>
                    <img
                      src={userImg}
                      alt={currentUser}
                      className="img-fluid border p-2 mb-3 bg-white shadow-sm"
                    />
                  </>
                )}
                <div>
                  <button
                    className="btn btn-danger"
                    onClick={this.handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="fab-wrapper">
            <button
              className="btn btn-success shadow fab-btn"
              type="button"
              onClick={this.toggleForm}
            >
              +<span className="d-none">Add Task</span>
            </button>
          </div>

          {scanCode && (
            <div className="overlay">
              <div className="w-300 mx-auto">
                <QrReader
                  getCode={this.onScan}
                  closeScanner={this.toggleScanner}
                />
              </div>
            </div>
          )}

          {showForm && (
            <div className="overlay">
              <Form
                hasClass="w-600 mx-auto shadow-lg"
                submitForm={this.onSubmit}
                closeForm={this.toggleForm}
              />
            </div>
          )}
        </main>
      </>
    );
  }
}

export default Tasker;
