import React, { Component } from 'react'

import { Card, CardTitle } from 'material-ui/Card';


class StandardQuestionsForm extends Component {

    constructor(props) {
        super(props);
        this.buildSelectField = this.props.buildSelectField.bind(this);
    };

    render() {
        const referralSelectOptionsList = [
            {primaryText: 'No Referrals', value: null},
            {primaryText: 'Referrals', value: 'some list of referrals'},
        ];
        return (
            <Card>
                <CardTitle title='Standard' titleColor={this.props.palette.primary1Color}/>
                <div style={{padding: '2rem'}}>
                    {this.buildSelectField('Referral', referralSelectOptionsList, 'referral', this.props.handleSelectChange)}
                </div>
            </Card>
        )
    }
}

export default StandardQuestionsForm;
