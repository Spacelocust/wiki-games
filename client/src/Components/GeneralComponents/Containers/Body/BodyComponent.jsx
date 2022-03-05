import React from 'react';
import { motion } from 'framer-motion';

class BodyComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const container = {
            hidden: { opacity: 1, scale: 0 },
            visible: {
                opacity: 1,
                scale: 1,
                transition: {
                    delayChildren: 5,
                    staggerChildren: 5
                }
            },
            exit: {
                transition: {
                    delayChildren: 5,
                    staggerChildren: 5
                }
            }
        };

        return (
            <div style={{ height: 'fit-content', width: '100%', margin: '1rem 0' }}>
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={this.props.className}
                >
                    {this.props.children}
                </motion.div>
            </div>
        );
    }
}

export default BodyComponent;
