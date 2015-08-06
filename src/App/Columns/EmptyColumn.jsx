var React = require('react');
var {
    update
} = require('react/addons').addons;
var classnames = require('classnames');

var ReactDnd = require('react-dnd');
import {
    DragSource,
    DropTarget
} from 'react-dnd';

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move'
};

function collectDragSource(connect, monitor) {
  return {
    // Call this function inside render()
    // to let React DnD handle the drag events:
    connectDragSource: connect.dragSource(),
    // You can ask the monitor about the current drag state:
    isDragging: monitor.isDragging()
  };
};
function collectDropTarget(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
};
const columnDragSource = {
    beginDrag(props) {
        return {
            id: props.id
        };
    },
};
const columnDropSource = {
    drop(props, monitor) {
        const draggedId = monitor.getItem().id;
        if (draggedId !== props.id) {
          props.moveColumn(draggedId, props.id);
        }
    },
    // drop() {
    //     console.log('made it here too');
    // }
};

const Types = {
    COLUMN: 'column'
};
var EmptyColumn = React.createClass({
    getDefaultProps() {
        return {
            fixed: false,
            id: null,
            columnWidth: 250,
            handleLayout: () => {},
            style: {},
            title: '',
            moveColumn: () => {},
            registerColumn: () => {}
        }
    },
    componentWillReceiveProps(nextProps) {
        nextProps.style = this.props.handleLayout(this);
    },
    componentWillMount() {
        this.props.registerColumn(this);
    },
    render() {
        var columnClasses = {
            'column': true,
            'column--fixed': this.props.fixed
        };
        var style = {};
        if (this.props.fixed) {
            style = {
                width: `${this.props.columnWidth}px`
            };
        }
        var { isDragging, connectDragSource, connectDropTarget } = this.props;

        return connectDragSource(connectDropTarget(
            <div className={classnames(columnClasses)} style={this.props.style}>
                <div className="column__title">{this.props.title} [{isDragging}]</div>
                <div className="column__container">{this.props.children}</div>
            </div>
        ))
    }
});

export default DropTarget(Types.COLUMN, columnDropSource, collectDropTarget)(DragSource(Types.COLUMN, columnDragSource, collectDragSource)(EmptyColumn));
