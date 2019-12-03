import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames';
import includes from 'lodash/includes';
import Item from './Item';

class List extends React.Component {
  state = {
    visible: false
  };

  toggleVisible = (e) => {
    e.preventDefault();

    if (includes(e.target.className, 'trigger-show-more')) {
      this.setState({ visible: !this.state.visible });
    }
  };

  render() {
    let countCollapsedTabs = 0;
    let countTabs = 0;
    const visibleTabs = 4;
    const classes = classNames({
      active: this.state.visible,
      'tabs-group-list': true
    });

    return (
      <div className="juvo-active-tabs">
        {(this.props.list.size > visibleTabs) ?
          <div className="modal-tabs-group">
            <a href="#" className="show-more trigger-show-more" onClick={this.toggleVisible}>Show more {this.props.list.size - visibleTabs}</a>
            <div role="link" tabIndex="0" className={classes} onClick={this.toggleVisible} onKeyPress={this.toggleVisible}>
              {
                this.props.list.map((window) => {
                  countCollapsedTabs += 1;
                  if (countCollapsedTabs > visibleTabs) {
                    return (
                      <Item
                        key={window.get('key')}
                        tabKey={window.get('key')}
                        options={window.get('options').toJS()}
                        state={window.get('state')}
                      />
                    );
                  }
                  return null;
                })
              }
            </div>
          </div> : null
        }
        {
          this.props.list.map((window) => {
            countTabs += 1;
            if (countTabs <= visibleTabs) {
              return (
                <Item
                  key={window.get('key')}
                  tabKey={window.get('key')}
                  options={window.get('options').toJS()}
                  state={window.get('state')}
                />
              );
            }
            return null;
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.get('window')
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(List);
