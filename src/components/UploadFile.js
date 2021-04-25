import React, { Component } from 'react';
import { CSVReader } from 'react-papaparse';

class CSVReader1 extends Component {
    constructor(props) {
        super(props);
        this.handleOnFileLoad = props.handleOnFileLoad.bind(this);
        this.buttonRef = React.createRef();
    };
    
    handleOpenDialog = (e) => {
        if (this.buttonRef.current) {
            this.buttonRef.current.open(e);
        }
    };
    
    handleOnError = (err) => {
        console.log(err);
    };
    
    render() {
        return (
            <div className="container">
                <CSVReader
                    ref={this.buttonRef}
                    onFileLoad={this.handleOnFileLoad}
                    onError={this.handleOnError}
                    noClick
                    noDrag
                >
                    {() => (
                        <button type="button" onClick={this.handleOpenDialog}>
                            Browse file
                        </button>
                    )}
                </CSVReader>
            </div>
        );
  }
}

export default CSVReader1;