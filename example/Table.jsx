var {
    Table,
    Column
} = require('fixed-data-table');
require('css!../node_modules/fixed-data-table/dist/fixed-data-table.css');
var React = require('react');

var TableComponent = React.createClass({
    getDefaultProps() {
        var rows = [];
        var sampleLength = 100;
        for (var i = 0; i < sampleLength; i++) {
            var row = [];
            for (var j = 0; j < 10; j++) {
                row.push(Math.floor(Math.random(0, 10000) * (1000 - 0) + 0));
            }
            rows.push(row);
        }
        return {
            rows: rows
        }
    },
    rowGetter(rowIdx) {
        return this.props.rows[rowIdx];
    },
    render() {
        return (
            <table>
                {
                    this.props.rows.map((row, idx)=>{
                        return (<tr key={`row-${idx}`}>{row.map((cell,idx)=>{
                            return (<td key={`cell-${idx}`}>{cell}</td>);
                        })}</tr>);
                    })
                }
            </table>
        );
    }
});

module.exports = TableComponent;
