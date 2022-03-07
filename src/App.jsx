import React from "react";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import Header from "./components/Header/Header";
import { CssBaseline, Grid } from "@mui/material";
import stuff from "./Fiber Asset locations.csv";

const mapData2 = [
    { name: "JNC1", coords: { lat: 37.95239, lng: -91.77998 } },
    { name: "JNC2", coords: { lat: 37.95239, lng: -91.76998 } },
    { name: "JNC3", coords: { lat: 37.95239, lng: -91.78998 } },
    { name: "JNC4", coords: { lat: 37.96239, lng: -91.76 } },
];

function csvJSON(csv) {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
}

// async function fetchMapData() {
//     let response = await fetch(stuff);
//     let data = await response.text();
//     let jsonData = csvJSON(data);
//     console.log(jsonData);
// }

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapDataAndSelect: [],
        };
    }

    componentDidMount() {
        let temp = mapData2;
        temp.forEach((junct) => {
            junct.selected = false;
        });
        this.setState({ mapDataAndSelect: temp });
    }

    onJunctionClick = (key) => {
        this.setState((state) => {
            const index = state.mapDataAndSelect.findIndex(
                (e) => e.name === key
            );
            state.mapDataAndSelect[index].selected =
                !state.mapDataAndSelect[index].selected;
            return { mapDataAndSelect: state.mapDataAndSelect };
        });
    };

    render() {
        return (
            <>
                <CssBaseline />
                <Header />
                <Grid container style={{ width: "100%" }}>
                    <Grid item style={{ width: "20%" }}>
                        <List Juncts={this.state.mapDataAndSelect} />
                    </Grid>
                    <Grid item style={{ height: "100%", width: "80%" }}>
                        <Map
                            mapData={this.state.mapDataAndSelect}
                            onClick={(key) => this.onJunctionClick(key)}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default App;
