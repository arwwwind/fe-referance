import React from 'react';
import DetailsHeaderLayout from './HeaderLayout';
import { stringToText, formatPhone, generateFaxLink } from '../../../../../utils/common';
import { contactTypeLabelByValue } from '../../../../ContactsPage/config';

const BasicLayout = (props) => (
  <div>
    <DetailsHeaderLayout data={props.data} />
    <table className="two-equal-columns" style={{ maxWidth: '281px' }}>
      <tbody>
        <tr>
          <td>
            <div className="m-b-md">
              <div className="text-bold">Type</div>
              <div>{stringToText(contactTypeLabelByValue(props.data.contactType))}</div>
            </div>
          </td>
          <td>
            <div className="m-b-md">
              <div className="text-bold">Fax Number</div>
              <div>{stringToText(props.data.faxNumber)}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="m-b-md">
              <div className="text-bold">Office Number</div>
              <div>{stringToText(formatPhone(props.data.officeNumberType, props.data.officeNumber, props.data.officeNumberExtension))}</div>
            </div>
          </td>
          <td>
            <div className="m-b-md">
              <div className="text-bold">Fax Link</div>
              <div>{stringToText(generateFaxLink(props.data.faxLink))}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="m-b-md">
              <div className="text-bold">Email</div>
              <div>{stringToText(props.data.email)}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="m-b-md">
              <div className="text-bold">Address</div>
              <div>{stringToText(props.data.address)}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div>
              <div className="text-bold">Description</div>
              <div>{stringToText(props.data.description)}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default BasicLayout;
