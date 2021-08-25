import React from 'react';
import styles from '../styles.module.css';

const Search = (props) => {

    var langsArr = props && props.allLangs ? props.allLangs : [];

    var dropdownOptionsArr = [];
    
    for (let i = 0; i < langsArr.length; i++) {
        if (!langsArr[i]) break;
        let s = langsArr[i].english_name;
        dropdownOptionsArr.push(<option key={i + 1} value={langsArr[i].iso_639_1}>{s}</option>);
    }

    return (
        <div className="container">
            <div className="row" style={{ paddingTop: '3%' }}>
                <form className="col s12" onSubmit={props.handleSubmit} action="">
                    <div className="row" style={{ marginLeft: '5%' }}>
                        <div className="input-field col s7">
                            <label className="active" style={{ color: '#26a69a' }}>Title</label>
                            <input className="validate" type="text" placeholder="Search Movie" style={{ borderBottomColor: '#26a69a', color: 'white'}} onChange={props.handleMovieChange} />
                        </div>
                        <div className="input-field col s3">
                            <label className="active" style={{ color: '#26a69a' }}>Language</label>
                            <select className={`select-dropdown dropdown-trigger ${styles.searchDropdown}`} onChange={props.handleLangChange} style={{outline: 'none'}}>
                                <option select value="">Select Language</option>
                                {dropdownOptionsArr}
                            </select>
                        </div>
                        <div className="input-field col s1" style={{ padding: 'unset', paddingTop: '0.5%' }}>
                            <input className="btn waves-effect waves-light" type="submit" value="Search" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Search;