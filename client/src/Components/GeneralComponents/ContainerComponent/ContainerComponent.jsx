import React from 'react';

class ContainerComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container' style={{ paddingTop: '3.5rem', height: '100vh' }}>
                {this.props.children}
            </div>
        );
    }
}

export default ContainerComponent;