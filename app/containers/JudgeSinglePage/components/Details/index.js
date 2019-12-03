import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink } from 'react-router-dom';
import Preloader from '../../../../components/Preloader';
import { getJudgeId } from '../../../../utils/router';
import { stringToText } from '../../../../utils/common';

class JudgeDetails extends React.Component {
  render() {
    const { data } = this.props;

    return (!data || (data.id !== this.props.judgeId)) ? (<Preloader />) : (
      <div>
        <div className="flex align-items-center m-b-xl">
          <div className="flex wrap">
            <div className="text-title m-r-sm">{`${data.firstName} ${data.lastName}`}</div>
            {data.active ?
              <span className="text-success f-s-15">(Active)</span>
              :
              <span className="text-danger f-s-15">(Inactive)</span>
            }
          </div>
        </div>
        <table className="two-equal-columns" style={{ maxWidth: '281px' }}>
          <tbody>
            <tr>
              <td colSpan={2}>
                <div className="m-b-md">
                  <div className="text-bold">Venue</div>
                  {data.venue && data.venue.name ? (
                    <NavLink to={`/venue/${data.venueId}`}>{`${data.venue.name}`}</NavLink>
                  ) : '-'}
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <div>
                  <div className="text-bold">Notes</div>
                  <div>{stringToText(data.judgeNotes)}</div>
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
  judgeId: parseInt(getJudgeId(state.get('route').get('location').get('pathname')), 10),
  data: state.get('singleJudge').get('data').toJS(),
  loading: state.get('singleJudge').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(JudgeDetails);
