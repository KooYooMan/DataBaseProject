import React from 'react';

class googleCalendar {
    constructor(credentials) {
        //load dependencies...
        this.gapi = window.gapi;
        this.gapi.load("client:auth2", init.bind(this));
        let cal = this;
        //create call stack...
        this.callStack = {};
        function init() {
            //authorize api access...
            this.gapi.client
                .init({
                    apiKey: credentials.apiKey,
                    clientId: credentials.clientId,
                    scope: credentials.scope,
                    discoveryDocs: credentials.discoveryDocs
                })
                .then(function () {
                    cal.gapi.auth2.getAuthInstance().isSignedIn.listen(updateCallstack);
                    function updateCallstack() {
                        cal.callStack.func(cal.callStack.args);
                    }
                });
        }
    }

    userAuthStatus() {
        if (!this.gapi.auth2.getAuthInstance().isSignedIn.get()) {
            this.gapi.auth2.getAuthInstance().signIn();
        }
        return this.gapi.auth2.getAuthInstance().isSignedIn.get();
    }

    createEvent(events) {
        if (this.userAuthStatus()) {
            events.map(event => {
                let request = this.gapi.client.calendar.events.insert({
                    calendarId: "primary",
                    resource: event
                });
                request.execute(() => {});
            })
            alert("done");
        } else {
            this.callStack.func = this.createEvent.bind(this);
            this.callStack.args = events
        }
    }
}

class Testing extends React.Component {
    componentDidMount() {
        let credentials = {
            scope:
                "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events",
            clientId:
                "314262756986-dphbp3k9g7htuqp4fm3398sof8v66bkr.apps.googleusercontent.com",
            apiKey: "AIzaSyBNTqxm5ivV1wZR24Sq9s9V7VmiRpzz5Is",
            discoveryDocs: [
                "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"
            ]
        };
        window.googleCalendar = new googleCalendar(credentials);
    }

    createEvent() {
        var events = [{
            'summary': 'Google I/O 2015',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2020-06-05T09:00:00+07:00',
                'timeZone': 'Asia/Saigon',
            },
            'end': {
                'dateTime': '2020-06-05T17:00:00+07:00',
                'timeZone': 'Asia/Saigon',
            }
        }, {
            'summary': 'Google I/O 2015',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2020-06-06T09:00:00+07:00',
                'timeZone': 'Asia/Saigon',
            },
            'end': {
                'dateTime': '2020-06-06T17:00:00+07:00',
                'timeZone': 'Asia/Saigon',
            }
        }];
        window.googleCalendar.createEvent(events);
    }

    render() {
        return <button onClick={this.createEvent}>Hello</button>;
    }
}

export default Testing;