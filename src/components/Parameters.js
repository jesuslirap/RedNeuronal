import React from 'react';

import CSVReader1 from './UploadFile.js'

const Parameters = props => {
    return (
        <div className="container">
            <form>

            <div className="input-box">
                    <div className="input-item">
                        <p>header</p>
                    </div>

                    <div className="input-item input-field">
                        <input type="checkbox" id="header-patterns" name="header-patterns" value={props.headerPatterns} onChange={props.handleHeaderPatterns} />
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-item">
                        <p>patrones</p>
                    </div>

                    <div className="input-item input-field">
                        <CSVReader1
                            handleOnFileLoad={props.handlePatterns}
                        />
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-item">
                        <p>header</p>
                    </div>

                    <div className="input-item input-field">
                        <input type="checkbox" id="header-classes" name="header-classes" value={props.headerClasses} onChange={props.handleHeaderClasses} />
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-item">
                        <p>clases</p>
                    </div>

                    <div className="input-item input-field">
                        <CSVReader1
                            handleOnFileLoad={props.handleClasses}
                        />
                    </div>
                </div>
                
                <div className="input-box">
                    <div className="input-item">
                        <label htmlFor="learning-rate">&#951; = {props.learning_rate}</label>
                    </div>

                    <div className="input-item input-field">
                        <input type="range" id="learning-rate" value={props.learning_rate} onChange={props.handleLearningRateChange} name="learning-rate" min="0" max="1" step="0.001" />
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-item">
                        <label htmlFor="error">error = {props.error}</label>
                    </div>

                    <div className="input-item input-field">
                        <input type="range" id="error" value={props.error} onChange={props.handleErrorChange} name="error" min="0" max="0.1" step="0.001" />
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-item">
                        <label htmlFor="epoch">epocas</label>
                    </div>

                    <div className="input-item input-field">
                        <input type="number" id="epoch" name="epoch" step="1" value={props.epoch} onChange={props.handleEpochChange} />
                    </div>
                </div>

                <div className="input-box">
                    <div className="input-item">
                        <input type="button" onClick={props.handleTrain} value="train"/>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Parameters;