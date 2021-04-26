import React from 'react';

import '../css/App.css';
import AppHeader from './AppHeader.js'
import AppContent from './AppContent.js'
import AppFooter from './AppFooter.js'

import { GetRandomWeights, getColor, binToInt, equals } from '../controllers/utilities.js';
import { forward, train, classify, getAsserted } from '../controllers/adaline.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      w: [[[-0.75, 0.5, 0.5]]],
      x: [[0, 0], [0, 1], [1, 0], [1, 1]],
      y: [[0], [0], [0], [1]],
      xIndex: [0, 1],
      yIndex: 2,
      f: 0,
      headerPatterns: false,
      headerPatterns: false,
      classes: {
        True: {
          value: [1],
          color: '#0f0'
        },
        False: {
          value: [0],
          color: '#f00'
        }
      },
      min: 0,
      max: 0.1,
      learning_rate: 0.4,
      epoch: 5000,
      error: 0.01,
      normalizationMethod: 1,
      lines: [[
        {
          x: -1,
          y: - (0.5) * -1 / (0.5) - (-0.75) / (0.5)
        },
        {
          x: 1,
          y: - (0.5) * 1 / (0.5) - (-0.75) / (0.5)
        }
      ]],
      chartData: [
        {
          label: 'True',
          color: '#0f0',
          size: 7,
          data: [
            {
              x: 1,
              y: 1
            }
          ]
        },
        {
          label: 'False',
          color: '#f00',
          size: 7,
          data: [
            {
              x: 0,
              y: 0
            },
            {
              x: 0,
              y: 1
            },
            {
              x: 1,
              y: 0
            }
          ]
        }
      ],
      chartDomain: {
        x: [-10, 10],
        y: [-100, 100]
      }
    };

    this.handleHeaderPatterns = this.handleHeaderPatterns.bind(this);
    this.handlePatterns = this.handlePatterns.bind(this);
    this.handleHeaderClasses = this.handleHeaderClasses.bind(this);
    this.handleClasses = this.handleClasses.bind(this);
    this.handleLearningRateChange = this.handleLearningRateChange.bind(this);
    this.handleErrorChange = this.handleErrorChange.bind(this);
    this.handleEpochChange = this.handleEpochChange.bind(this);
    this.handleTrain = this.handleTrain.bind(this);
    this.handleAddPoints = this.handleAddPoints.bind(this);
  }

  handleAddPoints = (e) => {
    let x = this.state.x;
    x.push([e.xValue, e.yValue]);
    let chartData = this.getChartData(this.state.w, this.state.y, this.state.classes);
    this.setState({
      x: x,
      chartData: chartData
    });
  }

  handleHeaderPatterns = (e) => {
    this.setState({headerPatterns: e.target.value});
  }

  handlePatterns = (data) => {
    let x = this.parseInputs(data);
    this.setState({ x: x });
  }

  handleHeaderClasses = (e) => {
    this.setState({headerClasses: e.target.value});
  }

  handleClasses = (data) => {
    let { y, classes, labels } = this.parseClasses(data);
    let values = this.parseOutputs(y, labels, classes);
    let c = this.parseColors(classes, values);
    let arch = this.setArch(data[0]['data'].length);
    let w = GetRandomWeights(arch, this.state.min, this.state.max);
    let {chartData, lines} = this.computeLines(w, y, c);
    this.setState({
      y: y,
      w: w,
      arch: arch,
      classes: c,
      chartData: chartData,
      lines: lines
    });
  }
  
  handleLearningRateChange = (e) => {
    this.setState({
      learning_rate: e.target.value
    });
  }

  handleErrorChange = (e) => {
    this.setState({
      error: e.target.value
    });
  }

  handleEpochChange = (e) => {
    this.setState({
      epoch: e.target.value
    });
  }

  handleTrain = () => {
    let w = train(
      this.state.x,
      this.state.y,
      this.state.w,
      this.state.learning_rate,
      this.state.epoch,
      this.state.error,
      this.state.f
    );
    this.setState({
      w: w,
      chartData: this.getChartData(w, this.state.y, this.state.classes),
      lines: this.getLines(w)
    });
  }

  handleCSV = (data) => {
    let { x, classes, labels } = this.parseInputs(data);
    let { y, values } = this.parseOutputs(labels, classes);
    let c = this.parseColors(classes, values);
    let w = GetRandomWeights(this.state.arch, this.state.min, this.state.max);
    this.setState({
      x: x,
      y: y,
      w: w,
      classes: c,
    });
    this.computeLine();
  }

  getLine = (w) => {
    let x = this.state.chartDomain.x;
    return [
      {
        x: x[0],
        y: - x[0] * w[1] / w[2] - w[0] / w[2]
      },
      {
        x: x[1],
        y: - x[1] * w[1] / w[2] - w[0] / w[2]
      }
    ]
  }

  getChartData = (w, y, classes) => {
    let haty = classify(forward(this.state.x, w, this.state.f, y).yHat);
    let asserted = getAsserted(y, haty)
    let chartData = [];
    let match;
    Object.keys(classes).forEach(key => {
      chartData.push({
        label: key,
        color: classes[key]['color'],
        size: 3,
        data: []
      });
    });
    haty.forEach((e, i) => {
      match = false;
      let keys = Object.keys(chartData);
      for (let j = 0; j < keys.length; j++) {
        if (chartData[j]['label'] != -1 && equals(e, classes[chartData[j]['label']]['value'])) {
          chartData[j]['data'].push({
            x: this.state.x[i][0],
            y: this.state.x[i][1],
            symbol: asserted[i] ? "circle" : "star"
          });
          match = true;
          break;
        }
      }
      if (!asserted[i] && !match) {
        chartData[chartData.length-1]['data'].push({
          x: this.state.x[i][0],
          y: this.state.x[i][1],
          symbol: "square"
        });
      }
    });
    
    return chartData;
  }

  getLines = () => {
    let w = this.state.w
    let lines = [];

    w[w.length - 1].forEach(element => {
      lines.push(this.getLine(element));
    });

    return lines;
  }

  computeLines = (w, y, classes) => {
    let chartData = this.getChartData(w, y, classes);
    let lines = [];

    w[w.length - 1].forEach(element => {
      lines.push(this.getLine(element));
    });

    return {
      chartData: chartData,
      lines: lines
    };
  }

  setDomain(obj) {
    return {
      x: [obj.min[0], obj.max[0]],
      y: [obj.min[1], obj.max[1]]
    }
  }

  parseInputs = (data) => {
    let x = [];
    for (let i = 0; i < data.length; i++) {
      if (this.state.headerPatterns && i === 0) {
        continue
      }
      x.push([]);
      data[i]['data'].forEach(value => {
        x[i].push(parseFloat(value));
      });
    }
    return x;
  }

  parseClasses = (data) => {
    let classes = [];
    let y = [];
    let labels = []
    let label = [];
    let int = 0;

    classes.push(-1);

    for (let i = 0; i < data.length; i++) {
      if (this.state.headerClasses && i === 0) {
        continue;
      }
      label = [];
      data[i]['data'].forEach(value => {
        label.push(parseInt(value));
      });
      int = binToInt(label);
      labels.push(int);
      y.push(label);
      if (!classes.includes(int)) {
        classes.push(int);
      }
    }
    return { y, classes, labels }
  }

  parseOutputs = (y, labels, classes) => {
    let values = {};
    let val;
    let n = classes.length;
    labels.forEach((element, index) => {
      val = y[index];
      if (!Object.values(values).includes(val)) {
        values[element] = val;
      }
    });
    return values;
  }

  setArch = (n) => {
    return [2, n];
  }

  parseColors = (classes, values) => {
    let c = {};
    classes.forEach((element, index) => {
      c[element] = {
        value: values[element],
        color: getColor(index, classes.length)
      };
    });
    return c;
  }

  render = () => {
    return (
      <div className="App box">
        <div className="row header App-header">
          <AppHeader />
        </div>

        <div className="row content App-content">
          <AppContent
            data={this.state.chartData}
            domain={this.state.chartDomain}
            lines={this.state.lines}
            learning_rate={this.state.learning_rate}
            error={this.state.error}
            epoch={this.state.epoch}
            classes={this.state.classes}
            headerPatterns={this.state.headerPatterns}
            handleHeaderPatterns={this.handleHeaderPatterns}
            handlePatterns={this.handlePatterns}
            headerClasses={this.state.headerClasses}
            handleHeaderClasses={this.handleHeaderClasses}
            handleClasses={this.handleClasses}
            handleLearningRateChange={this.handleLearningRateChange}
            handleErrorChange={this.handleErrorChange}
            handleEpochChange={this.handleEpochChange}
            handleTrain={this.handleTrain}
            handleAddPoints={this.handleAddPoints}
          />
        </div>

        <div className="row footer App-footer">
          <AppFooter>

          </AppFooter>
        </div>
      </div>
    );
  }
}

export default App;