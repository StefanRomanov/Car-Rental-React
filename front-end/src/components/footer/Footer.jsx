import React, {Component} from 'react';


class Footer extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <footer className="footer-copyright text-center fixed-bottom bg-info">
                &copy; Rento, 2019
            </footer>
        )
    }

}

export default Footer;