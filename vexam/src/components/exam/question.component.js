import React from 'react';

import RawHtml from "react-raw-html";

import Lightbox from 'react-images';

import ReactHtmlParser from 'react-html-parser';

import { API_URL } from '../../utils/url';


// we didn't use class because this is a presentational stateless component

// React has a popular pattern to divide the component into two: presentational and container
// Container component are responsible for how things work and presentational component are 
// mainly used for how things look in the application


/*const renderAttachment = (imgsrc) => {
    return (
        <div className="subjective-question-img">
            <img src={API_URL + imgsrc} />
        </div>
    )
}

const Question = (props) => {
    return (
        <div>
            <span className="span-question-index"><b>{props.sn}. &nbsp; </b></span><RawHtml.span>{props.content}</RawHtml.span>
            {props.attachment == null || props.attachment == "" ? "" : renderAttachment(props.attachment)}
        </div>
    )
}*/



class Question extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lightboxIsOpen: false,
            currentImage: 0
        };

        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
    }

    openLightbox(index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    }

    closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    }

    renderAttachment(imgsrc) {
        let i = 0;
        return (
            <div className="subjective-question-img">
                <img src={API_URL + imgsrc} onClick={(e) => this.openLightbox(i, e)} />

                <Lightbox
                    images={[{ src: API_URL + imgsrc }]}
                    isOpen={this.state.lightboxIsOpen}
                    onClose={this.closeLightbox}
                />

            </div>
        )
    }

    render() {
        return (
            <div>
                <span className="span-question-index">
                    <b>{this.props.sn}. &nbsp; </b>
                </span>
                <div style={{"display":"flex"}}> 
                    <div className="col-md-10">{ ReactHtmlParser(this.props.content) } </div>
                    <div className="col-md-2"><span className="label label-primary pull-right">{this.props.category_name}</span></div>
                </div>
                {this.props.attachment == null || this.props.attachment == "" ? "" : this.renderAttachment(this.props.attachment)}
            </div>
        )
    }

}


export default Question;