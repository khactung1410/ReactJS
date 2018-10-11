import React, { Component } from 'react';

class Search extends Component {
    constructor(props){
        super(props);
        this.state = {
            key : ""
        }
    }
    onChange = (event) =>{
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name] : value
        });
    }
    onSearch = ()=>{
        this.props.onSearch(this.state.key);
    }
    handleKeyDown =(event)=>{
        console.log(event.key);
        if(event.key === "Enter"){
            event.preventDefault();
            this.onSearch();
        }
    }
    render() {
        return (
            <div>
                {/*Search*/}
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div className="input-group">
                        <input
                            name="key"
                            value={this.state.key}
                            onChange={ this.onChange}
                            type="text"
                            className="form-control"
                            placeholder="Nhập từ khóa..."
                            onKeyDown={this.handleKeyDown}
                        />
                        <span className="input-group-btn">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={this.onSearch}
                            >
                                <span className="fa fa-search mr-5"></span>Tìm
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
