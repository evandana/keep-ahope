import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ReportsCard from './ReportsCard'

import { getImageForEnv } from 'static/images/index'

import { fetchReportsData } from 'actions'
import reports from '../../../sagas/reports';

class Results extends React.Component {

    constructor(props) {
        super(props);

        this.dateRangeChange = this.dateRangeChange.bind(this);

        this.state = {
            dateRange: 1,
            fetchingInProgress: ''
        };

        window._UI_STORE_.dispatch(fetchReportsData());
    }

    dateRangeChange = (event, index, value) => {
        this.setState({
            dateRange: value
        });
    }

    render () {

        const { reportsData } = this.props;

        // For chart KPIs
        // const breakdownKpis = [
        //     'birthCountry',
        //     'ethnicity',
        //     'firstInjectionAge',
        //     'genderIdentity',
        //     'hispanic'
        // ]

        return (
            <div className="page">
                <div className="text-content">
                
                    <div style={{display:'flex', alignItems:'center'}}>
                        Metrics from: 
                        &nbsp;
                        <SelectField value={this.state.dateRange} onChange={this.dateRangeChange}>
                            <MenuItem value={1} label="Current Week" primaryText="Current Week" />
                            <MenuItem value={2} label="Previous Week" primaryText="Previous Week" />
                            <MenuItem value={3} label="Current Year" primaryText="Current Year" />
                            <MenuItem value={4} label="Previous Year" primaryText="Previous Year" />
                        </SelectField>
                    </div>

                    <section className="row" style={{marginTop:'2em'}}>

                        <ReportsCard
                            type='simple'
                            hSize={1}
                            label='Contacts Served'
                            path='contacts._meta.count'
                            data={reportsData}
                            />

                        <ReportsCard
                            type='simple'
                            hSize={1}
                            label='Total Contacts Served (All Time)'
                            path='contacts._meta.unfilteredCount'
                            data={reportsData}
                            />

                        <ReportsCard
                            type='breakdown'
                            hSize={2}
                            label='Country of Birth'
                            path='contacts.birthCountry'
                            data={reportsData}
                            />

                        <ReportsCard
                            type='breakdown'
                            hSize={2}
                            label='Gender Identity'
                            path='contacts.genderIdentity'
                            data={reportsData}
                            />

                        {/* <ReportsCard
                            size={2}
                            priority={1}
                            label='Much Longer Name'
                            value='23423'
                            />

                        <ReportsCard
                            size={3}
                            priority={1}
                            label='Much Longer Name'
                            value='23423'
                            />

                        <ReportsCard
                            size={1}
                            priority={1}
                            label='Shorty'
                            value='12'
                            /> */}

                    </section>

                </div>
            </div>
        );
    }
}

export default Results;
