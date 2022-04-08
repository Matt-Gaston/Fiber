import React from "react";
import distances from "../../distances";

class List extends React.Component {
    getDistancesAndNames(selectedLocs) {
        let locsAndDists = [];
        for (let loc1 of selectedLocs) {
            for (let loc2 of selectedLocs) {
                for (let validJ of distances) {
                    if (
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

    getSelectedBoxes(locsAndDists) {
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

    getUnlinkedLocations(selectedLocs, locsAndDists) {
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

    getTotalDistance(locsAndDists) {
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
        let selectedLocs = this.getSelectedLocations();

        let locsAndDists = this.getDistancesAndNames(selectedLocs);
        let selectedBoxDisplay = this.getSelectedBoxes(locsAndDists);
        let unlinkedLocDisplay = this.getUnlinkedLocations(
            selectedLocs,
            locsAndDists
        );
        let distDisplay = this.getTotalDistance(locsAndDists);
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
