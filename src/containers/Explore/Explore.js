import React from 'react';
import CustomGrid from '../../components/CustomGrid/CustomGrid';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { loadPassports, loadRelations } from '../../actions/passports';

export class Explore extends React.Component {
  componentDidMount() {
    if (this.props.passport.passportList.length === 0) {
      this.props.loadPassports();
    }
  }
  render() {
    return <CustomGrid data={this.props.passport.passportList} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(Explore);
