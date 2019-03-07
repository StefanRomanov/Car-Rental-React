import React, {Component} from 'react';


class Footer extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <footer className="footer-copyright text-center fixed-bottom default-color">
                &copy; Rento, 2019
            </footer>
        )
    }

}

export default Footer;