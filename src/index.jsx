var App = require('./App/App.jsx');
var React = require('react');
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { DragDropContext } from 'react-dnd';
var DragDropApp = DragDropContext(HTML5Backend)(App);
var Table = require('../example/Table.jsx');
React.render(
    (
        <DragDropApp>
            <Table id="table-01"/>
            <Table id="table-02"/>
            <Table id="table-03"/>
            <Table id="table-04"/>
            <Table id="table-05"/>
        </DragDropApp>
    ),
    document.getElementById('app')
)

module.exports = {
    app: app
};
