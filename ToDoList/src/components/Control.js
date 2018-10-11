import React, { Component } from 'react';
import Search from "./Search";
import Sort from "./Sort";

class Control extends Component {
    render() {
        return (
            <div>
                {/*Search*/}
                <Search onSearch={this.props.onSearch}/>
                {/*Sort*/}
                <Sort onSort = {this.props.onSort}/>
            </div>
        );
    }
}

export default Control;
