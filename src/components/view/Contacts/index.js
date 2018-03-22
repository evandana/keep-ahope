import React, { Component } from 'react';

import { getImageForEnv } from 'static/images/index'

class Contacts extends Component {

    render() {

        const { user, contacts, events } = this.props;
    
        return (
            <div className='page'>
                
                <h2>Contacts</h2>
    
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

export default Contacts;
