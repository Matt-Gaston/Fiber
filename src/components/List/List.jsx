import React from "react";

class List extends React.Component {
    render() {
        return (
            <div>
                <h1>Selected Boxes</h1>
                {this.props.Juncts.map((Junct) =>
                    Junct.selected ? <li>{Junct.Name}</li> : null
                )}
            </div>
        );
    }
}

export default List;
