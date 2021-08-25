import React from 'react';

const History = (props) => {

    if (props && props.historyData) {
        props.historyData.reverse();
    }

    return (
        <div className="container">
            <div className="row" style={{ paddingBottom: '3%' }}>
                <div className="col s6" style={{ display: 'contents', textAlign: props.historyData && props.historyData.length > 0 ? 'end' : 'center' }}>
                    <p onClick={props.collapseHistory} style={{ color: '#26a69a', cursor: 'pointer', textAlign: 'center', fontSize: 'large' }}>
                        Search History
                        <i className="material-icons" style={{position: 'relative', top: '8px'}}>
                            {props.isShown ? 'arrow_drop_up' : 'arrow_drop_down'}
                        </i>
                    </p>
                    {
                        !props.isShown ? '' :
                            !props.historyData ? <p>No Search History</p> :
                                <div>
                                    <table>
                                        <tbody>
                                            {
                                                props.historyData.map((data, i) => {
                                                    return (
                                                        <tr>
                                                            <td>{i + 1}</td>
                                                            <td>{data.history && data.history.movieName ? data.history.movieName : '-'}</td>
                                                            <td>{data.history && data.history.language ? data.history.language : '-'}</td>
                                                            <td style={{ textAlign: 'end' }}><a className="waves-effect waves-light btn-small" onClick={() => props.changeHistory(i)}><i className="material-icons">delete</i></a></td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        !props.historyData.length > 0 ? <p>No Search History</p> :
                                            <a className="waves-effect waves-light btn-small" style={{ marginTop: '1%' }} onClick={() => props.changeHistory(-1)}>Delete All</a>
                                    }
                                </div>

                    }
                </div>
            </div>
        </div>
    )
}

export default History;