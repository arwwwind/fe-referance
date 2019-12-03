import React from 'react';
import { stringToText, formatPhone, generateFaxLink } from '../../../utils/common';
import { organizationTypeLabelByValue } from '../../OrganizationsPage/config';

const Details = (props) => (
  <div>
    <div className="text-title m-b-xl">{stringToText(props.data.companyName)}</div>
    <table className="two-equal-columns" style={{ maxWidth: '281px' }}>
      <tbody>
        <tr>
          <td colSpan={2}>
            <div className="m-b-md">
              <div className="text-bold">Type</div>
              <div>{stringToText(organizationTypeLabelByValue(props.data.type))}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div className="m-b-md">
              <div className="text-bold">Primary Number</div>
              <div>{stringToText(formatPhone(props.data.primaryPhoneNumberType, props.data.primaryPhoneNumber, props.data.primaryPhoneNumberExtension))}</div>
            </div>
          </td>
          <td>
            <div className="m-b-md">
              <div className="text-bold">Secondary Number</div>
              <div>{stringToText(formatPhone(props.data.secondaryPhoneNumberType, props.data.secondaryPhoneNumber, props.data.secondaryPhoneNumberExtension))}</div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <div className="m-b-md">
              <div className="text-bold">Fax Number</div>
              <div>{stringToText(props.data.fax)}</div>
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
              <div className="text-bold">Address</div>
              <div>{stringToText(props.data.address)}</div>
            </div>
          </td>
        </tr>
        {props.data.type === 'account' ? (
          <tr>
            <td colSpan={2}>
              <div className="m-b-md">
                <div className="text-bold">Special Instructions:</div>
                <div>{stringToText(props.data.specialInstructionsNotes)}</div>
              </div>
            </td>
          </tr>
        ) : null}
        {props.data.type === 'account' ? (
          <tr>
            <td colSpan={2}>
              <div>
                <div className="text-bold">Settlement Language</div>
                <div>{stringToText(props.data.settlementLanguage)}</div>
              </div>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  </div>
);

export default Details;
