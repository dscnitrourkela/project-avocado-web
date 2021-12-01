import React, { Component } from 'react';

class Footer extends Component {
  render () {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="d-sm-flex justify-content-center justify-content-sm-between">
            <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">Hand-crafted & made with <i className="mdi mdi-heart text-danger"></i> using <a href="https://www.bootstrapdash.com/" target="_blank" rel="noopener noreferrer">BootstrapDash </a>by <a href="https://github.com/developer-student-clubs-nitr/" target="_blank" rel="noopener noreferrer">DSC NIT Rourkela</a></span>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;