import React from 'react';

import { Chart } from 'react-google-charts';

import { Card, CardActions, CardHeader, CardText, CardMedia } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { getImageForEnv } from 'static/images/index'

class Results extends React.Component {

    constructor(props) {
        super(props);
    }
    
    convertDataToGoogleFormat({data, xLabel, yLabel}) {

        return [
            [ xLabel, yLabel ],
            ...data.map(series => {
                return [series.label, parseInt(series.count, 10)];
            })
        ];
    }

    render() {

        const {
            data,
            hSize,
            label,
            path,
            priority,
            type,
            // vSize,
        } = this.props;

        const reportsCardCols = [
            'col-xs-6 col-sm-3 col-md-2 col-lg-1',
            'col-xs-12 col-sm-6 col-md-4 col-lg-2',
            'col-xs-12 col-sm-9 col-md-6 col-lg-3',
        ];

        const value = path.split('.').reduce((o, i) => {
            return !!o && o[i] !== undefined ? o[i] : null;
        }, data);

        if (!value) {
            return <span>unable to load KPI</span>;
        }

        return (
            <div
                className={reportsCardCols[hSize - 1]}
                style={{ marginBottom: '1rem' }}
            >
                <Card
                    className='box'
                    style={{ background: '#f4f4f4', boxShadow: 'none' }}
                >
                    <CardHeader
                        title={label}
                        style={{
                            paddingBottom: '4px',
                            width: '100%',
                        }}
                        textStyle={{
                            paddingRight: 0,
                            width: '100%',
                        }}
                        titleStyle={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '100%',
                        }}
                    />
                    {type === 'simple' && (
                        <CardText
                            style={{
                                fontSize: '5em',
                                fontWeight: '800',
                                padding: '4px',
                                display: 'flex', justifyContent: 'center',
                                width: '100%',
                            }}
                        >
                            <span
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {value}
                            </span>
                        </CardText>
                    )}
                    {type === 'breakdown' && (
                        <CardMedia
                            style={{ background: '#f4f4f4' }}
                        >
                            <Chart
                                chartType="BarChart"
                                data={this.convertDataToGoogleFormat({
                                    data: value, 
                                    xLabel: 'Count',
                                    yLabel: label,
                                })}
                                options={{
                                    legend: {position: 'none'},
                                    backgroundColor: {
                                        fill: '#F4F4F4',
                                        opacity: 100
                                    },
                                    colors: ['#888', '#aaa']
                                }}
                                graph_id={'BarChart'+label.replace(' ','')}
                                width="100%"
                                height="110px"
                                legend_toggle
                                />
                        </CardMedia>
                    )}
                </Card>
            </div>
        );
    }
}

export default Results;
