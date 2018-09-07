import React from "react";

class DropDownMenu extends React.Component {
    state = {
        anchorEl: null
    };

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { anchorEl } = this.state;
        const { header, items, component: Component } = this.props;

        return (
            <div>
                <div className="dropdown dropdown2">
                    <button className="btn btn-primary dropdown-toggle dropdown-toggle2" type="button" data-toggle="dropdown" onClick={this.handleClick}>
                        <span className="caret"></span></button>
                    <ul className="dropdown-menu dropdown-menu2">
                        {items.map(item => (
                            <li><a
                                onClick={() => {
                                    this.handleClose();
                                    item.onClick && item.onClick();
                                }}
                            >
                                {item.value}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}
export default DropDownMenu;
