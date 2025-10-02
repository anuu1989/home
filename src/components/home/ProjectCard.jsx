import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

const ProjectCard = ({ value }) => {
  const [updated_at, setUpdatedAt] = useState("0 mints");

  const handleUpdatetime = useCallback(
    (e) => {
      const date = new Date(value.pushed_at);
      const nowdate = new Date();
      const diff = nowdate.getTime() - date.getTime();
      const hours = Math.trunc(diff / 1000 / 60 / 60);

      if (hours < 24) {
        return setUpdatedAt(`${hours.toString()} hours ago`);
      } else {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();

        return setUpdatedAt(`on ${day} ${monthNames[monthIndex]} ${year}`);
      }
    },
    [value.pushed_at]
  );

  useEffect(() => {
    handleUpdatetime();
  }, [handleUpdatetime]);

  const { name, description, svn_url, stargazers_count, languages_url } = value;
  return (
    <div className="project-card-wrapper">
      <div className="project-card">
        <div className="project-card-header">
          <div className="project-icon">
            <i className="fab fa-github"></i>
          </div>
          <div className="project-stats">
            <span className="stars-count">
              <i className="fas fa-star"></i>
              {stargazers_count}
            </span>
          </div>
        </div>
        
        <div className="project-card-body">
          <h5 className="project-title">{name}</h5>
          <p className="project-description">{description}</p>
          
          <div className="project-languages">
            <Language value={languages_url} />
          </div>
          
          <div className="project-actions">
            <a
              href={`${svn_url}/archive/master.zip`}
              className="btn btn-primary btn-sm me-2"
              download
            >
              <i className="fas fa-download me-1"></i>
              Clone
            </a>
            <a
              href={svn_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary btn-sm"
            >
              <i className="fab fa-github me-1"></i>
              View Repo
            </a>
          </div>
          
          <div className="project-footer">
            <small className="update-time">
              <i className="fas fa-clock me-1"></i>
              Updated {updated_at}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

const Language = ({ value }) => {
  const [data, setData] = useState([]);

  const handleRequest = useCallback(
    (e) => {
      axios
        .get(value)
        .then((response) => {
          // handle success
          // console.log(response.data);
          return setData(response.data);
        })
        .catch((error) => {
          // handle error
          return console.error(error.message);
        })
        .finally(() => {
          // always executed
        });
    },
    [value]
  );

  useEffect(() => {
    handleRequest();
  }, [handleRequest]);

  const array = [];
  let total_count = 0;
  for (let index in data) {
    array.push(index);
    total_count += data[index];
    // console.log(index, this.state.data[index]);
  }
  // console.log("array contains ", array, this.state.data[array[0]]);

  return (
    <div className="languages-container">
      {array.length > 0 && (
        <>
          <div className="languages-label">
            <i className="fas fa-code me-1"></i>
            Languages:
          </div>
          <div className="languages-list">
            {array.map((language) => (
              <span key={language} className="language-tag">
                {language}: {Math.trunc((data[language] / total_count) * 1000) / 10}%
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectCard;
