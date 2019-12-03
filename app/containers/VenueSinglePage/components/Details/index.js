import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import Preloader from '../../../../components/Preloader';
import { getVenueId } from '../../../../utils/router';
import { stringToText } from '../../../../utils/common';
import { getName } from '../../../ContactsPage/columns';

const ContactsList = ({ contacts }) => {
  if (contacts.length) {
    return (
      <div className="links-list">
        {contacts.map((item) => (
          <NavLink key={item.id} to={`/contact/${item.id}`}>{stringToText(getName(item))}</NavLink>
        ))}
      </div>
    );
  }
  return ('-');
};

class VenueDetails extends React.Component {
  render() {
    const { data } = this.props;
    return (!data || (data.id !== this.props.venueId)) ? (<Preloader />) : (
      <div>
        <div className="flex align-items-center m-b-xl">
          <div className="flex wrap">
            <div className="text-title">{stringToText(data.name)}</div>
          </div>
        </div>
        <table className="two-equal-columns" style={{ maxWidth: '281px' }}>
          <tbody>
            <tr>
              <td colSpan={2}>
                <div className="m-b-md">
                  <div className="text-bold">Abbrv.</div>
                  <div>{stringToText(data.abbreviation)}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="m-b-md">
                  <div className="text-bold">Address.</div>
                  <div>{stringToText(data.address)}</div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="m-b-md">
                  <div className="text-bold">Can we select Judge?</div>
                  <div>
                    {(typeof data.canWeSelectJudge === 'boolean') ? (
                      stringToText(data.canWeSelectJudge ? 'Yes' : 'No')
                    ) : '-'}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="m-b-md">
                  <div className="text-bold">Same day ADJ</div>
                  <div>
                    {(typeof data.sameDayAdj === 'boolean') ? (
                      stringToText(data.sameDayAdj ? 'Yes' : 'No')
                    ) : '-'}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="m-b-md">
                  <div className="text-bold">I & A Officers</div>
                  <ContactsList contacts={data.IAOfficers} />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="m-b-md">
                  <div className="text-bold">EDD Reps</div>
                  <ContactsList contacts={data.EDDReps} />
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div className="m-b-md">
                  <div className="text-bold">Board Reps</div>
                  <div>
                    {data.boardReps.length ? data.boardReps.map((el) => <span key={el}>{el.name}</span>) : '-'}
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div>
                  <div className="text-bold">Board Notes</div>
                  <div>{stringToText(data.boardNotes)}</div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  venueId: parseInt(getVenueId(state.get('route').get('location').get('pathname')), 10),
  data: state.get('singleVenue').get('data').toJS(),
  loading: state.get('singleVenue').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(VenueDetails);
