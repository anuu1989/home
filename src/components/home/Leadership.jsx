import React, { useState, useEffect, Profiler } from "react";
import Carousel from 'react-bootstrap/Carousel'
import pic2 from "../../editable-stuff/asset/images/google-kelsey.jpg"
import pic3 from "../../editable-stuff/asset/images/presentation.jpg"
import pic4 from "../../editable-stuff/asset/images/Unconf.jpg"
import pic5 from "../../editable-stuff/asset/images/withAZ.jpg"



const Leadership = () => {
    return (
        <div id="leadership" className="m-0" style={{backgroundColor:'white'}}>
          <div className="container container-fluid">
            <div className="row"> 
                <div className="col d-lg-inline align-self-center">
                <h1 className="display-4 mb-3 text-center">Leadership</h1>
                {/* <p className="lead text-center" style={{fontSize:'22px'}}>
                    I empower people to acheive their goals. And I absolutely love it.
                </p><br/><br/> */}
                <br/>
                <div className="row"> 
                <div className="col d-lg-inline align-self-center">
                  <p className="lead text-center">
                      Throughout my career, I've been extremely grateful to have opportunities to lead my peers
                      and make an impact on the community. During my role in <b>Wipro</b>, I cultivated a culture of
                      inclusivity, collaboration, and ambition through leading new-member and helping them grow with mentoring
                      and different community building events. I have organized and delivered different technolgy training on
                      niche skills. Apart from work I have done lot of cultural events related to socail causes like food wastage
                      awareness.
                      Currently, I in <b>Cognizant</b> I am leading a community where I help them set there goals and guide tham on
                      how to accomplish them. Organizing different communiyt event which include tech conference and community get
                      together to share the knowledge across populace.
                 </p>  
              </div>
              
        {/*   <div className="col d-lg-inline align-self-center">
                
                <Carousel>
                 </div>
                </div>
                <div className="row"> 
                <div className="col d-none d-lg-inline align-self-center">
                <Carousel.Item>
                  <img
                    className="rounded"
                    src={pic2}
                    alt="workshop"
                    width="600"
                    height="400"
                  /> 
                   <Carousel.Caption>
                <h2>Student Engineering Council Service Director</h2>
                <h5>Promoted student involvement in the community through volunteering and philanthropy.</h5>
                </Carousel.Caption>
                  </Carousel.Item>
                 </div>
                </div>
                 <div className="row">
                <div className="col d-none d-lg-inline align-self-center">
                 <Carousel.Item>
                  <img
                    className="rounded"
                    src={Code}
                    alt="codeorange"
                    width="300"
                    height="475"
                  /> 
                  </Carousel.Item>
                 </div>
                </div>
                <Carousel.Item>
                  <img
                    className="rounded"
                    src={pic3}
                    alt="presentation"
                    width="600"
                    height="400"
                  /> 
                  </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="rounded"
                    src={pic4}
                    alt="conference"
                    width="615"
                    height="450"
                  /> 
                  </Carousel.Item>
                  <Carousel.Item>
                  <img
                    className="rounded"
                    src={pic5}
                    alt="leadership"
                    width="615"
                    height="450"
                  /> 
                  </Carousel.Item>
                </Carousel>
              </div> */}
                </div>
            </div>
          </div>
      </div>
      </div>
      );
    };

export default Leadership;