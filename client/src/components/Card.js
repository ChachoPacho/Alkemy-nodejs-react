import React, { useEffect, useState } from 'react';

import { deleteOperation, getOperations, getTotals } from '../requests';

function Card({type_, category_, limit, mountMin, mountMax, showUpdateModal, showCreateModal, superActionRequiered}) {
    let i = 0;
    
    const [ actionRequiered, setActionRequiered ] = useState(true);
    const [ operations, setOperations ] = useState([]);
    const [ totals, setTotals ] = useState({});
    const [ operationsData, setOperationsData ] = useState({});

    const loadTotals = async (preOperations) => {
        let preTotals = {
            ingresos: 0,
            egresos: 0
        };

        if (limit) preTotals = (await getTotals())[0]; 
        else {
            for (const operation of preOperations) {
                preTotals[ (operation.type_.data[0] === 1) ? "ingresos" : "egresos" ] += operation.quantity_;
            }
        }
        preTotals.total = preTotals.ingresos - preTotals.egresos;

        setOperationsData((preTotals.total >= 0) ? {
            sign: "+",
            className: "text-success"
        } : {
            sign: "-",
            className: "text-danger"
        });
        
        preTotals.total = Math.abs(preTotals.total);
        setTotals(preTotals);
    }

    const deleteHTMLOperation = e => {
        const idOperation = e.target.offsetParent.parentElement.getAttribute('idoperation');
        deleteOperation(idOperation);
        setActionRequiered(!actionRequiered);
    }

    const pseudoComponents = (limit) ? {
        addBTN: (<></>),
        th: (<></>),
        td: (<></>)
    } : {
        addBTN: (
            <tr>
                <td colSpan="6" className="text-center p-0">
                    <button className="w-100 h-100 btn btn-primary rounded-0" onClick={showCreateModal}>
                        Añadir Operación
                    </button>
                </td>
            </tr>
        ),
        th: (<th className="text-center" scope="col"><i className="bi bi-sliders"></i></th>),
        td: (
            <td className="text-center">
                <i onClick={showUpdateModal} type="button" className="bi bi-pencil-square text-warning me-2"></i>
                <i onClick={deleteHTMLOperation} type="button" className="bi bi-trash text-danger ms-2"></i>    
            </td>
        )
    }

    useEffect(() => {
        (async () => {
            const preOperations = await getOperations(type_, category_, limit, mountMin, mountMax)
            setOperations(preOperations);
            loadTotals(preOperations);
        })()
    }, [type_, category_, mountMin, mountMax, actionRequiered, superActionRequiered]);

    return (
        <div className="card text-white bg-light">
            <div className="card-title">
                <div className="row">
                    <div className="text-center text-dark fs-5 mt-3 fw-bold">TOTAL</div>
                    <div className={"text-center fs-1 " + operationsData.className}>{operationsData.sign}${totals.total}</div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-6 text-center fs-4 my-2 text-success">
                        <div className="text-center text-success fs-6">INGRESOS</div>
                        +${totals.ingresos}
                    </div>
                    <div className="col-12 col-md-6 text-center fs-4 my-2 text-danger">
                        <div className="text-center text-danger fs-6">EGRESOS</div>
                        -${totals.egresos}
                    </div>
                </div>
            </div>
            <table className="table card-body">
                <thead>
                    <tr>
                        <th className="text-center" scope="col">@</th>
                        <th scope="col">Concepto</th>
                        <th scope="col">Categoría</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Monto</th>
                        {pseudoComponents.th}
                    </tr>
                </thead>
                <tbody>
                    { pseudoComponents.addBTN }
                    {
                        operations.map(operation => {
                            const operationData = (operation.type_.data[0] === 0) ? {
                                sign: "-",
                                className: "text-danger"
                            } : {
                                sign: "+",
                                className: "text-success"
                            };
                            let date = new Date(operation.date_);

                            return (
                            <tr id={"OperationN" + operation.id} idoperation={operation.id} key={operation.id}>
                                <td className="text-center">{++i}</td>
                                <td>{operation.concept_}</td>
                                <td>{operation.category_}</td>
                                <td>{date.getDate()} / {date.getMonth() + 1} / {date.getFullYear()}</td>
                                <td className={"text-end pe-4 " + operationData.className}>{operationData.sign}${operation.quantity_}</td>
                                {pseudoComponents.td}
                            </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Card
