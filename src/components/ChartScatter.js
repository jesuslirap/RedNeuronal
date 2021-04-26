import { Component } from 'react';
import { ScatterChart, Legend, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Scatter, ResponsiveContainer } from "recharts";

class ChartScatter extends Component {
    constructor(props) {
        super(props);
        const colorVar = '#ff0000';
        this.state = {
            legend: {
                "--color": colorVar
            }
        }
    }

    getPayload = () => {
        let classes = this.props.classes;
        let payload = [];
        Object.keys(classes).forEach((key, index) => {
            payload.push({
                value: key,
                type: 'circle',
                id: index,
                color: classes[key].color
            });
        });
        return payload;
    }

    render() {
        console.log(this.props.lines)
        return (
            <div className="container container-column">
                <div>
                    <ScatterChart width={730} height={250} onClick={this.props.handleAddPoints}
                        margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="x" name="y" domain={this.props.domain.x} />
                        <YAxis type="number" dataKey="y" name="y" domain={this.props.domain.y} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        {this.props.lines.map((item, index) => (
                            <Scatter key={'line-' + index} markerWidth="1" width='5' data={item} fill="#ffffff" line={{ stroke: 'black', strokeWidth: 1 }} />
                        ))}
                        {this.props.data.map((item, index) => (
                            <Scatter key={'circle' + index} name={item.label} data={item.data} fill={item.color} />
                        ))}
                    </ScatterChart>
                </div>
                <div>
                    <ul>
                        {Object.keys(this.props.classes).map(key => (
                            <li id={'legend-'+key} style={{
                                "--color": this.props.classes[key].color
                            }}>{key}</li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ChartScatter;