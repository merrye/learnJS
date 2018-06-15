import { connect } from 'react-redux';
import Link from '../components/Link';
import { setVisibilityFilter } from '../actions/index';

const mapStateToProps = (state, ownProps) => ({
        active: ownProps.filter === state.visibilityFilter
    }),
    mapDispatchToProps = (dispatch, ownProps) => ({
        onClick () {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }),
    FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link);

export default FilterLink;
