import React from 'react'
import Lightbox from 'react-images';
import { API_URL } from '../../utils/url';


class AnswerOption extends React.Component {

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




    renderAttachment = () => {
        let i = 0;
        return (<div className="option-img">

            <img src={API_URL + this.props.attachment} onClick={(e) => this.openLightbox(i, e)} />

            <Lightbox
                images={[{ src: API_URL + this.props.attachment }]}
                isOpen={this.state.lightboxIsOpen}
                onClose={this.closeLightbox}
            />

        </div>)
    }

    render() {
        return (
            <li className="answerOption">
                <input
                    type="checkbox"
                    className="quizcheckBox"
                    name="checkBoxGroup"
                    id={this.props.answerType}
                    data-optionId={this.props.optionId}
                    data-questionId={this.props.questionId}
                    value={this.props.optionId}
                    disabled={this.props.answer}
                    onChange={this.props.saveObjectiveAnswer}
                    checked={this.props.isChecked}
                />

                {this.props.answerContent ? this.props.answerContent : ''}
                {this.props.attachment ? this.renderAttachment() : ''}
            </li>
        )
    }




}


export default AnswerOption;