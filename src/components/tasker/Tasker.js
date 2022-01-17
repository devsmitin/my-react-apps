import React, { Component } from "react";
import { getUserData, writeUserData } from "./fire";
import * as Helper from "../../Helper";

import NewTask from "./NewTask";
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
          this.userData(user);
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
      writeUserData(currentUser, userLists);
    }
  };

  userData = async (userId) => {
    // callback for getUserData
    const cb = (items) => {
      if (items) {
        this.setState(
          {
            currentUser: userId,
            userLists: items,
            otp: userId.replace("dz_", ""),
            showLoading: false,
          },
          () => {
            localStorage.setItem("react_user", userId);
          }
        );
      } else {
        Helper.pushNotify("User not found!", "Error!");
        setTimeout(() => {
          this.setState({ showLoading: false, showAuth: true });
        }, 2 * 1000);
      }
    };

    getUserData(userId, cb);
  };

  toggleScanner = () => {
    this.setState({ scanCode: !this.state.scanCode });
  };

  toggleForm = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  onEntry = (userId) => {
    this.setState(
      {
        showAuth: false,
        showLoading: true,
      },
      () => {
        this.userData(userId);
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
    this.setState({
      currentUser: user,
      showLoading: false,
      showAuth: false,
      otp: uid,
      userLists: { last_update: Date.now() },
    });
  };

  setUserImg = (user) => {
    if (user !== undefined) {
      let queryString = `?data=${user}&size=256x256`;
      this.setState({
        userImg: qrProvider.endPoint + queryString,
        showLoading: false,
      });
    }
  };

  onSubmit = (formTitle = "", formDetails = "") => {
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
        Helper.pushNotify("Marked as closed!", "Closed!");
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
        Helper.pushNotify("Marked as open!", "Reopened!");
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
        Helper.pushNotify("Deleted successfully!", "Deleted!");
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

  renderList = (all_items) => {
    let html = [];
    for (const item in all_items) {
      if (Object.hasOwnProperty.call(all_items, item)) {
        const itmObj = all_items[item];
        html.push(<List key={itmObj.title} {...itmObj} />);
      }
    }
    return html;
  };

  render() {
    const { showLoading, showAuth, showForm, otp, userLists } = this.state;

    let all_items = {
      openItems: {
        title: "Open Items",
        items: userLists && userLists.openItems,
        buttons: [
          {
            title: "Mark closed",
            type: "primary",
            action: this.handleDone,
          },
          {
            title: "Delete",
            type: "outline-secondary",
            action: (e) => this.handleRemove(e, "open"),
          },
        ],
      },

      doneItems: {
        title: "Closed Items",
        items: userLists && userLists.doneItems,
        buttons: [
          {
            title: "Reopen",
            type: "primary",
            action: this.handleUndo,
          },
          {
            title: "Delete",
            type: "outline-secondary",
            action: (e) => this.handleRemove(e, "done"),
          },
        ],
      },
    };

    return (
      <>
        {showLoading && Helper.showLoader()}
        {showAuth && (
          <AuthScreen
            showScanner={this.toggleScanner}
            setNewUser={this.setNewUser}
            login={this.onEntry}
          />
        )}
        <main className="container">
          <h1 className="h3 font-weight-bold my-3">Tasker</h1>
          <div className="row g-0">
            <div className="col-lg-9">{this.renderList(all_items)}</div>
            <div className="col-lg-3">
              <div className="card card-body border-primary mb-3">
                <div className="d-flex align-items-center">
                  <span className="">
                    Unique ID: <strong>{otp}</strong>
                  </span>
                  <button
                    className="btn btn-sm btn-danger rounded-pill ms-auto"
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

          {showForm && (
            <NewTask
              hasClass="w-600 mx-auto shadow-lg"
              submitForm={this.onSubmit}
              closeForm={this.toggleForm}
            />
          )}
        </main>
      </>
    );
  }
}

export default Tasker;
