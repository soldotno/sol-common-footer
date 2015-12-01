'use strict';

var React = require('react');
var isBrowser = require('is-client');
var classMap = require('solskinn-common').helpers.classMap;
var configuration = require('./configuration');

var Footer = React.createClass({
    displayName: 'Footer',
    getDefaultProps: function getDefaultProps() {
        return {
            footer_adresse: '',
            footer_ansvarlig_redaktor_navn: '',
            footer_ansvarlig_redaktor_epost: '',
            footer_redaktor_navn: '',
            footer_redaktor_epost: '',
            footer_vaktsjef: 'Kontakt redaksjonen|redaksjonen@sol.no',
            cookie_url: '',
            contact_url: '',
            advertise_url: '',
            about_url: '',
            configurationConfig: {
                baseUrl: '',
                requestTimeout: 2 // in seconds
            }
        }; //  http://localhost:4444/configuration/
    },
    getInitialState: function getInitialState() {
        return this.cleanData(this.props);
    },
    cleanData: function cleanData(data) {
        var mailtoPrefix = 'FJERNDETTE';
        var headOfDesk = data.footer_vaktsjef.split('|');

        return {
            editorInChief: {
                name: data.footer_ansvarlig_redaktor_navn,
                email: mailtoPrefix + data.footer_ansvarlig_redaktor_epost
            },
            editor: {
                name: data.footer_redaktor_navn,
                email: mailtoPrefix + data.footer_redaktor_epost
            },
            headOfDesk: {
                name: headOfDesk[0],
                email: mailtoPrefix + headOfDesk[1]
            },
            address: data.footer_adresse,
            url: {
                cookie: data.cookie_url,
                contact: data.contact_url,
                advertise: data.advertise_url,
                about: data.about_url
            }
        };
    },
    loadFooterData: function loadFooterData() {
        var _this = this;

        if (!isBrowser) return;
        if (!this.props.configurationConfig.baseUrl) return;

        configuration(this.props.configurationConfig, function (err, result) {
            if (err) {
                console.log('ERR: ', err);
                return;
            }
            var cleanedData = _this.cleanData(result.site);
            _this.setState(cleanedData);
            console.log('JIM: ', result);
        });
    },
    componentDidMount: function componentDidMount() {
        this.loadFooterData();
    },
    render: function render() {
        var _state = this.state;
        var editor = _state.editor;
        var editorInChief = _state.editorInChief;
        var headOfDesk = _state.headOfDesk;
        var address = _state.address;
        var url = _state.url;

        return React.createElement(
            'footer',
            { className: classMap.footer },
            React.createElement(
                'h3',
                { className: classMap.footerLogo },
                'SOL.no'
            ),
            React.createElement(
                'ul',
                { className: classMap.footerInfo },
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'h3',
                        { className: classMap.address },
                        address
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'h3',
                        { className: classMap.description },
                        'Ansvarlig redaktør:'
                    ),
                    React.createElement(
                        'h3',
                        { className: classMap.content },
                        React.createElement(
                            'a',
                            { href: 'mailto:' + editorInChief.email },
                            editorInChief.name
                        )
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'h3',
                        { className: classMap.description },
                        'Redaktør:'
                    ),
                    React.createElement(
                        'h3',
                        { className: classMap.content },
                        React.createElement(
                            'a',
                            { href: 'mailto:' + editor.email },
                            editor.name
                        )
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'h3',
                        { className: classMap.description },
                        'Vaktsjef nå:'
                    ),
                    React.createElement(
                        'h3',
                        { className: classMap.content },
                        React.createElement(
                            'a',
                            { href: 'mailto:' + headOfDesk.email },
                            headOfDesk.name
                        )
                    )
                )
            ),
            React.createElement(
                'ul',
                { className: classMap.footerLinks },
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'h3',
                        { className: classMap.content },
                        React.createElement(
                            'a',
                            { href: url.about },
                            'Om SOL'
                        )
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'h3',
                        { className: classMap.content },
                        React.createElement(
                            'a',
                            { href: url.contact },
                            'Kontakt oss'
                        )
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'h3',
                        { className: classMap.content },
                        React.createElement(
                            'a',
                            { href: url.advertise },
                            'Annonsere'
                        )
                    )
                ),
                React.createElement(
                    'li',
                    null,
                    React.createElement(
                        'h3',
                        { className: classMap.content },
                        React.createElement(
                            'a',
                            { href: url.cookie },
                            'Om cookies'
                        )
                    )
                )
            )
        );
    }
});

module.exports = Footer;