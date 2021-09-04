import React, { useState } from 'react';

import Card from '../components/Card';
import Nav from '../components/Nav';
import FormModal from '../components/FormModal';

import { saveOperation, updateOperation } from '../requests';

const categories = [
    "Amigos", "Auto", "Bares", "Belleza", "Boludeces", "Cajeros", "Cuidado Personal", "Delivery", "Deportes", "Donaciones", 
    "Educación", "Entretenimiento", "Familia", "Gaming", "Hijos", "Hobbies", "Hogar", "Mascotas", "Restaurantes", "Salidas", 
    "Servicios", "Shopping", "Supermercados", "Suscripciones", "Tansporte", "Tecnología", "Trabajo", "Vestimenta", "Viajes", 
    "Otros"
];
const fieldsRequired = ["concept_", "date_", "quantity_"];

function Operations() {
    let i = 0;
    
    const [ type_, setType_ ] = useState();
    const [ category_, setCategory_ ] = useState([]);
    const [ mountMin, setMountMin ] = useState();
    const [ mountMax, setMountMax ] = useState();

    const [ isOpenCreateModal, setIsOpenCreateModal ] = useState(false);
    const [ isOpenUpdateModal, setIsOpenUpdateModal ] = useState(false);

    const [ updateValues, setUpdateValues ] = useState({});
    const [ idOperationUpdate, setIdOperationUpdate ] = useState("");
    const [ actionRequiered, setActionRequiered ] = useState(true);

    const showCreateModal = () => setIsOpenCreateModal(true);
    const showUpdateModal = e => {
        const operationHTML = e.target.offsetParent.parentElement;
        const idOperation = e.target.offsetParent.parentElement.getAttribute('idoperation');
        const fieldsOperation = operationHTML.children;

        const noParsedDAte = fieldsOperation[3].innerHTML.split(" / ")

        for (let index = 0; index < 2; index++) {
            const element = noParsedDAte[index];
            noParsedDAte[index] = ( ( Number(element) < 10 ) ? "0" : "" ) + element;
        }
        
        setUpdateValues({
            concept_: fieldsOperation[1].innerHTML,
            category_: fieldsOperation[2].innerHTML,
            date_: `${noParsedDAte[2]}-${noParsedDAte[1]}-${noParsedDAte[0]}`,
            quantity_: fieldsOperation[4].innerHTML.replace("+$", "").replace("-$", "")
        })
        
        setIdOperationUpdate(idOperation);
        setIsOpenUpdateModal(true)
    };

    const hideCreateModal = () => setIsOpenCreateModal(false);
    const hideUpdateModal = () => setIsOpenUpdateModal(false);

    const saveOPT = () => {
        const formData = Object.fromEntries( ( new FormData(document.getElementById('sendSaveOperationForm')).entries() ) );

        for (const field of fieldsRequired) if (!formData[field]) return document.querySelector(`input[name=${field}]`).focus();
        if ( isNaN( Number( formData['quantity_'] ) ) ) return document.querySelector("input[name=quantity_]").focus();

        saveOperation(formData['concept_'], formData['quantity_'], formData['date_'], Number(formData['type_']), formData['category_']);
        hideCreateModal();
        setActionRequiered(!actionRequiered);
    }
    const updateOPT = () => {
        const formData = Object.fromEntries( ( new FormData(document.getElementById('sendUpdateOperationForm')).entries() ) );

        for (const field of fieldsRequired) if (!formData[field]) return document.querySelector(`input[name=${field}]`).focus();
        if ( isNaN( Number( formData['quantity_'] ) ) ) return document.querySelector(`input[name=quantity_]`).focus();

        updateOperation(idOperationUpdate, formData['concept_'], formData['quantity_'], formData['date_'], formData['category_']);
        hideUpdateModal();
        setActionRequiered(!actionRequiered);
    }

    const handleType_ = () => {
        const typesSelected = document.querySelectorAll("#checkBoxIngresos:checked, #checkBoxEgresos:checked");
        setType_((typesSelected.length === 1) ? typesSelected[0].value : undefined);
    };

    const handleCategory_ = e => {
        const category = categories[e.target.value];
        const category_Clon = [...category_];

        if (category_Clon.includes(category)) category_Clon.pop(category); 
        else category_Clon.push(category);

        setCategory_(category_Clon);
    };
    const handleMountMin = e => setMountMin(e.target.value);
    const handleMountMax = e => setMountMax(e.target.value);

    return (
        <div className="container pt-2 pb-5">
            <Nav />
            <div className="row">
                <div className="col-md-4">
                    <div className="card text-dark bg-light mb-3">
                        <div className="card-header">Tipos</div>
                        <div className="card-body">
                            <div className="d-flex justify-content-around w-100">
                                <div className="form-check">
                                    <input className="form-check-input" onChange={handleType_} name="type_" type="checkbox" value="1" id="checkBoxIngresos"/>
                                    <label className="form-check-label" htmlFor="checkBoxIngresos">
                                        Ingresos
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" onChange={handleType_} name="type_" type="checkbox" value="0" id="checkBoxEgresos"/>
                                    <label className="form-check-label" htmlFor="checkBoxEgresos">
                                        Egresos
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="card-header">Montos</div>
                        <div className="card-body">
                            <div className="d-flex justify-content-around w-100">
                                <div className="form-check ps-0">
                                    <label htmlFor="inputMin" className="form-label">Min:</label>
                                    <input className="form-control" onChange={handleMountMin} name="mountMin" id="inputMin" placeholder="0 - 9999"/>
                                </div>
                                <div className="form-check">
                                    <label htmlFor="inputMax" className="form-label">Max:</label>
                                    <input className="form-control" onChange={handleMountMax} name="mountMax" id="inputMax" placeholder="0 - 9999"/>
                                </div>
                            </div>
                        </div>
                        <div className="card-header">Categorías</div>
                        <div className="card-body">
                            <div className="row d-flex flex-wrap justify-content-between">
                                {
                                    categories.map(category => (
                                        <div className="col-6" key={"categoryN" + i}>
                                            <div className="form-check me-2">
                                                <input className="form-check-input" onChange={handleCategory_} name="category_" type="checkbox" value={i++} id={"flexCheckCategory" + category}/>
                                                <label className="form-check-label" htmlFor={"flexCheckCategory" + category}>
                                                    { category }
                                                </label>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <Card type_={type_} category_={category_} mountMin={mountMin} mountMax={mountMax} showCreateModal={showCreateModal} showUpdateModal={showUpdateModal} superActionRequiered={actionRequiered}/>
                </div>
                <FormModal idForm="sendSaveOperationForm" isOpen={isOpenCreateModal} successBTN={saveOPT} failBTN={hideCreateModal} categories={categories} type={true} />
                <FormModal idForm="sendUpdateOperationForm" isOpen={isOpenUpdateModal} successBTN={updateOPT} failBTN={hideUpdateModal} categories={categories} values={updateValues} />
            </div>
        </div>
    )
}

export default Operations
