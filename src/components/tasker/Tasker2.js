import React, { Component } from "react";
import { getUserData, writeUserData } from "./fire";
// import { taskerConf } from "../../config";
import * as Helper from "../../Helper";

import NewTask from "./NewTask";
import AuthScreen from "./AuthScreen";
import ListItem2 from "./ListItem2";

class Tasker2 extends Component {
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

  onSubmit = (formTitle = "", formDetails = "") => {
    let { userLists } = this.state;
    let obj = {
      title: formTitle.trim(),
      details: formDetails.trim(),
      time: Date.now(),
      done: false,
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

  updateDone = (id) => {
    let { userLists } = this.state;
    const updatedList = userLists.openItems.map((item, index) => {
      if (index === id) {
        console.log(item);
        item.done = !item.done;
        Helper.pushNotify("Marked as closed!", "Closed!");
      }
      return item;
    });

    this.setState({
      userLists: {
        ...userLists,
        openItems: updatedList,
        last_update: Date.now(),
      },
    });
  };

  handleRemove = (id) => {
    let { userLists } = this.state;

    const updatedList = userLists.openItems.filter(
      (item, index) => id !== index
    );
    this.setState({
      userLists: {
        ...userLists,
        openItems: updatedList,
        last_update: Date.now(),
      },
    });
  };

  handleLogout = () => {
    localStorage.setItem("react_user", "");
    window.location.reload();
  };

  renderList = (list) => {
    let btnActions = {
      update: this.updateDone,
      delete: this.handleRemove,
    };

    return (
      <div className="task-list mb-4">
        {list.length ? (
          list.map((item, index) => (
            <ListItem2
              key={index}
              index={index}
              item={item}
              buttons={btnActions}
            />
          ))
        ) : (
          <div className="task-list-item theme-bg theme-radius p-3 mb-3 text-center">
            No items
          </div>
        )}
      </div>
    );
  };

  render() {
    const { showLoading, showAuth, showForm, otp, userLists } = this.state;
    let listIncomplete = [],
      listComplete = [];
    if (userLists && userLists.openItems) {
      listIncomplete = userLists.openItems.filter((item) => !item.done);
      listComplete = userLists.openItems.filter((item) => item.done);
    }

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
          <h1 className="h2 fw-bold my-3">Tasker</h1>
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-lg-6">
                  <h2 className="h5">Tasks</h2>
                  {this.renderList(listIncomplete)}
                </div>
                <div className="col-lg-6">
                  <h2 className="h5">Completed</h2>
                  {this.renderList(listComplete)}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="theme-border theme-shadow theme-radius p-3 mb-3">
                <div className="d-flex align-items-center">
                  <span className="">
                    Unique user ID: <strong>{otp}</strong>
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

export default Tasker2;
