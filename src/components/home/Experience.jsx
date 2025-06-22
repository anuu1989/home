import React, { useState, useEffect, Profiler } from "react";
import Cognizant from "../../editable-stuff/asset/images/cognizant.jpg";
import Wipro from "../../editable-stuff/asset/images/wipro.jpg";
import Accenture from "../../editable-stuff/asset/images/accenture.jpg"
const divStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };
const Experience = () => {
return (
    <div id="experience" className="m-0" style={{backgroundColor:'white'}}>
      <div className="container container-fluid">
        <div className="row">
            <div className="col d-lg-inline align-self-center">
            <h1 className="display-4 mb-5 text-center"><b>Experience</b></h1>
            {/* <h1 className="display-4 pb-5">Experience</h1> */}
            <div className="row" style={divStyle}>
                <div className="col text-center" >
                    <img
                        // className="border border-secondary rounded-circle"
                        src={Wipro}
                        alt="wipro technologies logo"
                        width="200"
                        height="200"
                    />
                    <br/>
                    <br/>
                    <p className="lead text-center" style={{fontSize:'22px'}}>
                         Senior Consultant (Testing/DevOps)
                        <br/>
                        Feb 2011 - Feb 2020
                    </p>
                    {/* <h3>Dell Technologies</h3> */}
                </div>
                <div className="col text-center">
                    <img
                        // className="border border-secondary rounded-circle"
                        src={Cognizant}
                        alt="Cognizant logo"
                        width="200"
                        height="200"
                    />
                    <br/>
                    <br/>
                    <p className="lead text-center" style={{fontSize:'22px'}}>
                      Senior Engineer - Cloud/DevOps/Testing
                        <br/>
                        Feb 2020 - June 2022
                    </p>
                    {/* <h3>Boeing</h3> */}
                </div>
                <div className="col text-center">
                    <img
                        // className="border border-secondary rounded-circle"
                        src={Accenture}
                        alt="Accenture logo"
                        width="200"
                        height="200"
                    />
                    <br/>
                    <br/>
                    <p className="lead text-center" style={{fontSize:'22px'}}>
                       Principal Engineer - Cloud/DevOps/APIDesign
                        <br/>
                        Feb 2020 - June 2022
                    </p>
                    {/* <h3>Boeing</h3> */}
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;