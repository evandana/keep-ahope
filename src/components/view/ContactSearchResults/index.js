import React, { Component } from 'react';

import { getImageForEnv } from 'static/images/index'

class ContactInfo extends Component {

    render() {

        const { contactUidEntry } = this.props;
    
        return (
            <div className='page'>
                
                <h2>Contact Search Results</h2>

                <pre>contactUidEntry: <span style={{color:'red'}}>{contactUidEntry}</span></pre>

                <a href="/contact/abc123/intake">go to some contact intake</a>
                
            </div>
        );
    }
}

export default ContactInfo;
