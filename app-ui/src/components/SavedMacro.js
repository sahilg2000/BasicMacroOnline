import React from 'react';
import { FaFileDownload } from "react-icons/fa";
import { FaPencil } from 'react-icons/fa6';


function SavedMacro({ macro, onUpload, onEdit }) {
    return (
        <tr>
            <td>{macro.name}</td>
            <td>{macro.carbs}</td>
            <td>{macro.fats}</td>
            <td>{macro.proteins}</td>
            <td>{Math.round((macro.proteins * 4)+(macro.carbs * 4)+(macro.fats * 9))}</td>
            <td> <FaPencil onClick ={() => onEdit(macro)}/> </td>
            <td> <FaFileDownload onClick ={() => onUpload(macro)}/> </td>
        </tr>
    );
}

export default SavedMacro;