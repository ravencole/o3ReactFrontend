import React from 'react';
import { capitalize } from './Utils';

const Radium = require('radium');

let Table = React.createClass({
    render() {
        let styles = {
            table: {
                margin: '0 auto 70px auto'
            },
            border: {
                border: '1px dashed black',
            },
            tableHeadingPadding: {
                padding: '22px',
                textAlign: 'center'
            },
            materialPadding: {
                padding: '0 60px'
            },
            tableDataPadding: {
                padding: '15px',
                textAlign: 'center'
            },
            tableHover: {
                transition: 'all 100ms ease',
                ':hover': {
                    backgroundColor: '#f6f6f6',
                    cursor: 'pointer'
                }
            },
            arrowContainer: {
                position: 'relative',
                height: '18px',
                width: '18px',
                margin: '0 auto',
                transition: 'all 500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            },
            arrowHover: {
                transform: 'rotate(360deg)'
            },
            arrowLeft: {
                position: 'absolute',
                bottom: '0',
                left: '2px',
                height: '7px',
                borderLeft: '1px solid black',
                transform: 'rotate(-40deg)'
            },
            arrorwRight: {
                position: 'absolute',
                bottom: '-2px',
                right: '7px',
                height: '17px',
                borderLeft: '1px solid black',
                transform: 'rotate(40deg)'
            }
        };
        let renderSidings = this.props.sidings.map((siding, index) => {
            return <th key={`${siding.name}${index}`} style={[ styles.border, styles.tableHeadingPadding ]}>{capitalize(siding.name)}</th>;
        });
        let renderMaterials = this.props.materials.sort((a, b) => a._id - b._id).map((material, index) => {
            let materialStyles =[];
            material.styles.map((style) => {
                materialStyles.push(style.id);
            });
            let sidingStyles = this.props.sidings.map((siding) => {
                let arrow = () => {
                    return (
                        <div key={`${material._id}${siding._id}arrow`} style={[ styles.arrowContainer,  styles.arrowHover ]}><div style={[ styles.arrowLeft ]}></div><div style={[ styles.arrorwRight ]}></div></div>
                    );
                }
                return (
                    <td 
                        key={`${material._id}${siding._id}`} 
                        style={[ 
                            styles.border, 
                            styles.tableDataPadding,
                            this.props.loggedIn && styles.tableHover
                        ]} 
                        id={`${material._id}:${siding._id}`} 
                        onClick={this.props.loggedIn ? this.props.toggleMaterialStyle : ''}
                    >
                        {
                            materialStyles.indexOf(siding._id) >= 0 &&
                                <div 
                                    key={`${material._id}${siding._id}arrow`} 
                                    style={[ 
                                        styles.arrowContainer,  
                                        Radium.getState(this.state, `${material._id}${siding._id}`, ':hover') && styles.arrowHover 
                                    ]}
                                >
                                    <div style={[ styles.arrowLeft ]}></div>
                                    <div style={[ styles.arrorwRight ]}></div>
                                </div>
                        }
                    </td>
                );
            });
            return (
                <tr>
                    <td key={`${material.name}${material._id}${index}`} style={[ styles.border, styles.tableHeadingPadding ]}>{capitalize(material.name)}</td>
                    {sidingStyles}
                </tr>
            );
        });
        return (
            <table style={[ styles.table ]}>
                <thead>
                    <tr>
                        <th 
                            key="materialsheader" 
                            style={[ 
                                styles.border, 
                                styles.tableHeadingPadding
                                ]}
                            >
                                Materials
                            </th>
                        {renderSidings}
                    </tr>
                </thead>
                <tbody> 
                     {renderMaterials}
                </tbody>
            </table>
        );
    }
});

Table = Radium(Table);

export default Table;