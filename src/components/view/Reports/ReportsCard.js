import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import { getImageForEnv } from 'static/images/index'

class Results extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { label, data, path, size, priority } = this.props;

        const reportsCardCols = [
            'col-xs-6 col-sm-3 col-md-2 col-lg-1',
            'col-xs-12 col-sm-6 col-md-4 col-lg-2',
            'col-xs-12 col-sm-9 col-md-6 col-lg-3',
        ];

        const value = path.split('.').reduce( (o,i) => {
            return !!o && o[i] !== undefined ? o[i] : null;
        }, data);

        if ( !value ) {
            return <span>unable to load KPI</span>;
        }

        return (
            <div
                className={reportsCardCols[size - 1]}
                style={{marginBottom:'1rem'}}
                >
                <Card
                    className='box'
                    style={{background:'#f4f4f4', boxShadow:'none'}}
                    >
                    <CardHeader
                        title={label}
                        style={{
                            paddingBottom:'4px', 
                            width:'100%',
                        }}
                        textStyle={{
                            paddingRight:0,
                            width:'100%',
                        }}
                        titleStyle={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width:'100%',
                        }}
                    />
                    <CardText
                        style={{
                            fontSize:'5em', 
                            fontWeight:'800', 
                            padding:'4px', 
                            display:'flex', justifyContent:'center', 
                            width:'100%',
                        }}
                        >
                        <span
                            style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                            }}
                            >
                            { value }
                        </span>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default Results;
