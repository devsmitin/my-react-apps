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
      let end = new Date(end_date);
      let start_ts = Date.parse(start);
      let end_ts = Date.parse(end);

      if (start_ts <= end_ts) {
        let diffObj = handleDateDiff(end_ts, start_ts);

        const option = { year: "numeric", month: "long", day: "numeric" };
        let f_start = start.toLocaleDateString(undefined, option);
        let f_end = end.toLocaleDateString(undefined, option);

        let tweet_text = `Hey! It is ${diffObj.days}${
          diffObj.days > 1 ? " days" : " day"
        } between ${f_start} and ${f_end}!`;

        this.setState({ has_error: false, diffObj, tweet_text });
      } else {
        this.setState({ has_error: true, diffObj: "", tweet_text: "" });
      }
    } else {
      this.setState({ has_error: true, diffObj: "", tweet_text: "" });
    }
  };

  render() {
    let { diffObj, has_error, tweet_text } = this.state;

    // let tweet_url = `https://2no.co/24rHQ6`;
    let tweet_url = `https://react.devsmit.in/days-calc`;
    let tweet_user = "devsmitin";

    let href = `https://twitter.com/intent/tweet?text=${tweet_text}&url=${tweet_url}&via=${tweet_user}&hashtags=daycalculator,reactapp`;

    return (
      <main className="container">
        <h1 className="h2 fw-bold my-3">Days calculator</h1>
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
                <ul className="ps-4">
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
                <ul className="ps-4">
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
          <div className="">
            <div className="mb-2">
              <Inputs
                type="textarea"
                id="tweet_text"
                className="form-control"
                rows="3"
                value={tweet_text}
                handler={this.getData}
                disabled
              />
              {/* <div className="form-text">#Hashtags are not supported for now!</div> */}
            </div>

            <a
              href={href}
              className="btn btn-primary mx-auto mb-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter"></i>{" "}
              Tweet
            </a>
          </div>
        )}
      </main>
    );
  }
}

export default DateCalculator;
