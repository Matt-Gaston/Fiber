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
        const Junctions = this.props.mapData;
        return (
            <div style={{ height: "100vh", width: "100%" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: "<key here>",
                    }}
                    defaultCenter={this.startCoords}
                    defaultZoom={14}
                    onChildClick={this.props.onClick}
                >
                    {Junctions.map((Junct) => (
                        <Marker
                            key={Junct.Name}
                            text={Junct.Name}
                            lat={Junct.coords.lat}
                            lng={Junct.coords.lng}
                            selected={Junct.selected}
                        />
                    ))}
                </GoogleMapReact>
            </div>
        );
    }
}

export default Map;
