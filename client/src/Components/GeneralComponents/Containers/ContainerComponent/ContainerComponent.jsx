import React from 'react';

class ContainerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container' style={{ padding: '3.5rem 0', height: '100vh' }}>
                {this.props.children}
            </div>
        );
    }
}

export default ContainerComponent;
