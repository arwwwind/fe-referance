import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Drawer from './Drawer';
import Preloader from '../../../components/Preloader';
import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';
import reducer from '../reducer';
import { pageSaga as saga } from '../saga';
import Board from './Board';
import {
  fetchTracksStart,
  singleTracksStart,
  moveTracksStart
} from '../actions';

class TracksContent extends React.Component {
  state = { totalTasks: 0 };

  componentDidMount() {
    this.props.fetchData();
  }

  loading() {
    const { data, loading } = this.props;
    const numberOfTotalTasks = Object.keys(data).reduce((acc, el) => acc + data[el].tasksLength, 0);
    if (this.state.totalTasks !== numberOfTotalTasks) {
      this.setState({ totalTasks: numberOfTotalTasks });
      return true;
    }
    return numberOfTotalTasks === 0 && loading;
  }

  render() {
    const { data } = this.props;
    return this.loading() ? (<Preloader />) : (
      <div className="juvo-table-content boards-container">
        <Drawer />
        {Object.keys(data).map((key) => <Board key={key} data={data[key]} boardID={key} boardTitle={data[key].boardTitle} onAdd={this.props.singleTrackAdd} onEditTask={this.props.singleTrackAdd} onMoveTask={this.props.moveTracks} />)}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchTracksStart()),
  singleTrackAdd: (id, boardID) => dispatch(singleTracksStart(id, boardID)),
  moveTracks: (data) => dispatch(moveTracksStart(data)),
});

const mapStateToProps = (state) => ({
  data: state.get('tracks').get('data').toJS(),
  loading: state.get('tracks').get('fetch').get('loading')
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: 'tracks', reducer});
const withSaga = injectSaga({key: 'tracksPage', saga});

export default compose(withReducer, withSaga, withConnect)(TracksContent);
export { mapDispatchToProps };
