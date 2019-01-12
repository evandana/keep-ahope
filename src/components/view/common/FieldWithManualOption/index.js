import React, { Component } from 'react';

import TextField from 'material-ui/TextField';

export class FieldWithManualOption extends Component {

    render() {

        const { showManual, defaultFieldEl, defaultFieldProps, onManualChange } = this.props;

        return (
            <div>
                {defaultFieldEl}
                {showManual && <TextField
                    key={defaultFieldProps.title.replace(' ','') + "Manual"}
                    id={defaultFieldProps.title.replace(' ','') + "Manual"}
                    floatingLabelText={defaultFieldProps.title + ": Other"}
                    // value={defaultFieldProps.val}
                    onChange={(e, value) => onManualChange({manualVal: value, defaultFieldVal: defaultFieldProps.val})}
                    />}
            </div>
        );
    }
}
