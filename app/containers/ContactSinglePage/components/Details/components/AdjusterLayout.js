import React from 'react';
import { NavLink } from 'react-router-dom';
import { formatPhone, stringToText, generateFaxLink } from '../../../../../utils/common';
import DetailsHeaderLayout from './HeaderLayout';
import { contactTypeLabelByValue } from '../../../../ContactsPage/config';

const Accounts = ({ accounts }) => {
  if (accounts.length) {
    return (
      <div className="links-list">
        {accounts.map((item) => (
          <NavLink key={item.id} to={`/organization/${item.id}`}>{stringToText(item.companyName)}</NavLink>
        ))}
      </div>
    );
  }
  return ('-');
};

const AdjusterLayout = (props) => (
  <div>
    <DetailsHeaderLayout data={props.data} />
    <table className="two-equal-columns" style={{ maxWidth: '281px' }}>
      <tbody>
        <tr>
          <td colSpan={2}>
            <div className="m-b-md">
              <div className="text-bold">Type</div>
              <div>{stringToText(contactTypeLabelByValue(props.data.contactType))}</div>
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
              <div className="text-bold">Fax Number</div>
              <div>{stringToText(props.data.faxNumber)}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
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
              <div className="text-bold">Organization</div>
              {props.data.organisation ? (
                <NavLink to={`/organization/${props.data.organisation.id}`}>{stringToText(props.data.organisation.companyName)}</NavLink>
              ) : '-'}
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="m-b-md">
              <div className="text-bold">Accounts</div>
              {props.data.accounts ? (
                <Accounts accounts={props.data.accounts} />
              ) : '-'}
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="m-b-md">
              <div className="text-bold">Special Instructions:</div>
              <div>{stringToText(props.data.specialInstructionNotes)}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div>
              <div className="text-bold">Sales Contacts Notes:</div>
              <div>{stringToText(props.data.salesContactNotes)}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default AdjusterLayout;
