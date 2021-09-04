import React from 'react';

import Modal from "react-bootstrap/Modal";

function FormModal({idForm, isOpen, successBTN, failBTN, categories, type, values}) {
    const {concept_, category_, date_, quantity_} = values || {
        concept_: "",
        category_: "",
        date_: "",
        quantity_: ""
    };
    let i = 0;

    return (
        <Modal show={isOpen} onHide={failBTN}>
            <Modal.Header>Añadir Operación</Modal.Header>
            <Modal.Body>
                <form id={idForm}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputConcept">Concepto</span>
                        <input type="text" className="form-control" name="concept_" defaultValue={concept_} placeholder="Concepto" aria-label="Concepto" aria-describedby="inputConcept" required/>
                    </div>
                    <div className="input-group mb-3">
                        <label className="input-group-text" htmlFor="selectCategory">Categoría</label>
                        <select className="form-select" id="selectCategory" name="category_" defaultValue={category_}>
                            <option key="0"></option>
                            {
                                categories.map(category => (
                                    <option key={++i} value={category}>{category}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputDate">Fecha</span>
                        <input type="date" className="form-control" name="date_" defaultValue={date_} aria-describedby="inputDate"/>
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="inputQuantity">$</span>
                        <input type="text" className="form-control" name="quantity_" defaultValue={quantity_} aria-label="Cantidad" aria-describedby="inputQuantity" required/>
                    </div>
                    {
                        (type) ? (
                            <div className="input-group mb-3">
                                <label className="input-group-text" htmlFor="selectType">Tipo</label>
                                <select className="form-select" id="selectType" name="type_" required>
                                    <option value="1">Ingreso</option>
                                    <option value="0">Egreso</option>
                                </select>
                            </div>
                        ) : ""
                    }
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-success" onClick={successBTN}>Aceptar</button>
                <button className="btn btn-danger" onClick={failBTN}>Cancelar</button>
            </Modal.Footer>
        </Modal>
    )
}

export default FormModal
