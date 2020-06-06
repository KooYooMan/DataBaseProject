import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import store from './store';
import { Provider } from 'react-redux';
import Testing from './testing';
import Schedule from './components/Schedule/Schedule';

var data = [{
    className: 'Dự án',
    classID: 'INT3509 1',
    auditorium: 'K.CNTT',
    shift: 2,
    start: '09h30',
    day: '22/06',
    examType: ''
}, {
    className: 'Mạng máy tính',
    classID: 'INT2209 2',
    auditorium: 'PM (305,307,313)-G2',
    shift: 4,
    start: '15h30',
    day: '24/06',
    examType: 'TTM'
}, {
    className: 'Nhập môn lập trình Robot',
    classID: 'RBE1002 1',
    auditorium: '307-GĐ2',
    shift: 1,
    start: '07h00',
    day: '25/06',
    examType: 'VĐ'
}]

data.type="Exam"

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>
    ,
    document.getElementById('root')
);