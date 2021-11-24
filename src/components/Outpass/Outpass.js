import React from "react";
import { Card } from "react-bootstrap";
import "react-image-lightbox/style.css";

import "./Outpass.css"

export const Outpass = ({ outpasses }) => {
  return (
    <React.Fragment>
      {outpasses.map((outpass) => (
        <div className="outpass-item">
          <div className="outpass-details">
          <h6 className="outpass-name">Name: {outpass.Name}</h6>
            <h6 className="outpass-reason">Reason: {outpass.Reason}</h6>
          </div>
          <div className="outpass-status">
            <button className="outpass-aprove">Approve</button>
            <button className="outpass-deny">Deny</button>
          </div>
        </div>
      ))}
    </React.Fragment>
  );
};
