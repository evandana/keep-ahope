import React, { Component } from 'react';

import { getImageForEnv } from 'static/images/index'

class ContactInfo extends Component {

    render() {

        const { contactUidEntry } = this.props;
    
        return (
            <div className='page'>
                
                <h2>Contact Search Results</h2>

                <pre>contactUidEntry: <span style={{color:'red'}}>{contactUidEntry}</span></pre>

                <ul>
                    <li>
                        Go to <a href={'/contact/'+contactUidEntry+'/intake'}>/contact/{contactUidEntry}/intake</a>
                    </li>
                    <li>
                        Go to <a href={'/contact/'+contactUidEntry+'/info'}>/contact/{contactUidEntry}/info</a>
                    </li>
                </ul>
                
            </div>
        );
    }
}

export default ContactInfo;
