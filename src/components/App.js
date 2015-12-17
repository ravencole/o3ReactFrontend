import React from 'react';
import $ from 'jquery';
import Header from './Header';
import Body from './Body';
import Settings from './Settings';

const Radium = require('radium');

let App = React.createClass({
    getInitialState() {
        return {
            loggedIn: false,
            sidings: [],
            materials: [],
            attemptingLogin: false,
            passwordInputText: '',
            emailInputText: '',
            loggedIn: localStorage.getItem('token') ? true : false,
            loginError: false,
            editingSettings: false,
            newStyleInputText: '',
            newMaterialInputText: ''
        }
    },
    componentDidMount() {
        this.updateMaterials();
    },
    attemptLogin() {
        this.setState({ attemptingLogin: true });
    },
    toggleMaterialStyle(e) {
        $.ajax({
            type: 'GET',
            url: `http://localhost:8080/api/material/${e.target.id}`,
            data: {token: localStorage.getItem('token')}
        }).fail(function(err) {
            console.log(err);
        }).done(function() {
            this.updateMaterials();
        }.bind(this));
    },
    submitLogin(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/authenticate',
            data: {email: this.state.emailInputText, password: this.state.passwordInputText}
        }).fail(function(err) {
            if (err.status == 422) return this.setState({ loginError: true, emailInputText: '', passwordInputText: '' });
            console.log(err);
        }.bind(this)).done(function(data) {
            localStorage.setItem('token', data.token);
            this.setState({ 
                passwordInputText: '',
                emailInputText: '',
                attemptingLogin: false,
                loggedIn: true,
                loginError: false
            });
        }.bind(this));
    },
    logout() {
        localStorage.removeItem('token');
        this.setState({ loggedIn: false, editingSettings: false });
    },
    onChangeEmailInputText(e) {
        this.setState({ emailInputText: e.target.value });
    },
    onChangePasswordInputText(e) {
        this.setState({ passwordInputText: e.target.value });
    },
    onChangeStyleInputText(e) {
        this.setState({ newStyleInputText: e.target.value });
    },
    onChangeMaterialInputText(e) {
        this.setState({ newMaterialInputText: e.target.value });
    },
    addNewStyle(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/siding',
            data: {token: localStorage.getItem('token'), name: this.state.newStyleInputText}
        }).fail(function(err) {
            console.log(err);
        }).done(function(data) {
            this.setState({ newStyleInputText: '' });
            this.updateMaterials();
        }.bind(this));
    },
    deleteMaterial(e) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/material/' + e.target.id,
            beforeSend: function(request) {
                request.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
        }).fail(function(err) {
            console.log(err);
        }).done(function(data) {
            this.updateMaterials();
        }.bind(this));
    },
    deleteStyle(e) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:8080/api/siding/' + e.target.id,
            beforeSend: function(request) {
                request.setRequestHeader('x-access-token', localStorage.getItem('token'));
            },
        }).fail(function(err) {
            console.log(err);
        }).done(function(data) {
            this.updateMaterials();
        }.bind(this));
    },
    addNewMaterial(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/api/material',
            data: {token: localStorage.getItem('token'), name: this.state.newMaterialInputText}
        }).fail(function(err) {
            console.log(err);
        }).done(function(data) {
            this.setState({ newMaterialInputText: '' });
            this.updateMaterials();
        }.bind(this));
    },
    cancelLogin(e) {
        e.preventDefault();
        this.setState({ attemptingLogin: false, loginError: false });
    },
    toggleSettings() {
        this.setState({ editingSettings: !this.state.editingSettings });
    },
    updateMaterials() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/api/all'
        }).fail(function(err) {
            console.log(err);
        }).done(function(data) {
            this.setState({ 
                sidings: data.siding,
                materials: data.materials
            });
        }.bind(this));
    },
    render() {
        let styles = {
            main: {
                height: '100%',
                padding: '85px 30px'
            }
        }
        return (
            <div style={[styles.main]}>
                <Header 
                    attemptLogin={this.attemptLogin}
                    attemptingLogin={this.state.attemptingLogin}
                    passwordInputText={this.state.passwordInputText}
                    emailInputText={this.state.emailInputText}
                    loggedIn={this.state.loggedIn}
                    logout={this.logout}
                    loginError={this.state.loginError}
                    submitLogin={this.submitLogin}
                    cancelLogin={this.cancelLogin}
                    onChangeEmailInputText={this.onChangeEmailInputText}
                    onChangePasswordInputText={this.onChangePasswordInputText}
                    toggleSettings={this.toggleSettings}
                />
                <Body 
                    materials={this.state.materials} 
                    sidings={this.state.sidings} 
                    toggleMaterialStyle={this.toggleMaterialStyle}
                    loggedIn={this.state.loggedIn}
                />
                <Settings 
                    editingSettings={this.state.editingSettings}
                    sidings={this.state.sidings}
                    materials={this.state.materials}
                    newStyleInputText={this.state.newStyleInputText}
                    onChangeStyleInputText={this.onChangeStyleInputText}
                    addNewStyle={this.addNewStyle}
                    newMaterialInputText={this.state.newMaterialInputText}
                    onChangeMaterialInputText={this.onChangeMaterialInputText}
                    addNewMaterial={this.addNewMaterial}
                    deleteStyle={this.deleteStyle}
                    deleteMaterial={this.deleteMaterial}
                />
            </div>
        );
    }
});

App = Radium(App);

export default App;






