import React, { useState, useEffect, Profiler } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Profile from "../../editable-stuff/asset/images/profile.jpg";
import communication from "../../editable-stuff/asset/img/communication.png"
import decisiveness from "../../editable-stuff/asset/img/decisiveness.png"
import leadership from "../../editable-stuff/asset/img/leadership.png"
import positivity from "../../editable-stuff/asset/img/positivity.png"
import problemsolving from "../../editable-stuff/asset/img/problem-solving.png"
import collaboration from "../../editable-stuff/asset/img/collaboration.png"

const divStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center'
};
const Skills = () => {
return (
    <div id="skills" className="m-0" style={{backgroundColor:'#f7f7f7'}}>
      <div className="container container-fluid">
        
            {/* <div className="col-5 d-none d-lg-inline align-self-center">
            </div> */}
            <div className="d-inline align-self-center">
            <h1 className="display-4 pb-5 text-center">Skills</h1>
            
            <Tabs defaultActiveKey="home" justify variant="tabs" transition={false} id="skills-tabs" style={{backgroundColor:'#f7f7f7', fontSize:'1.25rem'}}>
            <Tab eventKey="home" title="Hard Skills">
                <div className="row">
                <div className="col">
                <br/>
                  <p className="lead">Agile/Lean/Waterfall Methodologies
                  <ProgressBar now={90} style={{width:'490px', backgroundColor:'white'}}/>
                  </p>
                  <p className="lead">Node JS
                  <ProgressBar now={87} style={{width:'490px', backgroundColor:'white'}}/>
                  </p>
                  <p className="lead">Java
                  <ProgressBar now={85} style={{width:'490px', backgroundColor:'white'}}/>
                  </p>
                  <p className="lead">Bash Scripting
                  <ProgressBar now={70} style={{width:'490px', backgroundColor:'white'}}/>
                  </p>
                  <p className="lead">Testing
                  <ProgressBar now={95} style={{width:'490px', backgroundColor:'white'}}/>
                  </p>
                  <p className="lead">Automation Testing (UI/API)
                    <ProgressBar now={95} style={{width:'490px', backgroundColor:'white'}}/>
                  </p>
              </div>
              <div className="col">
              <br/>
                <p className="lead">Continous Integration/Continuos deployment
                <ProgressBar now={90} style={{width:'490px', backgroundColor:'white'}}/>
                </p>
                <p className="lead">Service Virtualization
                <ProgressBar now={85} style={{width:'490px', backgroundColor:'white'}}/>
                </p>
                <p className="lead">Platform Automation
                  <ProgressBar now={80} style={{width:'490px', backgroundColor:'white'}}/>
                  </p>
                <p className="lead">Docker
                <ProgressBar now={85} style={{width:'490px', backgroundColor:'white'}}/>
                </p>
                <p className="lead">Kubernetes
                <ProgressBar now={70} style={{width:'490px', backgroundColor:'white'}}/>
                </p>
                <p className="lead">Cloud Computing(GCP)
                  <ProgressBar now={65} style={{width:'490px', backgroundColor:'white'}}/>
                </p>
              </div>
              </div>
              </Tab>
              
              <Tab eventKey="soft" title="Soft Skills">
              <div className="col d-lg-inline align-self-center">
                <br/>
                <div className="row" style={divStyle}>
                <div className="col text-center">
                <p className="lead text-center">Collaboration</p>
                  <img
                      src={collaboration}
                      alt="collaboration"
                      width="75"
                      height="75"
                  />
                </div>
                <div className="col text-center">
                <p className="lead text-center">Problem Solving</p>
                  <img
                      src={problemsolving}
                      alt="problemsolving"
                      width="75"
                      height="75"
                  />
                </div>
                <div className="col text-center">
                <p className="lead text-center">Positivity</p>
                  <img
                      src={positivity}
                      alt="positivity"
                      width="75"
                      height="75"
                  />
                </div>
                </div>
                <br/>
                <div className="row" style={divStyle}>
                <div className="col text-center">
                <p className="lead text-center">Leadership</p>
                  <img
                      src={leadership}
                      alt="leadership"
                      width="75"
                      height="75"
                  />
                </div>
                <div className="col text-center">
                <p className="lead text-center">Decisiveness</p>
                  <img
                      src={decisiveness}
                      alt="decisiveness"
                      width="75"
                      height="75"
                  />
                </div>
                <div className="col text-center">
                <p className="lead text-center">Communication</p>
                  <img
                      src={communication}
                      alt="communication"
                      width="75"
                      height="75"
                  />
                </div>
                </div>
                </div>
              </Tab>
            </Tabs>
            </div>
          
        </div>
      </div>
  );
};

export default Skills;