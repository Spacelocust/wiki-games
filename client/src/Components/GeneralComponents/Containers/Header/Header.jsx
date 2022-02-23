import React from 'react';
import FigureImage from "react-bootstrap/FigureImage";
import Load from '../../../GamesComponents/Games/load';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='row'>
                <div className="col-md-2">
                    {this.props.img ? <FigureImage
                        className="bg-white rounded m-0"
                        width={180}
                        height={180}
                        alt="171x180"
                        src={this.props.img}
                    /> : <Load/>}
                </div>
                <div className="col-md-10">
                    <div className='bg-dark w-100 h-100 rounded text-light'>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;
