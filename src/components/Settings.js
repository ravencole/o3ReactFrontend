import React from 'react';
import { capitalize } from './Utils';
const Radium = require('radium');

let Settings = React.createClass({
    render() {
        let styles = {
            settingsContainer: {
                position: 'fixed',
                padding: '10px 0',
                top: '85px',
                height: '80%',
                width: '20%',
                overflow: 'scroll',
                backgroundColor: 'white',
                borderLeft: '1px dashed black',
                borderBottom: '1px dashed black',
                borderTop: '1px dashed black',
                boxShadow: '0 0 6px 0 rgba(0,0,0,.2)',
                transition: 'all 500ms ease'
            },
            showSettings: {
                right: '0'
            },
            hideSettings: {
                right: '-22%'
            },
            sidiingsContainer: {
                width: '90%',
                margin: '0 auto',
                border: '1px dashed black'
            },
            settingsItem: {
                position: 'relative',
                width: '100%',
                textAlign: 'center',
                fontSize: '16px',
                boxSizing: 'border-box',
                padding: '5px 20px',
                borderBottom: '1px dashed black'
            },
            settingsHover: {
                transition: 'all 100ms ease',
                ':hover': {
                    backgroundColor: '#f6f6f6',
                    cursor: 'pointer'
                }
            },
            styleForm: {
                width: '100%',
                textAlign: 'center'
            },
            styleInput: {
                width: '95%',
                fontSize: '14px'
            },
            cancelItemContainer: {
                position: 'absolute',
                top: '50%',
                right: '5px',
                transform: 'translateY(-50%)',
                height: '17px',
                width: '17px',
                zIndex: '10',
                transition: 'all 200ms ease',
                ':hover': {
                    cursor: 'pointer'
                }
            },
            cancelX: {
                position: 'absolute',
                height: '100%',
                zIndex: '1',
                left: '5px',
                transition: 'all 100ms ease'
            },
            crossLeft: {
                bottom: '0',
                transform: 'rotate(45deg)',
            },
            crossRight: {
                bottom: '-1px',
                transform: 'rotate(-45deg)',
            }
        }
        let getSidings = this.props.sidings.map((siding, index) => {
            return (
                <div 
                    key={`settings${siding._id}`} 
                    style={[ styles.settingsItem ]}
                >
                    {capitalize(siding.name)}
                    <div 
                        key={`settings${siding._id}crossContainer`} 
                        style={[ styles.cancelItemContainer ]}
                        onClick={this.props.deleteStyle}
                        id={siding._id} 
                    >
                        <div 
                            key={`settings${siding._id}crossleft`}
                            style={[ 
                                styles.cancelX, 
                                styles.crossLeft,
                                Radium.getState(this.state, `settings${siding._id}crossContainer`, ':hover') ? {border: '1px dotted #EF9A9A'} : {border: '1px dotted black'}
                            ]}
                        ></div>
                        <div 
                            key={`settings${siding._id}crossright`}
                            style={[ 
                                styles.cancelX, 
                                styles.crossRight,
                                Radium.getState(this.state, `settings${siding._id}crossContainer`, ':hover') ? {border: '1px dotted #EF9A9A'} : {border: '1px dotted black'} 
                            ]}
                        ></div>
                    </div>
                </div>
            );
        });
        let getMaterials = this.props.materials.map((material, index) => {
            return (
                <div 
                    key={`settings${material._id}`} 
                    style={[ styles.settingsItem, styles.settingsHover ]}
                >
                    {capitalize(material.name)}
                    <div 
                        key={`settings${material._id}crossContainer`} 
                        style={[ styles.cancelItemContainer ]}
                        onClick={this.props.deleteMaterial}
                        id={material._id}
                    >
                        <div 
                            key={`settings${material._id}crossleft`}
                            style={[ 
                                styles.cancelX, 
                                styles.crossLeft,
                                Radium.getState(this.state, `settings${material._id}crossContainer`, ':hover') ? {border: '1px dotted #EF9A9A'} : {border: '1px dotted black'}
                            ]}
                        ></div>
                        <div 
                            key={`settings${material._id}crossright`}
                            style={[ 
                                styles.cancelX, 
                                styles.crossRight,
                                Radium.getState(this.state, `settings${material._id}crossContainer`, ':hover') ? {border: '1px dotted #EF9A9A'} : {border: '1px dotted black'} 
                            ]}
                        ></div>
                    </div>
                </div>
            );
        });
        return (
            <div style={[ styles.settingsContainer, this.props.editingSettings ? styles.showSettings : styles.hideSettings ]}>
                <div style={[ styles.sidiingsContainer ]}>
                    <div style={[ styles.settingsItem, {backgroundColor: '#f6f6f6'} ]}>---- Sidings ----</div>
                    {getSidings}
                    <form onSubmit={this.props.addNewStyle} style={[ styles.styleForm ]}>
                        <input 
                            style={[ styles.styleInput ]}
                            type="text"
                            placeholder="add new style..." 
                            value={this.props.newStyleInputText}
                            onChange={this.props.onChangeStyleInputText}
                            />
                    </form>
                </div>
                <div style={[ styles.sidiingsContainer ]}>
                    <div style={[ styles.settingsItem, {backgroundColor: '#f6f6f6'} ]}>---- Materials ----</div>
                    {getMaterials}
                    <form onSubmit={this.props.addNewMaterial} style={[ styles.styleForm ]}>
                        <input 
                            style={[ styles.styleInput ]}
                            type="text"
                            placeholder="add new material..." 
                            value={this.props.newMaterialInputText}
                            onChange={this.props.onChangeMaterialInputText}
                            />
                    </form>
                </div>
            </div>
        );
    }
});

Settings = Radium(Settings);

export default Settings;