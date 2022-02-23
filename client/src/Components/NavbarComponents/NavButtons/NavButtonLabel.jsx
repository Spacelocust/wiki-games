import React from 'react';
import { Link } from "react-router-dom";

class NavButtonLabel extends React.Component {
    constructor(props) {
        super(props);
        this.classes = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            height: '100%',
            padding: '0.5rem 1.5rem',
            marginLeft: '0.15rem',
            fontSize: '0.8rem',
            backgroundColor: '#e8e8e8'
        }
    }

    onAction(e) {
        e.preventDefault();
        this.props.onClick()
    }

    render() {
        return (
            <>
                {
                    this.props.link ? <Link to={this.props.link} className='text-dark font-secular text-uppercase' style={this.classes}>{this.props.label}</Link> :
                    <a className='text-dark font-secular text-uppercase' style={this.classes} onClick={(e) => this.onAction(e)}>
                        {this.props.label}
                    </a>
                }
            </>
        );
    }
}

export default NavButtonLabel;
