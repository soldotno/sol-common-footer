const React = require('react');
const isBrowser = require('is-client');

const classMap = require('solskinn-common').helpers.classMap;
const configuration = require('./configuration');

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
      contact_url: '',
      advertise_url: '',
      about_url: '',
      configurationConfig: {
        baseUrl: ''
      }
    };
  },

  getInitialState() {
    return this.cleanData(this.props);
  },

  cleanData(data) {
    const mailtoPrefix = 'FJERNDETTE';
    const headOfDesk = data.footer_vaktsjef.split('|');

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

  loadFooterData() {
    if (!isBrowser) return;
    if (!this.props.configurationConfig.baseUrl) return;

    configuration(this.props.configurationConfig, (err, result) => {
      if (err) {
        console.log('ERR: ', err);
        return;
      }
      let cleanedData = this.cleanData(result.site);
      this.setState(cleanedData);
    });
  },

  componentDidMount() {
    this.loadFooterData();
  },

  render() {
    const {
      editor,
      editorInChief,
      headOfDesk,
      address,
      url,
    } = this.state;

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
              <a href={'mailto:' + headOfDesk.email}>
                {headOfDesk.name}
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
              <a href={url.advertise}>
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
