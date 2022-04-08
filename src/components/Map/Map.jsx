import React from "react";
import GoogleMapReact from "google-map-react";

function Marker(props) {
    return (
        <button
            style={{
                color: "white",
                background: props.selected ? "green" : "grey",
                padding: "3px 3px",
                display: "inline-flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
            }}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

class Map extends React.Component {
    startCoords = { lat: 37.948126, lng: -91.77157 };

    render() {
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
        const Junctions = this.props.mapData;
        return (
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "Key here",
                    }}
                    defaultCenter={this.startCoords}
                    defaultZoom={14}
                    onChildClick={this.props.onClick}
                    defaultOptions={{ styles: MapStyles, scrollwheel: "true" }}
                >
                    {Junctions.map(function (Junct) {
                        return (
                            <Marker
                                key={Junct.Name}
                                text={Junct.Name.match(/\n(.*)/g)}
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
