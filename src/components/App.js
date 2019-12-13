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
      openItems: [],
      doneItems: [],
      maxLen: 20,
      dataFetched: false
    };
  }

  componentDidMount() {
    const openItemsRef = fire.database().ref("openItems");
    openItemsRef.on("value", snapshot => {
      let tasks = snapshot.val();
      let newState = [];
      for (const task in tasks) {
        newState.push(task);
      }
      this.setState({
        openItems: newState
      });
    });
  }

  fetchData = () => {
    if (!this.state.dataFetched) {
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then(response => response.json())
        .then(data =>
          data.map(data =>
            this.setState({
              openItems: [...this.state.openItems, data.title],
              dataFetched: true
            })
          )
        )
        .then(
          Helper.pushNotify(
            "Data fetched successfully!",
            "Success!",
            "owl-72.png"
          )
        );
    }
  };

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      term: "",
      openItems: [...this.state.openItems, this.state.term]
    });
    // Helper.pushNotify(
    //   this.state.term + " added to the list!",
    //   "Success!",
    //   "owl-72.png"
    // );
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
    const remainderList = this.state.openItems.filter((item, index) => {
      if (index !== id) {
        return item;
      } else {
        // Helper.pushNotify(
        //   item + " marked done successfully!",
        //   "Completed!",
        //   "owl-72.png"
        // );
        return null;
      }
    });
    const doneList = this.state.openItems.filter((item, index) => index === id);
    this.setState({
      openItems: remainderList,
      doneItems: [...this.state.doneItems, doneList]
    });
  };

  handleUndo = id => {
    const remainderList = this.state.doneItems.filter((item, index) => {
      if (index !== id) {
        return item;
      } else {
        // Helper.pushNotify(
        //   item + " added to open tasks successfully!",
        //   "Added Back!",
        //   "owl-72.png"
        // );
        return null;
      }
    });
    const doneList = this.state.doneItems.filter((item, index) => index === id);
    this.setState({
      doneItems: remainderList,
      openItems: [...this.state.openItems, doneList]
    });
  };

  handleRemove = (id, active) => {
    let itemClicked;
    active === "open"
      ? (itemClicked = this.state.openItems)
      : (itemClicked = this.state.doneItems);
    const remainder = itemClicked.filter((item, index) => {
      if (index !== id) {
        return item;
      } else {
        // Helper.pushNotify(
        //   item + " deleted successfully!",
        //   "Deleted!",
        //   "owl-72.png"
        // );
        return null;
      }
    });
    active === "open"
      ? this.setState({ openItems: remainder })
      : this.setState({ doneItems: remainder });
  };

  render() {
    return (
      <>
        <Header />
        <main className="">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md">
                <div className="card shadow-sm mb-3">
                  <div className="card-body">
                    <h4 className="card-title">Add Tasks</h4>
                    <form onSubmit={this.onSubmit}>
                      <input
                        type="text"
                        className="form-control mb-3"
                        value={this.state.term}
                        onChange={this.onChange}
                        autoFocus
                      />
                      <button
                        className="btn btn-success mr-2"
                        disabled={
                          this.state.term.length === 0 ||
                          this.state.term.length > this.state.maxLen
                        }
                      >
                        Add
                      </button>
                      {/* <button
                  type="button"
                  className="btn btn-secondary"
                  disabled={this.state.dataFetched}
                  onClick={this.fetchData}
                >
                  Fetch Notes
                </button> */}
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
                  items={this.state.openItems}
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
                  items={this.state.doneItems}
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
