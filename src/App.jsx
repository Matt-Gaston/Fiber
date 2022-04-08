import React from "react";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import Header from "./components/Header/Header";
import { CssBaseline, Grid } from "@mui/material";
import data from "./data.js";
import $ from "jquery";
import distances from "./distances.js";

const mapData2 = [
    { name: "JNC1", coords: { lat: 37.95239, lng: -91.77998 } },
    { name: "JNC2", coords: { lat: 37.95239, lng: -91.76998 } },
    { name: "JNC3", coords: { lat: 37.95239, lng: -91.78998 } },
    { name: "JNC4", coords: { lat: 37.96239, lng: -91.76 } },
];

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapDataAndSelect: [],
            connections: [],
        };
    }

    componentDidMount() {
        var locations = [];
        for (var mark of data) {
            var n = Object.assign(mark, { selected: false });
            // console.log(n);
            locations.push(n);
        }
        console.log(locations);
        this.setState({ mapDataAndSelect: locations });
    }

    onJunctionClick = (key) => {
        this.setState((state) => {
            const index = state.mapDataAndSelect.findIndex(
                (e) => e.Name === key
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
