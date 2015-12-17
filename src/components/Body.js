import React from 'react';
import Table from './Table';

const Radium = require('radium');

class Body extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let styles = {
            tableContainer: {
                width: '100%'
            }
        }
        return (
            <div style={[ styles.tableContainer ]}>
                <Table 
                    materials={this.props.materials} 
                    sidings={this.props.sidings} 
                    toggleMaterialStyle={this.props.toggleMaterialStyle}
                    loggedIn={this.props.loggedIn}
                />
            </div>
        );
    }
}

Body = Radium(Body);

export default Body;