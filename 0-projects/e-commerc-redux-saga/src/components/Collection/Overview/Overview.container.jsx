import { connect } from 'react-redux';
import { compose } from 'redux';
import { selectIsShopCollectionFetching } from '../../../redux-state/shop/shop.selectors';

import WithSpinner from '../../Form/Spinner/spinner.component';
import Overview from './Overview';

const mapStateToProps = (state) => ({
  isFetching: selectIsShopCollectionFetching(state),
});

const OverviewContainer = compose(
  connect(mapStateToProps),
  WithSpinner
)(Overview);

export default OverviewContainer;
