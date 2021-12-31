import React, { Component } from "react";
// import QRReader from "react-qr-reader";

class QrReader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delay: 300,
      result: "No result"
    };
  }

  handleScan = data => {
    if (data) {
      if (data.substring(0, 3) === "dz_") {
        this.setState({
          result: data
        });
        navigator.vibrate(50);
        this.props.getCode(data);
        this.props.closeScanner();
      } else {
        navigator.vibrate([50, 50]);
        this.setState({
          result: "Invalid QR code: " + data
        });
      }
    }
  };

  handleError = err => {
    console.error(err);
  };

  render() {
    return (
      <div className="text-center">
        {/* <QRReader
          delay={this.state.delay}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%", marginBottom: "1rem" }}
        /> */}
        <p>{this.state.result}</p>
        <button className="btn btn-danger" onClick={this.props.closeScanner}>
          Cancel
        </button>
      </div>
    );
  }
}

export default QrReader;
