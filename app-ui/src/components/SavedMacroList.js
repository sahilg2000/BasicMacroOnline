import React from 'react';
import SavedMacro from './SavedMacro';

function SavedMacroList({ macros, onUpload, onEdit }) {
    return (
        <table id="savedmacros">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Carbs</th>
                    <th>Fats</th>
                    <th>Proteins</th>
                    <th>Calories/Unit</th>
                    <th>Edit</th>
                    <th>Load to plan</th>
                </tr>
            </thead>
            <tbody>
                {macros.map((macro, i) => <SavedMacro macro={macro}
                    onUpload={onUpload}
                    onEdit={onEdit}
                    key={i} />)}
            </tbody>
        </table>
    );
}

export default SavedMacroList;
