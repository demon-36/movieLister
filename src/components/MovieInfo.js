import React from 'react';
import styles from '../styles.module.css';

const MovieInfo = (props) => {

    if (!props || !props.currentMovie || !props.position) return null;

    let x = props.position.x;
    let y = window.pageYOffset + props.position.y;
    
    return (
        <div className={`container ${styles.movieInfo}`} style={{ left: `${x}px`, top: `${y}px` }}>
            <div className="row">
                <div className="col s12 m4">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">{props.currentMovie.title}</span>
                            <p>{props.currentMovie.release_date.substring(6).split("-").concat(props.currentMovie.release_date.substring(0, 4)).join("/")}</p>
                            <p>{props.currentMovie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieInfo;