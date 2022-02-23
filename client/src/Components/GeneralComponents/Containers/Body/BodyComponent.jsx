import React from 'react';

class BodyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ height: 'fit-content', width: '100%', margin: '1rem 0' }}>
                {this.props.children}
            </div>
        );
    }
}

export default BodyComponent;
