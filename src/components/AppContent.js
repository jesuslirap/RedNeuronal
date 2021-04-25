import Chart from './Chart.js';
import ChartScatter from './ChartScatter';
import Parameters from './Parameters.js';

const AppContent = (props) => {
    return (
        <div className="container">
            <div className="container container-column">
            <div>
                <ChartScatter
                    data={props.data}
                    domain={props.domain}
                    lines={props.lines}
                    handleAddPoints={props.handleAddPoints}
                />
            </div>

            <div className="chart">
                <Chart
                    data={props.data}
                    domain={props.domain}
                    lines={props.lines}
                />
            </div>
            </div>

            <div className="parameters grow-2">
                <Parameters
                    w1={props.w1}
                    w2={props.w2}
                    b={props.b}
                    learning_rate={props.learning_rate}
                    error={props.error}
                    epoch={props.epoch}
                    headerPatterns={props.headerPatterns}
                    handleHeaderPatterns={props.handleHeaderPatterns}
                    handlePatterns={props.handlePatterns}
                    headerClasses={props.headerClasses}
                    handleHeaderClasses={props.handleHeaderClasses}
                    handleClasses={props.handleClasses}
                    handleLearningRateChange={props.handleLearningRateChange}
                    handleErrorChange={props.handleErrorChange}
                    handleEpochChange={props.handleEpochChange}
                    handleTrain={props.handleTrain}
                />
            </div>
        </div>
    );
}

export default AppContent;