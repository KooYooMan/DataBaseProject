import React from 'react';
import WorkingTable from './WorkingTable';
import ExamTable from './ExamTable';

class Table extends React.Component {
    render() {
        switch (this.props.type) {
            case 'Working':
                return (
                    <WorkingTable
                        listSubject={this.props.listSubject}
                    />
                )
            case 'Exam':
                return (
                    <ExamTable
                        listSubject={this.props.listSubject}
                    />
                );
            default:
                return <h1>Error Rendering Table</h1>
        }
    }
}

export default Table;

//rgba(255,255,255,0.3);
//rgba(255,255,255,0.2);