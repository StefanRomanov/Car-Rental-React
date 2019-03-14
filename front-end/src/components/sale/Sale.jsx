import React, {Component} from 'react';
import util from "../../services/util";

const Sale = (props) => {
    const {rentId,issueDate, carBrand, carModel, startDate, endDate, pricePaid, type} = props.sale;

    return (
        <tr>
            <td className='align-middle'>2ae634f7-43aa-461f-bf02-74c7122b369a</td>
            <td className='align-middle'>{util.formatDate(issueDate)}</td>
            <th className='align-middle'>{carBrand}</th>
            <th className='align-middle'>{carModel}</th>
            <td className='align-middle'>{util.formatDate(startDate)}</td>
            <td className='align-middle'>{util.formatDate(endDate)}</td>
            <td className='align-middle'>{pricePaid.toFixed(2)}</td>
            {
                type === 'APPROVED' ? <td className='font-weight-bold text-success align-middle'>{type}</td>
                    : type === 'DECLINED' ? <td className='font-weight-bold text-danger align-middle'>{type}</td>
                            : <td className='font-weight-bold text-warning align-middle'>{type}</td>
            }

        </tr>
    )

}

export default Sale;