import React from 'react';
import LoginDialog from './LoginDialog';
const Radium = require('radium');

let Header = React.createClass({
    render() {
        let styles = {
            header: {
                position: 'fixed',
                top: '0',
                left: '0',
                height: '70px',
                width: '100%',
                display: 'flex',
                backgroundColor: 'white',
                zIndex: '10'
            },
            welcome: {
                height: '100%',
                flex: '1',
                paddingLeft: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                fontSize: '20px'
            },
            login: {
                height: '100%',
                flex: '1',
                paddingRight: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                fontSize: '16px',
                transition: 'all 100ms ease',
                ':hover': {
                    cursor: 'pointer'
                }
            },
            settingsGear: {
                transition: 'all 2500ms ease',
                ':hover': {
                    transform: 'rotate(-360deg)'
                }
            }
        }
        return (
            <div style={[ styles.header ]}>
                <div style={[ styles.welcome ]}>Welcome</div>
                <div 
                    style={[ styles.login, this.props.loggedIn && {display: 'none'} ]} 
                    key="login8765678"
                    onClick={this.props.attemptLogin}
                >
                    Login
                </div>
                <div style={[ styles.login, !this.props.loggedIn && {display: 'none'} ]}>
                    <img 
                        key="settingsGear" 
                        style={[ styles.settingsGear ]} 
                        onClick={this.props.toggleSettings} 
                        height="19px" 
                        src="/images/gear.svg" 
                    />
                    <div 
                        key="logout8765678"
                        onClick={this.props.logout}
                        style={{marginLeft: '20px'}}
                    >
                        Logout
                    </div>
                </div>
                <LoginDialog 
                    loginError={this.props.loginError}
                    attemptingLogin={this.props.attemptingLogin}
                    submitLogin={this.props.submitLogin}
                    cancelLogin={this.props.cancelLogin}
                    onChangeEmailInputText={this.props.onChangeEmailInputText}
                    onChangePasswordInputText={this.props.onChangePasswordInputText}
                    passwordInputText={this.props.passwordInputText}
                    emailInputText={this.props.emailInputText}
                />
            </div>
        );
    }
});

Header = Radium(Header);

export default Header;