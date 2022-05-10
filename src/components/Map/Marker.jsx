//styling and functionality for markers on map

function Marker(props) {
    return (
        <button
            style={{
                color: "white",
                background: props.selected ? "green" : "grey", //shows if it is selected or not
                padding: "10px 10px",
                display: "inline-flex",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "100%",
                transform: "translate(-50%, -50%)",
                whiteSpace: "nowrap",
                fontSize: props.$hover ? 12 : 0, //if hovered show text
                position: "absolute",
                zIndex: props.$hover ? 1 : 0, //if hovered ensure no other markers cover it
            }}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    );
}

export default Marker;
