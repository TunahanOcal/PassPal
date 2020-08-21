import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { loadPassports, loadRelations } from '../../actions/passports';
import styles from './Compare.module.css';
import CompareTable from '../../components/CompareTable/CompareTable.js';

export class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.loadRelations = this.loadRelations.bind(this);
  }

  loadRelations = (countryCode) => {
    this.props.loadRelations(countryCode);
  };
  componentDidMount() {
    if (this.props.passport.passportList.length === 0) {
      this.props.loadPassports();
    }
  }

  render() {
    return (
      <>
        <div className={styles.header2}>
          <h1 className={styles.header2}>Compare Your Passport</h1>
          <h5 className={styles.header2}>
            Select passports and compare them side by side.
          </h5>
        </div>
        <CompareTable
          data={this.props.passport.passportList}
          relationList={this.props.passport.relationList}
          loading={this.props.passport.loading}
          loadRelations={this.loadRelations}
        />
      </>
    );
  }
}

const getPassports = createSelector(
  (state) => state.passportReducer,
  (passportReducer) => passportReducer.toJS()
);

const mapStateToProps = (state) => ({
  passport: getPassports(state),
});

const mapDispatchToProps = (dispatch) => {
  return {
    loadPassports: (countryCode) => {
      dispatch(loadPassports(countryCode));
    },
    loadRelations: (relationList) => {
      dispatch(loadRelations(relationList));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Compare);
