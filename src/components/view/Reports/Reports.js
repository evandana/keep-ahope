import React from 'react';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ReportsCard from './ReportsCard'

import { getImageForEnv } from 'static/images/index'

import { fetchReportsData } from 'actions'
import reports from 'sagas/reports';

// import {
//     RANGE_CURRENT_WEEK,
//     RANGE_PREVIOUS_WEEK,
//     RANGE_CURRENT_YEAR,
//     RANGE_PREVIOUS_YEAR,
// } from 'constants'

const RANGE_CURRENT_WEEK = 'currentweek';
const RANGE_PREVIOUS_WEEK = 'previousweek';
const RANGE_CURRENT_YEAR = 'currentyear';
const RANGE_PREVIOUS_YEAR = 'previousyear';

class Results extends React.Component {

    constructor(props) {
        super(props);

        const { dispatch } = props;
        
        this.dateRangeChange = this.dateRangeChange.bind(this);

        this.state = {
            dateRange: RANGE_CURRENT_WEEK,
            fetchingInProgress: ''
        };

        dispatch(fetchReportsData({ dateRange: this.state.dateRange }));
    }
    
    dateRangeChange = (event, index, dateRange) => {

        const { dispatch } = this.props;

        this.setState({
            dateRange
        });

        dispatch(fetchReportsData({ dateRange }));
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
                            <MenuItem value={RANGE_CURRENT_WEEK} label="Current Week" primaryText="Current Week" />
                            <MenuItem value={RANGE_PREVIOUS_WEEK} label="Previous Week" primaryText="Previous Week" />
                            <MenuItem value={RANGE_CURRENT_YEAR} label="Current Year" primaryText="Current Year" />
                            <MenuItem value={RANGE_PREVIOUS_YEAR} label="Previous Year" primaryText="Previous Year" />
                        </SelectField>
                    </div>

                    <section className="row" style={{marginTop:'2em'}}>

                        <ReportsCard
                            type='simple'
                            hSize={2}
                            label='Total Contacts Served (All Time)'
                            path='contacts._meta.unfilteredCount'
                            data={reportsData}
                            />

                        <ReportsCard
                            type='simple'
                            hSize={2}
                            label='Total Events Served (All Time)'
                            path='events._meta.unfilteredCount'
                            data={reportsData}
                            />

                        <ReportsCard
                            type='simple'
                            hSize={1}
                            label='Contact Events'
                            path='events._meta.count'
                            data={reportsData}
                            />

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
                            label='Syringes Given'
                            path='events.syringesGiven'
                            data={reportsData}
                            />

                        <ReportsCard
                            type='simple'
                            hSize={1}
                            label='Syringes Taken'
                            path='events.syringesTaken'
                            data={reportsData}
                            />

                        <ReportsCard
                            type='simple'
                            hSize={1}
                            label='Narcan Offered'
                            path='events.narcanWasOffered'
                            data={reportsData}
                            />

                        <ReportsCard
                            type='simple'
                            hSize={1}
                            label='Narcan Taken'
                            path='events.narcanWasTaken'
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

                        <ReportsCard
                            type='breakdown'
                            hSize={2}
                            label='Ethnicity'
                            path='contacts.ethnicity'
                            data={reportsData}
                            />

                        <ReportsCard
                            type='breakdown'
                            hSize={2}
                            label='Is Hispanic'
                            path='contacts.hispanic'
                            data={reportsData}
                            />

                    </section>

                </div>
            </div>
        );
    }
}

export default Results;
