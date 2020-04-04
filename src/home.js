import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div class="slides_wrapper">
                <div class="slide">
                    <div class="text_wrapper">
                        <div class="container-fluid invite-selector container-equal-heights">
                            <div class="align-center col-sm-6">
                                <div class="row fixed-height">
                                    <div class="invite-block invite--teacher"></div>
                                    <h2><b>Giáo viên</b></h2>
                                    <div class="column-desc">Bạn sẽ có quyền truy cập vào trang cá nhân, trong đó có thể đăng ký các học sinh của mình.</div>
                                </div>
                                <div class="row invite-row">
                                    <a class="invites--button" href="/guests/teachers/new" id="teacher-select-button">
                                        Đăng ký
                                    </a>
                                </div>
                            </div>
                            <div class="align-center col-sm-6">
                                <div class="row fixed-height">
                                    <div class="invite-block invite--parent"></div>
                                    <h2><b>Phụ huynh</b></h2>
                                    <div class="column-desc">
                                        Bạn sẽ có quyền truy cập vào thống kê việc học của con em bạn và có thể theo dõi thành tích của bé.
                                    </div>
                                </div>
                                <div class="row invite-row">
                                    <a class="invites--button" href="/guests/parent/invite" id="parent-select-button">
                                        Đăng ký
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;