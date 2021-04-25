import { Component } from 'react';
import { ScatterChart, Legend, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Scatter, ResponsiveContainer } from "recharts";

class ChartScatter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data01: [
                {
                    "x": 100,
                    "y": 200,
                    "z": 200
                },
                {
                    "x": 120,
                    "y": 100,
                    "z": 260
                },
                {
                    "x": 170,
                    "y": 300,
                    "z": 400
                },
                {
                    "x": 140,
                    "y": 250,
                    "z": 280
                },
                {
                    "x": 150,
                    "y": 400,
                    "z": 500
                },
                {
                    "x": 110,
                    "y": 280,
                    "z": 200
                }
            ],
            data02: [
                {
                    "x": 200,
                    "y": 260,
                    "z": 240
                },
                {
                    "x": 240,
                    "y": 290,
                    "z": 220
                },
                {
                    "x": 190,
                    "y": 290,
                    "z": 250
                },
                {
                    "x": 198,
                    "y": 250,
                    "z": 210
                },
                {
                    "x": 180,
                    "y": 280,
                    "z": 260
                },
                {
                    "x": 210,
                    "y": 220,
                    "z": 230
                }
            ]
        }
    }

    render() {
        return (
            <div className="container">
                <ScatterChart width={730} height={250} onClick={this.props.handleAddPoints}
                    margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" dataKey="x" name="y" domain={this.props.domain.x} />
                    <YAxis type="number" dataKey="y" name="y" domain={this.props.domain.y} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    {this.props.lines.map(item => (
                        <Scatter strokeWidth="1" data={item} line={{ stroke: 'black', strokeWidth: 1 }} />
                    ))}
                    <Legend />
                    {this.props.data.map(item => (
                        <Scatter name={item.label} data={item.data} fill={item.color} />
                    ))}
                </ScatterChart>
            </div>
        );
    }
}

export default ChartScatter;