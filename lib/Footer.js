const React = require('react');
const classMap = require('solskinn-common').helpers.classMap;

const Footer = React.createClass({
    getDefaultProps() {
        return {
            footer_adresse: '',
            footer_ansvarlig_redaktor_navn: '',
            footer_ansvarlig_redaktor_epost: '',
            footer_redaktor_navn: '',
            footer_redaktor_epost: '',
            footer_vaktsjef: 'Kontakt redaksjonen|redaksjonen@sol.no',
            cookie_url: '',
            kontakt_oss_url: '',
            annonse_url: '',
            om_oss_url: ''
        };
    },

    reorderData(data) {
        const mailtoGarbage = 'FJERNDETTE';
        const onCall = data.footer_vaktsjef.split('|');

        return {
            editorInChief: {
                name: data.footer_ansvarlig_redaktor_navn,
                email: mailtoGarbage + data.footer_ansvarlig_redaktor_epost
            },
            editor: {
                name: data.footer_redaktor_epost,
                email: mailtoGarbage + data.footer_redaktor_navn
            },
            onCall: {
                name: onCall[0],
                email: mailtoGarbage + onCall[1]
            },
            address: data.footer_adresse,
            url: {
                cookie: data.cookie_url,
                contact: data.kontakt_oss_url,
                ads: data.annonse_url,
                about: data.om_oss_url
            }
        };
    },

    render() {
        const {
            editor,
            editorInChief,
            onCall,
            address,
            url,
            } = this.reorderData(this.props);

        return (
            <footer className={classMap.footer}>
                <h3 className={classMap.footerLogo}>SOL.no</h3>

                <ul className={classMap.footerInfo}>
                    <li>
                        <h3 className={classMap.address}>
                            {address}
                        </h3>
                    </li>
                    <li>
                        <h3 className={classMap.description}>
                            {'Ansvarlig redaktør:'}
                        </h3>
                        <h3 className={classMap.content}>
                            <a href={'mailto:' + editorInChief.email}>
                                {editorInChief.name}
                            </a>
                        </h3>
                    </li>
                    <li>
                        <h3 className={classMap.description}>
                            {'Redaktør:'}
                        </h3>
                        <h3 className={classMap.content}>
                            <a href={'mailto:' + editor.email}>
                                {editor.name}
                            </a>
                        </h3>
                    </li>
                    <li>
                        <h3 className={classMap.description}>
                            {'Vaktsjef nå:'}
                        </h3>
                        <h3 className={classMap.content}>
                            <a href={'mailto:' + onCall.email}>
                                {onCall.name}
                            </a>
                        </h3>
                    </li>
                </ul>

                <ul className={classMap.footerLinks}>
                    <li>
                        <h3 className={classMap.content}>
                            <a href={url.about}>
                                {'Om SOL'}
                            </a>
                        </h3>
                    </li>
                    <li>
                        <h3 className={classMap.content}>
                            <a href={url.contact}>
                                {'Kontakt oss'}
                            </a>
                        </h3>
                    </li>
                    <li>
                        <h3 className={classMap.content}>
                            <a href={url.ads}>
                                {'Annonsere'}
                            </a>
                        </h3>
                    </li>
                    <li>
                        <h3 className={classMap.content}>
                            <a href={url.cookie}>
                                {'Om cookies'}
                            </a>
                        </h3>
                    </li>
                </ul>
            </footer>
        );
    }
});

module.exports = Footer;
