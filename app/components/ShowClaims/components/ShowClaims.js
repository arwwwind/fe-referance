import React from 'react';
import Preloader from '../../Preloader';
import Errors from '../../Errors';
import ClaimItem from './ClaimItem';

class ShowClaims extends React.Component {
  componentDidMount() {
    if (this.props.id) {
      this.props.onFetchData(this.props.id);
    }
  }

  render() {
    const data = this.props.data ? this.props.data.toJS() : [];
    const error = this.props.error ? this.props.error.toJS() : null;
    const { loading, id, currentId } = this.props;

    if (loading && (currentId !== id && !data.length)) {
      return <Preloader />;
    }

    return (
      <div className="show-claims">
        {error ? (
          <Errors errors={error} />
        ) : null}
        {data.length ? data.map((claim, idx) => (
          <ClaimItem
            title={idx === 0 ? 'Primary Claim' : `Claim ${idx + 1}`}
            claimNumber={claim.claimNumber}
            adjNumber={claim.ADJNumber}
            startDate={claim.dateOfInjuryStart}
            endDate={claim.dateOfInjuryEnd}
            key={claim.id}
          />
        )) : (
          <ClaimItem
            title="Primary Claim"
          />
        )}
      </div>
    );
  }
}

export default ShowClaims;
