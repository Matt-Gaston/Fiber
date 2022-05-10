//Main entry point for app
//this uses google-map-react for easy integration of google maps api with react

import React from "react";
import Map from "./components/Map/Map";
import List from "./components/List/List";
import Header from "./components/Header/Header";
import { CssBaseline, Grid } from "@mui/material";
import data from "./data.js";
import distances from "./distances.js";

//top level DOM element
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapDataAndSelect: [],
            connections: [],
        };
    }

    //if component mounts this function loads in the map data
    //map data is stored in data.js
    //all map data that get loaded in gets mapped as a marker
    componentDidMount() {
        let locations = [];
        //iterate through and only load in points that actually have a distance associated with them
        for (let mark of data) {
            for (let validJunct of distances) {
                if (
                    validJunct.Key.includes(mark.Name) &&
                    !locations.includes(mark)
                ) {
                    //also assign a selected property, this allows visual changes as well as for being passed to the list to see what needs to be added up
                    var n = Object.assign(mark, { selected: false });
                    // console.log(n);
                    locations.push(n);
                    break;
                }
            }
        }
        this.setState({ mapDataAndSelect: locations });
    }

    //when a marker is clicked this changes the selected property, internal styling changes the color
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
