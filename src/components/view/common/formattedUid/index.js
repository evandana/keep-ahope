import React from 'react'
import OpenInNewIcon from 'material-ui/svg-icons/action/open-in-new';
import './formattedUid.css'

const FormattedUid = props => {
    const { contact } = props;

    const icon = props.showIcon ? (
        <OpenInNewIcon 
            style={{
                width: 12,
                height: 12,
                position: 'relative',
                top: '1px'
            }}
        />
    ) : null;

    return (
        <div className="uid">
            <span>{contact.uidSegment1}</span>
            <span>{contact.uidSegment2}</span>
            <span className="slash-after">{contact.uidSegment3}</span>
            <span className="slash-after">{contact.uidSegment4}</span>
            <span>{contact.uidSegment5}</span>
            <span>{contact.uidSegment6}</span>
            {icon}
        </div>
    )
}

export default FormattedUid