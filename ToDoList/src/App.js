import React, { Component } from 'react';
import './App.css';
import Taskform from './components/Taskform';
import Control from "./components/Control";
import TaskList from "./components/TaskList";

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tasks : [], //id:unique , name , status
            isDisplayForm : false,
            taskEditting : null,
            filter : {
                name :'',
                status : -1
            }
        }
    }

    componentWillMount(){
        if(localStorage && localStorage.getItem('tasks')){
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : tasks
            })
        }
    }

    s4(){ //tạo ra một số random
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    generateID(){
        return this.s4()+ this.s4() + '-' + this.s4() + ' ' +this.s4() +this.s4() +' '+ this.s4();
    }
    onChangeDisplayForm = ()=>{
        if(this.state.isDisplayForm && this.state.taskEditting !== null){
            this.setState({
                isDisplayForm : true,
                taskEditting : null
            })
        }else {
            this.setState({
                isDisplayForm : !this.state.isDisplayForm,
                taskEditting : null
            })
        }
    }
    onCloseForm = ()=>{
        this.setState({
            isDisplayForm : false
        })
    }
    onShowForm = ()=>{
        this.setState({
            isDisplayForm : true
        })
    }
    onSubmit = (data)=>{
        var {tasks} = this.state;
        if(data.id === ''){
            data.id = this.generateID();
            if(data.name !== ''){
                tasks.push(data);
                this.setState({
                    tasks : tasks
                });
            }
        }
        else{
            tasks.forEach((task,index)=>{
                if(task.id === data.id){
                    task.name = data.name;
                    task.status = data.status;
                }
            })
        }
        localStorage.setItem('tasks',JSON.stringify(tasks))
    }
    findIndex =(id)=>{
        var {tasks} = this.state;
        var result = -1;
        tasks.forEach((task,index)=>{
            if(task.id === id) result = index;
        });
        return result;
    }
    onUpdateStatus = (ID)=>{
        var {tasks} = this.state;
        tasks.forEach((task,index)=>{
            if(task.id === ID){
                task.status = !task.status
            }
        })
        this.setState({
            tasks : tasks
        });
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }
    onDeleteItem = (id)=>{
        var index = this.findIndex(id);
        var {tasks} = this.state;
        if(index !== -1){
            tasks.splice(index,1);
            this.setState({
                tasks : tasks
            });
                localStorage.setItem('tasks',JSON.stringify(tasks));
        }
        this.onCloseForm();
    }
    onEditItem =(id) =>{
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditting = tasks[index];
        this.setState({
            taskEditting : taskEditting
        })
        this.onShowForm();
    }
    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus,10);
        this.setState({
            filter : {
                name : filterName.toLocaleLowerCase(),
                status : filterStatus
            }
        })
    }
    render() {
        var {tasks , isDisplayForm ,taskEditting,filter} = this.state;// var tasks = this.state.tasks
        if(filter){
            if(filter.name){
                tasks = tasks.filter((task) =>{
                    return task.name.toLocaleLowerCase().indexOf(filter.name) !== -1;
                })
            }
            tasks = tasks.filter((task)=>{
                if(filter.status === -1){
                    return task;
                }
                else{
                    return task.status === (filter.status === 1?true:false);
                }
            })
        }
        var eleTaskForm = isDisplayForm
            ? <Taskform
                onCloseForm = {this.onCloseForm}
                onSubmit={this.onSubmit}
                taskEditting={taskEditting}/>
            :'';
        return (
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
                    <div className={isDisplayForm?"col-xs-4 col-sm-4 col-md-4 col-lg-4":""}>
                        {/*Form*/}
                        {eleTaskForm}
                    </div>
                    <div className={isDisplayForm?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={this.onChangeDisplayForm}>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        {/*Search - Sort*/}
                        <div className="row mt-15">
                            <Control/>
                        </div>
                        {/*List*/}
                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList
                                    tasks={tasks}
                                    onUpdateStatus={this.onUpdateStatus}
                                    onDeleteItem={this.onDeleteItem}
                                    onEditItem={this.onEditItem}
                                    onFilter = {this.onFilter}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
// Duong Khac Tung