import React from 'react';



const ListPagination = (props) => {

    if(props.recordCount <= 10){
        return null;
    }

    const range = [];
    for(let i=0; i < Math.ceil(props.recordCount / 10); ++i){
        range.push(i);
    }

    const setPage = (page) => {
        props.onSetPage(page);
    }


    return(
        <nav>
            <ul className="pagination">
                {
                    range.map(v=> {
                        const isCurrent = (v === props.currentPage);

                        const onClick = (ev)=> {
                            ev.preventDefault();
                            setPage(v);
                        }

                        return(
                            <li
                                className= { isCurrent ? 'page-item ative' : 'page-item'}
                                onClick = {onClick}
                                key = {v.toString()} >

                                <a className="page-link" href="">{v + 1}</a>

                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    )

}


export default ListPagination;