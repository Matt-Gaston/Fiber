import React from "react";

class List extends React.Component {
    render() {
        return (
            <div>
                <h1>List</h1>
                {this.props.Juncts.map((Junct) =>
                    Junct.selected ? <li>{Junct.name}</li> : null
                )}
            </div>
        );
    }
}

export default List;
