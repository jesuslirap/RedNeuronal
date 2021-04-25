import { 
    VictoryChart,
    VictoryTheme,
    VictoryLine,
    VictoryScatter 
} from 'victory';

const Chart = (props) => {
    return (
        <VictoryChart
            theme={VictoryTheme.material}
            domain={props.domain}
        >

            {props.data.map(item => (
               <VictoryScatter
                    style = {{ data : { fill : item.color } }}
                    size = {item.size}
                    data = {item.data}
                    key = {item.label}
               />
            ))}

            {props.lines.map((item, index) => (
                <VictoryLine
                    style={{
                        data: { stroke: "#000" },
                        parent: { border: "1px solid #ccc"}
                    }}
                    data={item}
                    key={index}
                />
            ))}

        </VictoryChart>
    );
}

export default Chart;