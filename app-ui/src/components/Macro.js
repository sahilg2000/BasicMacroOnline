import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { FaPencil } from 'react-icons/fa6';


function Macro({ macro, onDelete, onEdit }) {
    return (
        <tr>
            <td>{macro.name}</td>
            <td>{macro.weight}</td>
            <td>{macro.carbs}</td>
            <td>{macro.fats}</td>
            <td>{macro.proteins}</td>
            <td>{Math.round(((macro.proteins * 4)+(macro.carbs * 4)+(macro.fats * 9)) * (macro.weight / 100))}</td>
            <td> <FaPencil onClick ={() => onEdit(macro)}/> </td>
            <td> <FaTrash onClick ={() => onDelete(macro._id)}/> </td>
        </tr>
    );
}

export default Macro;