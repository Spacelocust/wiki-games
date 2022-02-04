import React from 'react';

class BodyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ height: 'fit-content', width: '100%', marginTop: '1rem' }}>
                {this.props.children}
            </div>
        );
    }
}

export default BodyComponent;
