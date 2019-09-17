import React from 'react';
import Home from '../../presentations/home/index';
import { connect } from 'react-redux';
import { AppState } from '../../../store/store';

const HomeContainer: React.FC = () => {
  return <Home />;
};

const mapStateToProps = (state: AppState) => ({
  home: state.home
});

export default connect(mapStateToProps)(HomeContainer);
