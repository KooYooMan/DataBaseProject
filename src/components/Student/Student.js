import React from 'react';
import {connect} from 'react-redux';
import actions from '../../actions/index-screen-actions';
import './Student.scss';

class BackButton extends React.Component {
    render() {
        return (
            <div className="back-button-container">
                <a className="back-button" onClick={this.props.homeScreen}>
                    <i className="button__icon fa fa-arrow-left" style={{padding: '5px'}}></i>
                    <span className="button__text">Back</span>
                </a>
            </div>
        );
    }
  }
  
  const Suggestion = (props) => {
    if(props.currentInput === "maMH"){
      var renderList = props.list.map(value => (
          <button onClick={() => props.changeInput(value)} className="button-suggest">{value.classID + " - " + value.className}</button>
      ))
    }
      return (   
            <div className="suggestion_flex" style={{overflowY: 'scroll'}}>
                {renderList}
            </div>
          // </div>
      );
    
  }
  
  const SuggestionTH = (props) => {
    if(props.currentInput === "lopTH"){
      console.log(props.list);
      var renderList = props.list.map(value => (
          <button onClick={() => props.changeInput(value)} className="button-suggest">{value.group === "CL"? "None" : value.group}</button>
       ))
    }
  
     return (    
            <div className="suggestion_flex" style={{overflowY: 'scroll'}}>
                {renderList}
            </div>
          // </div>
      );
    
  }
  
  class Student extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    state={
      currentInput: '',
      maSV: '',
      maMH: '',
      tenMH: '',
      lopTH: '',
      listSchedule: [], //tong hop dong cut :) 
      listSuggestion: [],
      temp: [],
      listThucHanh: [],
      users: [
        {
          id: 0,
          maMH: "INTaaaa",
          tenMH: "testName1",
          lopTH: 1
        },
        {
          id: 1,
          maMH: "INTbbbb",
          tenMH: "testName2",
          lopTH: 2
        },
      ],
    };
  
    makeListTH = (value) => {
      var list = this.state.listSchedule.filter(item => {
          return (
              item.classID === value
            )
          }
      )
      this.setState({
        listThucHanh: list,
      })
    }
  
    changeInput = (item) => { //xoa suggestion
      this.setState({
          listSuggestion: [],
      })
  
      if(this.state.currentInput === "maMH"){
        this.setState({
          maMH: item.classID,
          tenMH: item.className,
          lopTH: "",
          currentInput: "lopTH",
        })
        this.makeListTH(item.classID);
      }
      else{
        this.setState({
          lopTH: item.group === "CL" ? "None" : item.group,
          listThucHanh: [],
        })
      }
      //this.nameInput.current.focus(); 
    }
  
    componentDidMount() { //GET data
      fetch('https://uet-schedule.herokuapp.com/schedule/getAll')
      .then((result) => result.json())
      .then(
          (result) => {
              this.setState({
                  listSchedule: result.scheduleList
              })
              //alert(this.state.listSchedule[0]);
          }
      ).catch(err => {
          alert('bu cu');
      })
  }
  
    deleteUser = (key) => {
      let { users } = this.state;
      users.splice(key, 1);
      this.setState({
        users: [...users]
      });
    };
    
  
    handleChange(event){
      event.preventDefault()
          var text = event.target.value;
          this.setState({
            [event.target.name]: text,
            currentInput: event.target.name
          });
  
           if(this.state.currentInput === "lopTH" ){
              console.log("test");
              this.makeListTH(this.state.maMH);
           }
          // if(text !== "") {var subtext = text.toString().toLowerCase();}
          const list = this.state.listSchedule.filter(value => {
            if(value.classID != null) var subClassID = value.classID.toString().toLowerCase();
            if(value.className != null) var subClassName = value.className.toString().toLowerCase();
            if(text != null) var subText = text.toString().toLowerCase();
              return (
                   subClassID.includes(subText) || subClassName.includes(subText)
              )
          })
  
          var reducedList = Object.values(list.reduce((r,o) => {
              r[o.classID] = o;
              return r;
              },{}
            )
          );
  
          if(reducedList.length <= 20) {
              this.setState({
                listSuggestion: reducedList
              })
          }
          else {
              this.setState({
                listSuggestion: []
              })
          }
  
    }
  
    resetFormState(){
      document.querySelector('input[name=maMH]').value = "";
      this.setState({
        maMH: '',
        lopTH: '',
        tenMH: '',
      });
   };
  
    handleSubmit(event){
      event.preventDefault();
      const maMH = this.state.maMH;
      const lopTH = this.state.lopTH;
      const tenMH = this.state.tenMH;
      console.log(maMH + "???");
      console.log(lopTH);
  
      if(this.state.users.length !== 0){
        this.setState({
          
          users: [
            ...this.state.users,
            {
              id: this.state.users[this.state.users.length - 1].id + 1,
              maMH,
              tenMH,
              lopTH,
            },
          ]
        });
      }
      else{
        this.setState({
          users: [
            ...this.state.users,
            {
              id: 0,
              maMH,
              tenMH,
              lopTH,
            },
          ]
        });
     }
     this.resetFormState();
    }
  
    render() {
      return (
      <div className="screen">
        <BackButton 
          homeScreen={this.props.homeScreen}
        />
        <div className="screen_container">
          <form onSubmit={this.handleSubmit}>
            <div className="container">
            <h1 style={{textAlign: 'center'}} >Course Search</h1>
              <div className="input_flex">
                <input type="text" value = {this.state.maSV} placeholder="Nhập mã sinh viên" name="maSV" onChange={this.handleChange} required/>
                <input type="text" value = {this.state.maMH} placeholder="Nhập mã/tên môn học" name="maMH" onChange={this.handleChange} required/>
                <div>
                  <Suggestion 
                    currentInput = {this.state.currentInput}
                    list = {this.state.listSuggestion} 
                    changeInput={this.changeInput}
                  />
                </div>
                <input type="text" value = {this.state.lopTH} placeholder="Nhập mã lớp thực hành" name="lopTH" onChange={this.handleChange} required/>
                <div>
                <SuggestionTH
                  currentInput = {this.state.currentInput}
                  list = {this.state.listThucHanh} 
                  changeInput={this.changeInput}
  
                />
              </div>
              </div>
              
              <button type="submit" className="button-add">Thêm</button>
              </div>
            </form>
          <div className="table_flex">
            <Table
                  users={this.state.users}
                  deleteUser={this.deleteUser}
              />
              <button type="submit" className="button-submit" >Tạo TKB</button>
            </div>
          </div>
        </div>
      );
    };
  }
  
  
  const Table = ({users = [], deleteUser}) => {
    return (
       <div className="table">
          <div className="table-header">
             <div className="row">
                <div className="column">Mã môn học</div>
                <div className="column">Tên môn học</div>
                <div className="column">Lớp TH</div>
                <div className="column">Lựa chọn</div>
             </div>
          </div>
          <div className="table-body">
             {users.map((user, key) => {
                return (
                   <div className="row">
                      <div className="column">{user.maMH}</div>
                      <div className="column">{user.tenMH}</div>
                      <div className="column">{user.lopTH}</div>
                      <div className="column">
                         <button className="icon">
                            <i
                              class="fas fa-user-minus"
                              onClick={() => deleteUser(key)}
                            />
                         </button>
                      </div>
                   </div>
                );
             })}
          </div>
       </div>
    );
  };

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        homeScreen: () => dispatch(actions.homeScreen)
    }
}

export default connect(null, mapDispatchToProps)(Student);