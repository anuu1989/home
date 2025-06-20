import React, { useState, useEffect, Profiler } from "react";
import fitness from "../../editable-stuff/asset/img/fitness.png";
import learning from "../../editable-stuff/asset/img/learning.png";
import travelling from "../../editable-stuff/asset/img/travelling.png";
import cooking from "../../editable-stuff/asset/img/cooking.png";
import {Col, Row, Button} from "react-bootstrap";
import {
    aboutHeading,
    aboutDescription,
    showInstaProfilePic,
    instaLink,
    instaUsername,
    instaQuerry,
  } from "../../editable-stuff/configurations.json";

  const divStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  };
const Interests = () => {
  return (
    <div id="interests" className="m-0" style={{backgroundColor:'white'}}>
      <div className="container container-fluid">
        <div className="row">
            <div className="col d-lg-inline align-self-center">
            <h1 className="display-4 pb-4 text-center"><b>Interests</b></h1>
            {/* <p className="lead text-center">
              Outside of software engineering, I love to meditate, read, and play soccer!
            </p><br/> */}
            <div className="row" style={divStyle}>
             <div className="col text-center" >
                <p className="lead text-center" style={{fontSize:'28px'}}>Fitness</p>
                    <img
                        src={fitness}
                        alt="fitness"
                        width="128"
                        height="128"
                    />
                <p className="lead text-center">
                  I am very passionate about fitness and following an excercise routine. This helps me reset my senses and works as refresher.
                  To follow my passion I have also done certifications on fitness and nutrition from <a href="https://infs.co.in" target="_blank">INFS</a> to gain indepth knowlegde around these topics.
                </p>
                </div>
                <div className="col text-center">
                <p className="lead text-center" style={{fontSize:'28px'}}>Learning</p>
                     <img
                    src={learning}
                    alt="learning"
                    width="128"
                    height="128"
                    />
                <p className="lead text-center">
                 I am always keen to learn about new things in industry and current technology trends. This helps me to constantly upgrading my
                 knowledge base. I frequently visit <a href="https://www.infoq.com" target="_blank">infoq</a> for latest new and trend in technogy industry
                 and <a href="https://dev.to/" target="_blank">dev.to</a> for detailed articles.
                </p>
                </div>
                <div className="col text-center">
                <p className="lead text-center" style={{fontSize:'28px'}}>Travelling</p>
                    <img
                        src={travelling}
                        alt="travelling"
                        width="128"
                        height="128"
                    />
                <p className="lead text-center">
                  It is kind of great feeling when you travel to different places and you get to see amazing things. With this you well get to see different cultures.
                  Currenlty, I have travelled to around 5 countries and will add more once we get back to normal travel routine. For me it is the best treat.
                </p>
                </div>
                <div className="col text-center">
                <p className="lead text-center" style={{fontSize:'28px'}}>Cooking</p>
                    <img
                        src={cooking}
                        alt="cooking"
                        width="128"
                        height="128"
                    />
                <p className="lead text-center">
                   One can expand your horizons and taste the world from the comfort of your own kitchen. Food brings people together.
                   For those who enjoy entertaining guests, being someone who enjoys cooking can lead to more opportunities to entertain.
                   Cooking can be meditative.
                </p>
                </div>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Interests;
