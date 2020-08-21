import React from 'react';

import PassportRankList from '../../components/Rank/PassportRankList';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import { loadPassports ,loadRelations} from '../../actions/passports';


export class Rank extends React.Component{


  componentDidMount(){
    if(this.props.passport.passportList.length === 0){
      this.props.loadPassports();
    }
  }
  render(){
    return(
      <PassportRankList passportList = {this.props.passport.passportList}/>
    )
  } 
};

const getPassports = createSelector(
  state => state.passportReducer,
  (passportReducer) => passportReducer.toJS()
)


const mapStateToProps = (state) => ({
  passport: getPassports(state),
})

const mapDispatchToProps = (dispatch) => {
return {
  loadPassports: (countryCode) => {
    dispatch(loadPassports(countryCode))
  },
  loadRelations: (relationList) =>{
    dispatch(loadRelations(relationList))
  }

}
}

export default connect(
mapStateToProps,
mapDispatchToProps
)(Rank);

