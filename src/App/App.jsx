var React = require('react/addons');
var {
    update,
    PureRenderMixin
} = React.addons;
var classnames = require('classnames');
var ColumnContainer = require('./Columns/ColumnContainer.jsx');
var _ = require('lodash');

var ReactDnd = require('react-dnd');

require('../../style/app.scss');

var App = React.createClass({
// mixins: [ PureRenderMixin ],
    getInitialState() {
        return {
            columns: this.props.children,
            columnOffsets: [],
            fixedColumns: false,
            fixedColumnWidth: 250
        }
    },
    handleResize(ev) {
        this.setState({
            fixedColumnWidth: ev.target.value
        })
    },
    // componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         columns: nextProps.children
    //     });
    // },
    moveColumn(index, afterIndex, column) {
        //
        this.setState(update(this.state, {
          columns: {
            $splice: [
              [index, 1],
              [afterIndex, 0, column]
            ]
          }
        }));
    },
    render() {
        console.log('columnsFromState',this.state.columns.map((col)=>{ return col.props.id; }));
        return (
            <div className="column-app">
                <div className="column-app__controls">
                    <button onClick={() => this.setState({fixedColumns: true})}>Fixed width</button>
                    <button onClick={() => this.setState({fixedColumns: false})}>Flexible width</button>
                    <input max={500} min={100} onChange={_.throttle(this.handleResize,120)} type="range" value={this.state.fixedColumnWidth}/>
                </div>
                <ColumnContainer fixedColumns={this.state.fixedColumns} moveColumn={this.moveColumn}>
                    {this.state.columns}
                </ColumnContainer>
            </div>
        );
    }
});

module.exports = (App);
