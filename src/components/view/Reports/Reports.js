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

        return (
            <div className="page">
                <div className="text-content">

                    <pre>reportsData: {JSON.stringify(reportsData)}</pre>
                
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
                            size={1}
                            priority={1}
                            label='Shorty'
                            value='12'
                            />

                        <ReportsCard
                            size={1}
                            priority={1}
                            label='Shorty'
                            value='12'
                            />

                        <ReportsCard
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
                            />

                    </section>

                </div>
            </div>
        );
    }
}

export default Results;
