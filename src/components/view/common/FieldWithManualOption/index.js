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
                    value={(!defaultFieldProps.val || !defaultFieldProps.val.length || 'string' === typeof defaultFieldProps.val) ? defaultFieldProps.val : defaultFieldProps.val.filter( anyVal => { // here, show anything not in valid list
                        return defaultFieldProps.validOptionsList.findIndex( validOption => validOption === anyVal ) < 0;
                    })}
                    onChange={(e, value) => onManualChange({manualVal: value, defaultFieldVal: defaultFieldProps.val})}
                    />}
            </div>
        );
    }
}
