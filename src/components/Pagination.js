import React from 'react';

const Pagination = (props) => {

    let pageLinks = [];
    
    let pn = props.currentPage > 1 ? props.currentPage - 1 : props.currentPage;

    for (let i = pn; i < pn + 3 && i <= props.pages; i++) {
        let active = props.currentPage == i ? 'active' : '';
        pageLinks.push(<li className={`waves-effect ${active}`} key={i} onClick={() => props.nextPage(i)}><a style={{ color: 'white' }} href="#!">{i}</a></li>)
    }

    return (
        <div className="container" style={{ textAlign: 'end' , width: '100%'}}>
            <div className="row">
                <ul className="pagination">
                    {props.currentPage > 1 ? <li className="waves-effect" onClick={() => props.nextPage(props.currentPage - 1)}><a href="#!"><i className="material-icons" style={{ color: 'white' }}>chevron_left</i></a></li> : ''}
                    {pageLinks}
                    {props.currentPage < props.pages + 1 && props.currentPage != props.pages ? <li className="waves-effect" onClick={() => props.nextPage(props.currentPage + 1)}><a href="#!"><i className="material-icons" style={{ color: 'white' }}>chevron_right</i></a></li> : ''}
                </ul>
            </div>
        </div>
    )
}

export default Pagination