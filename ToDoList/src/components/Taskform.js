import React, { Component } from 'react';
// import './App.css';

class Taskform extends Component {
    constructor(props){
        super(props);
        this.state = {
            name : '',
            status : false,
            id : ''
        }
    }
    onCloseForm = ()=> {
        this.props.onCloseForm();
    }

    onChange = (event)=>{
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name==='status'){
            value = (target.value === 'true')?true:false;
        }
        this.setState({
            [name] : value
        })
    }

    onSubmit = (event)=>{
        event.preventDefault();
        this.props.onSubmit(this.state);
        //Cancel & Close Form
        this.onClear();
        this.onCloseForm();
    }
    onClear = ()=>{
        this.setState({
            name : '',
            status : false
        });
    }
    componentWillMount(){
        var taskEditting = this.props.taskEditting;
        if(taskEditting){
            this.setState({
                id : taskEditting.id,
                name : taskEditting.name,
                status : taskEditting.status
            })
        }
    }
    componentWillReceiveProps(nextProps){
        var taskEditting = nextProps.taskEditting;
        if(nextProps && taskEditting){
            this.setState({
                id : taskEditting.id,
                name : taskEditting.name,
                status : taskEditting.status
            })
        }else if(!taskEditting){
            this.setState({
                name : '',
                status : false,
                id : ''
            })
        }
    }
    render() {
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {this.state.id !== '' ? 'Sửa Công Việc':'Thêm Công Việc'}
                        <span
                            className="fa fa-times-circle text-right"
                            onClick={this.onCloseForm}
                        ></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Tên :</label>
                            <input
                                type="text"
                                className="form-control"
                                name ="name"
                                value={this.state.name}
                                onChange={this.onChange}
                            />
                        </div>
                        <label>Trạng Thái :</label>
                        <select
                            className="form-control"
                            required="required"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>
                        <br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">Thêm</button>
                            &nbsp;
                            <button
                                type="submit"
                                className="btn btn-danger"
                                onClick={this.onClear}
                            >
                                Hủy Bỏ
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Taskform;
