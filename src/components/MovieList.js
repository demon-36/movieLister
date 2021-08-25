import React from 'react';
import styles from '../styles.module.css';

const MovieList = (props) => {

    return (
        <div className={`container ${styles.movieList}`}>
            <div className="row">
                {
                    props.movies.map((movie, i) => {
                        return (
                            <div className="col s12 m6 l3" onMouseEnter={() => props.handleHover([true, movie])}
                                onMouseLeave={() => props.handleHover([false])}>
                                <div className="card hoverable" onMouseMove={props.mouseMove}>
                                    <div className="card-image" style={{ backgroundColor: '#fff9ec' }}>
                                        <img className="responsive-img" src={movie.poster_path ? `http://image.tmdb.org/t/p/w185${movie.poster_path}` : 'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'} style={{
                                            width: "100%",
                                            height: 300
                                        }} />
                                        <span className={`center-align ${styles.movieListSpan} ${styles.movieTitle}`}>{movie.original_title}</span>
                                        <span className={`center-align ${styles.movieListSpan}`}>{props.langs[movie.original_language]} ({movie.vote_average}/10)</span>
                                        <div className="progress" style={{ height: '6px', backgroundColor: '#26a69a' }}>
                                            <div className="determinate" style={{ width: `${movie.vote_average * 10}%`, backgroundColor: '#ee6e73' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MovieList;