import React, { Component } from 'react';

import { getImageForEnv } from 'static/images/index'

class ContactInfo extends Component {

    render() {

        const { user, uid, contacts, events } = this.props;
    
        return (
            <div className='page'>
                
                <h2>Contacts</h2>

                <pre>UID from URL: <span style={{color:'red'}}>{uid}</span></pre>
    
                <table>
                    <thead>
                        <tr>
                            <th>uid</th>
                            <th>genderIdentity</th>
                            <th>events</th>
                            <th>firstInjectionAge</th>
                            <th>birthCountry</th>
                            <th>hispanic</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.uid} >
                                <td>{contact.uid}</td>
                                <td>{contact.genderIdentity}</td>
                                <td><pre>{JSON.stringify(contact.events)}</pre></td>
                                <td>{contact.firstInjectionAge}</td>
                                <td>{contact.birthCountry}</td>
                                <td>{contact.hispanic}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                
            </div>
        );
    }
}

export default ContactInfo;
