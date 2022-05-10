//this component is the list on the left hand side
//figures out the distances and what boxes arent connected

import React from "react";
import distances from "../../distances";

class List extends React.Component {
    //this function gets juctions that have been selected
    //takes all selected locations and checks them against objects from distances.js
    //if a key exists in distances.js that has 2 unique selected locations it is appended
    //to an array and returned
    getSelectedJunctions(selectedLocs) {
        let locsAndDists = [];
        //nested for loop, iterates over all selected locations
        for (let loc1 of selectedLocs) {
            for (let loc2 of selectedLocs) {
                //fianlly iterates over valid junctions
                for (let validJ of distances) {
                    if (
                        //loc1 and loc2 should not be same object
                        //the key of a valid junction should include loc1 and loc2
                        //the final array to be returned should not already contain the junction
                        //combos not perms
                        loc1 !== loc2 &&
                        validJ["Key"].includes(loc1["Name"]) &&
                        validJ["Key"].includes(loc2["Name"]) &&
                        !locsAndDists.includes(validJ)
                    ) {
                        locsAndDists.push(validJ);
                    }
                }
            }
        }
        return locsAndDists;
    }

    //returns JSX
    //locsAndDists - json object containing objects from distances.js
    //               should only be passed locations that are linked up according to key
    getSelectedBoxDisplay(locsAndDists) {
        return (
            <div>
                <h1>Selected Boxes:</h1>
                <ul>
                    {locsAndDists.map((Junct) => (
                        <li key={Junct.Name}>{Junct.ReadName}</li>
                    ))}
                </ul>
            </div>
        );
    }

    //finds locations that are selected but do not yet have another corresponding location to be linked with
    //returns a JSX element
    getUnlinkedLocsDisplay(selectedLocs, locsAndDists) {
        let unlinkedLocs = [];
        for (let loc of selectedLocs) {
            let included = false;
            for (let vJ of locsAndDists) {
                if (vJ.Key.includes(loc.Name)) {
                    included = true;
                }
            }
            if (!included) {
                unlinkedLocs.push(loc);
            }
        }

        return unlinkedLocs.lenth === 0 ? (
            <></>
        ) : (
            <div>
                <h1>Unlinked Locations:</h1>
                <ul>
                    {unlinkedLocs.map((loc) => (
                        <li key={loc.Name}>{loc.Name.match(/\n(.*)/g)}</li>
                    ))}
                </ul>
            </div>
        );
    }

    //
    getTotalDistanceDisplay(locsAndDists) {
        let distTotal = 0;
        for (let loc of locsAndDists) {
            distTotal += parseInt(loc.Distance);
        }

        return distTotal === 0 ? (
            <h1>No Connections</h1>
        ) : (
            <h1>Total Distance: {distTotal}</h1>
        );
    }

    //returns a JSX element that displays the total distance or states there are no connections
    getSelectedLocations() {
        let selectedLocs = [];
        for (let loc of this.props.Juncts) {
            if (loc.selected === true) {
                selectedLocs.push(loc);
            }
        }
        return selectedLocs;
    }

    render() {
        //get data for functions
        let selectedLocs = this.getSelectedLocations();

        //get updated display elements
        let locsAndDists = this.getSelectedJunctions(selectedLocs);
        let selectedBoxDisplay = this.getSelectedBoxDisplay(locsAndDists);
        let unlinkedLocDisplay = this.getUnlinkedLocsDisplay(
            selectedLocs,
            locsAndDists
        );
        let distDisplay = this.getTotalDistanceDisplay(locsAndDists);

        //return JSX to be rendered
        return (
            <div>
                {selectedBoxDisplay}
                {distDisplay}
                {unlinkedLocDisplay}
            </div>
        );
    }
}

export default List;
