import React from 'react';
import Macro from './Macro';

function MacroList({ macros, onDelete, onEdit }) {
    return (
        <table id="macros">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Weight</th>
                    <th>Carbs</th>
                    <th>Fats</th>
                    <th>Proteins</th>
                    <th>Calories</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {macros.map((macro, i) => <Macro macro={macro}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default MacroList;
