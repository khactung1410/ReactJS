import React from 'react';
import '../asset/css/style.css';
import CpmBoxInfo from './cpmBoxInfo'

class NewComponentLeft extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        }
        // this.showRoom(this.props.listgroup)
    }
    showRoom = (listRooms) => {
        let channel = [];
        let group = [];
        let messages = [];

        listRooms.forEach(item => {
            switch (item.t){
                case 'd':
                    messages.push(item);
                    break;
                case 'c':
                    channel.push(item);
                    break;
                case 'p':
                    group.push(item);
                    break;
            }
        })

        return (
            <ul className="list">
                <p className="chann">CHANNEL</p>
                {
                    channel.map(item=>(
                        <li
                            key={item._id}
                            id={item._id}
                            className="clearfix Hover"
                            onClick={() => this.props.getChannel(item._id, item.name)}
                        >
                            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_09.jpg" alt="avatar" />
                            <div className="about">
                                <div className="name">{item.name}</div>
                                <div className="status">
                                    <i className="fa fa-circle online"></i> online
                                </div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        )
    }
    render(){
        var users = this.state.allUser;
        return (
            <div className="people-list" id="people-list">
                <div>
                    <CpmBoxInfo infor={this.props.infor} status={this.props.status} onStatusChange={this.props.onStatusChange}/>
                    <hr/>
                </div>
                <div className="search">
                    <input type="text" placeholder="search Channel" />
                    <i className="fa fa-search" />
                </div>

                {this.showRoom(this.props.listgroup)}
            </div>
        );
    }
}
export default NewComponentLeft;