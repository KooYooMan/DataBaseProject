# Website tạo thời khóa biểu cho sinh viên UET
## Thành viên đóng góp
  * Cao Duy Mạnh - 18020039
  * Vương Tiến Thành - 18021186
  * Lê Thị Hạnh - 18020457
  * Lê Quang Duy - 18020413
### 1. Chức năng trang web
  * Tạo, sửa đổi và tra cứu thời khóa biểu, lịch bằng mã lớp học cho sinh viên
  * Tra cứu lịch dạy của giảng viên
### 2. Cơ sở dữ liệu
  ![ERD](https://i.imgur.com/fObau4b.png)
### 3. Truy vấn cơ sở dữ liệu
* Giảng viên
  * Lấy toàn bộ danh sách giảng viên
  ~~~
  select lecturerName from lecturers
  ~~~
  * Lấy lịch dạy cho giảng viên theo tên
  ~~~
  select s.*
    from schedules as s
    join lecturers as l on l.lecturerID = s.lecturerID
    where l.lecturerName = "${lecturerName}"
  ~~~
* Học sinh
  * Lấy thời khóa biểu theo mã sinh viên
  ~~~
  select s.*
  from schedules as s
  join enrolllist as e on s.classID = e.classID and s.`group` = e.`group`\n"
  where e.studentID = "${studentID}"
  ~~~
  * Xóa danh sách lớp học đã đăng ký theo mã sinh viên
  ~~~
  delete from enrolllist where studentID=${studentID}
  ~~~
  * Nhập danh sách lớp học đã đăng ký
  ~~~
  const submitEnrollList = (studentID, enrollList, callback) => {
  let query = "insert into enrolllist values\n";

  enrollList.forEach(({ classID, group }) => {
    query += `("${studentID}", "${classID}", "${group}"),`;
  });
  query = query.substr(0, query.length - 1);
  query += ";";

  db().query(query, callback);
  };
  ~~~
  * Lấy lịch thi theo mã sinh viên
  ~~~
  select distinct es.*
  from examschedule as es
  join enrolllist as e on es.classID = e.classID 
  where e.studentID = "${studentID}";
  ~~~
  
* Lấy toàn bộ danh sách lịch thi
~~~ 
select * from examschedule
~~~

* Lấy toàn bộ danh sách thời khóa biểu
~~~
select * from schedules
~~~
  
