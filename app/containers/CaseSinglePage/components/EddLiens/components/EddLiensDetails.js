import React from 'react';
import moment from 'moment';
import { addDollarSign } from '../../../../../utils/common';

const EddLiensDetails = (props) => (
  props.data ? (
    <div className="case-stats-table">
      <table>
        <tbody>
          <tr>
            <td className="text-bold">Payment Rate:</td>
            <td className="f-s-13">{addDollarSign(props.data.paymentRate)}</td>
          </tr>
          <tr>
            <td className="text-bold">Body Part Certified:</td>
            <td className="f-s-13">{props.data.bodyPartCertified ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td className="text-bold">Physician Certified:</td>
            <td className="f-s-13">{props.data.physicianCertified ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td className="text-bold">Date of Notice to Carrier:</td>
            <td className="f-s-13">{props.data.dateOfNoticeToCarrier ? moment(props.data.dateOfNoticeToCarrier).format('L') : '-'}</td>
          </tr>
          <tr>
            <td className="text-bold">EDD Rep:</td>
            <td className="f-s-13">{props.data.eddRep ? `${props.data.eddRep.firstName} ${props.data.eddRep.lastName}` : '-'}</td>
          </tr>
          <tr>
            <td className="text-bold">Demand:</td>
            <td className="f-s-13">{props.data.service ? addDollarSign(props.data.service.demand) : '-'}</td>
          </tr>
          <tr>
            <td className="text-bold">EDD Lien Authority:</td>
            <td className="f-s-13">{addDollarSign(props.data.EDDLienAuthority)}</td>
          </tr>
          {!props.data.agreeOrDisagree ? (
            <tr>
              <td className="text-bold"><div className="p-t-sm">Disagreement Reason:</div></td>
              {!props.data.disagreeReason ? (
                <td className="f-s-13"><div className="p-t-sm">-</div></td>
              ) : null}
            </tr>
          ) : null}
          {!props.data.agreeOrDisagree && props.data.disagreeReason ? (
            <tr>
              <td colSpan="2" className="text-muted text-left">{props.data.disagreeReason}</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  ) : null
);

export default EddLiensDetails;
