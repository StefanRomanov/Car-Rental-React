import React from 'react';

import util from "../../util/util";

import './Sale.css'

const Sale = (props) => {
    const {rentId,issueDate, carBrand, carModel, startDate, endDate, pricePaid, type} = props.sale;

    return (
        <tr>
            <td className='align-middle sale-row'>{rentId}</td>
            <td className='align-middle sale-row'>{util.formatDate(issueDate)}</td>
            <th className='align-middle sale-row'>{carBrand}</th>
            <th className='align-middle sale-row'>{carModel}</th>
            <td className='align-middle sale-row'>{util.formatDate(startDate)}</td>
            <td className='align-middle sale-row'>{util.formatDate(endDate)}</td>
            <td className='align-middle sale-row'>{pricePaid.toFixed(2)}</td>
            {
                type === 'APPROVED' ? <td className='font-weight-bold text-success align-middle sale-row'>{type}</td>
                    : type === 'DECLINED' ? <td className='font-weight-bold text-danger align-middle sale-row'>{type}</td>
                            : <td className='font-weight-bold text-warning align-middle sale-row'>{type}</td>
            }

        </tr>
    )

}

export default Sale;