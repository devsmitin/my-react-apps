import React, { Component } from "react";

import { handleDateDiff } from "../../Helper";
import Inputs from "../Inputs";

class DateCalculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: "",
      end_date: "",
      diffObj: "",
      has_error: "",
    };
    this.inputs = [
      { handle: "start_date", label: "Start Date" },
      { handle: "end_date", label: "End Date" },
    ];
  }

  getData = (key, value) => {
    this.setState({ [key]: value });
  };

  setToday = (which) => {
    const formatNumber = (n) => ("0" + n).slice(-2);
    let d = new Date();
    let dd = formatNumber(d.getDate());
    let mm = formatNumber(d.getMonth() + 1);
    let yyyy = d.getFullYear();

    this.setState({
      [which]: `${yyyy}-${mm}-${dd}`,
    });
  };

  findDiff = () => {
    const { start_date, end_date } = this.state;
    if (start_date !== "" && end_date !== "") {
      let start = new Date(start_date);
      start = Date.parse(start);
      let end = new Date(end_date);
      end = Date.parse(end);

      if (start < end) {
        let diffObj = handleDateDiff(end, start);
        this.setState({ has_error: false, diffObj });
      } else {
        this.setState({ has_error: true, diffObj: "" });
      }
    } else {
      this.setState({ has_error: true, diffObj: "" });
    }
  };

  render() {
    let { diffObj, has_error, start_date, end_date } = this.state;

    const option = { year: "numeric", month: "long", day: "numeric" };

    let start = new Date(start_date);
    start = start.toLocaleDateString(undefined, option);
    let end = new Date(end_date);
    end = end.toLocaleDateString(undefined, option);

    let tweet_text = `Hey! It is ${diffObj.days}${
      diffObj.days > 1 ? " days" : " day"
    } between ${start} and ${end}!`;
    let tweet_url = `https://2no.co/24rHQ6`;
    let tweet_user = "devsmitin";

    let href = `https://twitter.com/intent/tweet?text=${tweet_text}`;
    href += `&url=${tweet_url}&via=${tweet_user}&hashtags=reactapp`;

    return (
      <main className="container">
        <h1 className="h3 font-weight-bold my-3">Days calculator</h1>
        <div className="card card-body mb-3">
          <div className="row">
            {this.inputs.map((input) => (
              <div className="col-md-6" key={input.handle}>
                <div className="card card-body bg-light mb-3">
                  <div>
                    <Inputs
                      type="date"
                      id={input.handle}
                      className="form-control mb-2"
                      label={input.label}
                      handler={this.getData}
                      value={this.state[input.handle]}
                    />
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => this.setToday(input.handle)}
                    >
                      Today
                    </button>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-md-12">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={this.findDiff}
              >
                Get Difference
              </button>
            </div>
          </div>
        </div>

        {diffObj && (
          <div className="alert alert-success">
            <div className="row">
              <div className="col-lg-7">
                <h5 className="mb-3">
                  Result:{" "}
                  {`${diffObj.days} ${diffObj.days > 1 ? " days" : " day"}`}
                </h5>
                <ul className="pl-4">
                  <li>
                    It is{" "}
                    {`${diffObj.days} ${diffObj.days > 1 ? " days" : " day"}`}{" "}
                    from the start date to the end date, but not including the
                    end date.
                  </li>
                  <li>Or {diffObj.diff} excluding the end date.</li>
                </ul>
              </div>
              <div className="col-lg-5">
                <h5 className="mb-3">
                  Alternatively:{" "}
                  {`${diffObj.days} ${diffObj.days > 1 ? " days" : " day"}`} are
                </h5>
                <ul className="pl-4">
                  <li>{`${diffObj.seconds} ${
                    diffObj.seconds > 1 ? " seconds" : " second"
                  }`}</li>
                  <li>{`${diffObj.minutes} ${
                    diffObj.minutes > 1 ? " minutes" : " minute"
                  }`}</li>
                  <li>{`${diffObj.hours} ${
                    diffObj.hours > 1 ? " hours" : " hour"
                  }`}</li>
                  <li>{`${diffObj.days} ${
                    diffObj.days > 1 ? " days" : " day"
                  }`}</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {has_error === true && (
          <div className="alert alert-danger">
            <p className="mb-0">
              Enter valid date. Start date can not be after end date.
            </p>
          </div>
        )}

        {diffObj && (
          <a
            className="twitter-share-button btn btn-primary"
            target="_blank"
            href={href}
          >
            <i className="bi bi-twitter"></i>
            Tweet
          </a>
        )}
      </main>
    );
  }
}

export default DateCalculator;
