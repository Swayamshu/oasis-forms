import React, { useState } from 'react';
import { MdOutlineDeleteForever, MdAddCircleOutline, MdArrowDropDown } from "react-icons/md"

const Form = () => {
    const dummyData = {
        title: "Untitled Label",
        type: "Checkbox",
        options: ["Option 1"],
    };

    const [formData, setFormData] = useState([dummyData]);

    const handleTitleChange = (e : React.ChangeEvent<HTMLInputElement>, i: number) => {
        let updatedData = formData.map((obj, idx) => {
            if (i === idx) return { ...obj, title: e.target.value };
            else return obj;
        });
        setFormData(updatedData);
    }

    const handleOptionChange = (e : React.ChangeEvent<HTMLInputElement>, i: number, idx: number) => {
        let updatedData = formData.map((obj, index) => {
            if (i === index) {
                let updatedOptions = obj.options.map((option, j) => {
                    if (j === idx) return e.target.value;
                    else return option;
                });
                return { ...obj, options: updatedOptions };
            }
            else return obj;
        });
        setFormData(updatedData);
    }
    
    const handleAdd = () => {
        setFormData([...formData, dummyData]);
    }

    const handleDelete = (i: number) => {
        if (formData.length === 1) return;
        const newData = formData.filter((obj, index) => {
            if (index !== i) return obj;
        });
        setFormData(newData);
    }

    const handleAddOption = (i: number) => {
        const newFormData = formData.map((obj, index) => {
            if (index === i) {
                let newOptions = [...obj.options, `Option ${obj.options.length + 1}`];
                return { ...obj, options: newOptions };
            }
            else return obj;
        });
        setFormData(newFormData);
    }

    const handleDeleteOption = (i: number, idx: number) => {
        const newFormData = formData.map((obj, index) => {
            if (index === i) {
                if (obj.options.length === 1) return obj;
                let newOptions = obj.options.filter((option, j) => {
                    if (idx !== j) return option;
                });
                return { ...obj, options: newOptions };
            }
            else return obj;
        });
        setFormData(newFormData);
    }

    const handleDataType = (i: number, formType: string) => {
        const updatedData = formData.map((obj, index) => {
            if (index === i) {
                return { ...obj, type: formType }
            }
            else return obj;
        });
        setFormData(updatedData);
    }

    const handleSave = () => {
        console.log(formData);
    }
    
    return (
        <div className="form-container">
            {formData.map((data, i) => (
                <div key={i} className="form-data">
                    <div className="form-data-container">
                        <div className="form-data-header">
                            <input
                                className="form-data-input"
                                type="text"
                                onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleTitleChange(e, i)}
                                value={data.title}
                            />
                            <div
                                style={{ float:"right" }}
                                className="form-data-input dropdown">
                                {data.type} <MdArrowDropDown className="icon"/>
                                <div className="dropdown-content">
                                    <div onClick={() => handleDataType(i, "Checkbox")}>Checkbox</div>
                                    <div onClick={() => handleDataType(i, "Dropdown")}>Dropdown</div>
                                </div>
                            </div>
                        </div>

                        <div className="form-data-options">
                            {data.options.map((option, idx) => (
                                <div className="form-option" key={idx}>
                                    <input
                                        className="form-options-input"
                                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => handleOptionChange(e, i, idx)}
                                        value={option}
                                    />
                                    <div onClick={() => handleDeleteOption(i, idx)}><MdOutlineDeleteForever className="icon"/></div>
                                </div>
                            ))}
                            <div className="add-option" onClick={() => handleAddOption(i)}>
                                <MdAddCircleOutline className="icon"/>
                            </div>
                        </div>
                    </div>
                    <div onClick={() => handleDelete(i)}><MdOutlineDeleteForever className="icon delete-form-icon" /></div>
                </div>
            ))}
            <div className="form-btn-container">
                <button className="add-save-btn" type="submit" onClick={handleAdd}>Add</button>
                <button className="add-save-btn" type="submit" onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default Form