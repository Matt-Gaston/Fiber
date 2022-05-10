//map component, passed data for markers to be mapped

import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker.jsx";

class Map extends React.Component {
    startCoords = { lat: 37.948126, lng: -91.77157 }; //start coords for rolla

    render() {
        //attempt to disable things like mcdonalds and other POI, only custom markers should be clickable
        const MapStyles = [
            {
                featureType: "all",
                elementType: "labels.text",
                stylers: [{ visibility: "off" }],
            },
            {
                featureType: "poi",
                elementType: "labels.icon",
                stylers: [{ visibility: "off" }],
            },
        ];

        return (
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "key here", //google maps api key
                    }}
                    defaultCenter={this.startCoords}
                    defaultZoom={14}
                    onChildClick={this.props.onClick}
                    defaultOptions={{ styles: MapStyles, scrollwheel: "true" }}
                >
                    {this.props.mapData.map(function (Junct) {
                        //maps all marker data to markers on the map
                        return (
                            <Marker
                                key={Junct.Name}
                                text={Junct.Name.match(/\n(.*)/g)} //shows only the name and not the unique identifier and newline before it
                                lat={Junct.coords.lat}
                                lng={Junct.coords.lng}
                                selected={Junct.selected}
                            />
                        );
                    })}
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;
