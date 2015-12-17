import React from 'react';

const Radium = require('radium');

let LoginDialog = React.createClass({
    render() {
        let styles = {
            loginContainer: {
                position: 'fixed',
                transform: 'translateX(-50%) translateY(-50%)',
                height: '180px',
                width: '300px',
                backgroundColor: 'white',
                border: '1px dashed black',
                zIndex: '100',
                boxShadow: '0 0 25px 0 rgba(0,0,0,.3)',
                transition: 'all 700ms cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            },
            errorAnimation: {
                animation: `${loginErrorAnimation} 300ms ease forwards`,
                boxShadow: '0 0 25px 0 #EF9A9A'
            },
            showLogin: {
                top: '50%',
                left: '50%',
            },
            hideLogin: {
                top: '-50%',
                left: '50%',
            },
            header: {
                position: 'relative',
                width: '100%',
                height: '40px',
                fontSize: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderBottom: '1px dashed black'
            },
            form: {
                height: '140px',
                width: '100%'
            },
            bodyContainer: {
                height: '70%',
                width: '100%',
                display: 'flex'
            },
            labelContainer: {
                height: '100%',
                flexGrow: '2',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                flexDirection: 'column'
            },
            inputContainer: {
                height: '100%',
                flexGrow: '3',
                paddingLeft: '5px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                flexDirection: 'column'
            },
            buttonContainer: {
                height: '30%',
                width: '95%',
                paddingTop: '5px',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'flex-end'
            },
            submitBtn: {
                height: '20px',
                width: '50px',
                marginLeft: '10px',
                backgroundColor: 'white',
                border: '1px dashed black',
                transition: 'all 100ms ease',
                ':hover': {
                    cursor: 'pointer',
                    backgroundColor: '#C5E1A5'
                }
            },
            cancelBtn: {
                height: '20px',
                width: '50px',
                backgroundColor: 'white',
                border: '1px dashed black',
                transition: 'all 100ms ease',
                ':hover': {
                    cursor: 'pointer',
                    backgroundColor: '#EF9A9A'
                }
            },
            cancelXContainer: {
                position: 'absolute',
                top: '10px',
                right: '10px',
                height: '20px',
                width: '20px',
                transition: 'all 200ms ease',
                ':hover': {
                    transform: 'rotate(-90deg)',
                    cursor: 'pointer'
                }
            },
            cancelX: {
                position: 'absolute',
                height: '100%',
                bottom: '0',
                left: '10px',
                transition: 'all 100ms ease'
            },
            crossLeft: {
                transform: 'rotate(45deg)',
            },
            crossRight: {
                transform: 'rotate(-45deg)',
            }

        };
        return (
            <div style={[ styles.loginContainer, this.props.attemptingLogin ? styles.showLogin : styles.hideLogin, this.props.loginError && styles.errorAnimation ]}>
                <div style={[ styles.header ]}>
                    <div>Login</div>
                    <div 
                        key="cancelXContainer" 
                        style={[ styles.cancelXContainer ]}
                        onClick={this.props.cancelLogin}
                    >
                        <div 
                            key="crossLeft" 
                            style={[ 
                                styles.cancelX, 
                                styles.crossLeft, 
                                Radium.getState(this.state, 'cancelXContainer', ':hover') ? {border: '1px solid #EF9A9A'} : {border: '1px solid black'} 
                            ]}
                        ></div>
                        <div 
                            key="crossRight" 
                            style={[ 
                                styles.cancelX, 
                                styles.crossRight, 
                                Radium.getState(this.state, 'cancelXContainer', ':hover') ? {border: '1px solid #EF9A9A'} : {border: '1px solid black'} 
                            ]}
                        ></div>
                    </div>
                </div>
                <form style={[ styles.form ]} onSubmit={this.props.submitLogin}>
                    <div style={[ styles.bodyContainer ]}>
                        <div style={[ styles.labelContainer ]}>
                            <div style={{marginBottom: '5px'}}>Email:</div>
                            <div>Password:</div>
                        </div>
                        <div style={[ styles.inputContainer ]}>
                            <input 
                                type="text" 
                                style={{marginBottom: '5px'}} 
                                onChange={this.props.onChangeEmailInputText}
                                value={this.props.emailInputText}
                            />
                            <input 
                                type="password" 
                                onChange={this.props.onChangePasswordInputText}
                                value={this.props.passwordInputText}
                            />
                        </div>
                    </div>
                    <div style={[ styles.buttonContainer ]}>
                        <button 
                            key="cancelBTN" 
                            style={[ styles.cancelBtn ]}
                            onClick={this.props.cancelLogin}
                        >
                            cancel
                        </button>
                        <button 
                            type="submit"
                            style={[ styles.submitBtn ]}
                            key="subbtn58886748"
                        >
                            submit
                        </button>
                    </div>
                </form>
            </div>
        );
    }
});

let loginErrorAnimation = Radium.keyframes({
  '0%': {left: '45%'},
  '50%': {left: '55%'},
  '100%': {left: '50%'},
}, 'LoginDialog');

LoginDialog = Radium(LoginDialog);

export default LoginDialog;





