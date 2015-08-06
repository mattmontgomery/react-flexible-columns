import {
    DropTarget
} from 'react-dnd';
var React = require('react');
var { update } = require('react/addons').addons;
var classnames = require('classnames');
var EmptyColumn = require('./EmptyColumn.jsx');
var _ = require('lodash');
const Types = {
    COLUMN: 'column'
}
const ColumnTarget = {drop(props, monitor, component) {
    if (monitor.didDrop()) {
      // If you want, you can check whether some nested
      // target already handled drop
      return;
    }

    // Obtain the dragged item
    const item = monitor.getItem();
    console.log(props);
    const dropResult = monitor.getDropResult();
    console.log(dropResult);
    // component.moveColumn(item);

    // You can do something with it
    // ChessActions.movePiece(item.fromPosition, props.position);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

function collect(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDropTarget: connect.dropTarget(),
    // You can ask the monitor about the current drag state:
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true }),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

var ColumnContainer = React.createClass({
    getDefaultProps() {
        return {
            fixedColumns: false,
            moveColumn: ()=>{}
        }
    },
    getInitialState() {
        return {
            columns: []
        }
    },
    componentDidMount() {
        this.setState({
            columns: this.props.children
        });
    },
    componentWillReceiveProps(nextProps) {
        this.setState({
            columns: nextProps.children
        });
    },
    handleColumnLayout(col, idx, component) {
        var offsetWidth = component.getDOMNode().offsetWidth;
        return {
            left: this.state.fixedColumns ? this.state.fixedColumnWidth * idx : 'auto',
            width: this.state.fixedColumns ? this.state.fixedColumnWidth : 'auto',
            right: this.state.fixedColumns ? this.state.fixedColumnWidth * (idx + 1) : 'auto'
        }
    },
    moveColumn(id, afterId) {
        var column = _.find(this.state.columns,(col)=>{
            return col.props.id === id;
        });
        var columnIndex = _.findIndex(this.state.columns, (col)=>{
            return col.props.id === id;
        });
        var afterIndex = _.findIndex(this.state.columns, (col)=>{
            return col.props.id === afterId;
        });
        this.props.moveColumn(columnIndex, afterIndex, column);
        // this.setState(update(this.state, {
        //   columns: {
        //     $splice: [
        //       [columnIndex, 1],
        //       [afterIndex, 0, column]
        //     ]
        //   }
        // }));
    },
    render() {
        var containerClasses = {
            'column-app__container': true,
            'column-app__container--fixed': this.props.fixedColumns
        };
        var columns = this.state.columns.map((col, idx)=>{ return (
            <EmptyColumn
                columnWidth={this.state.fixedColumnWidth}
                fixed={this.state.fixedColumns}
                handleLayout={this.handleColumnLayout.bind(null, col, idx)}
                key={col.props.id}
                id={col.props.id}
                title={`Column ${col.props.id}`}
                moveColumn={this.moveColumn}>{col}
            </EmptyColumn>
        );})
        const { isOver, canDrop, connectDropTarget } = this.props;
        return connectDropTarget(
            <div className={classnames(containerClasses)}>{columns}</div>
        )
    }
});

export default DropTarget(Types.COLUMN, ColumnTarget, collect)(ColumnContainer);
