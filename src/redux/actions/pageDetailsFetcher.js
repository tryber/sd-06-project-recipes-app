import { fetchMainPage } from '../../services/fetchMainPage';
import invertPathName from '../../utils/invertPathName';
import resizeFetchReturn from '../../utils/resizeFetchReturn';

export const LOADING_RECOMMENDATIONS = 'LOADING_RECOMMENDATIONS';
export const ERROR_RECOMMENDATIONS = 'ERROR_RECOMMENDATIONS';
export const SUCCESS_RECOMMENDATIONS = 'SUCCESS_RECOMMENDATIONS';

function loading(payload = true) {
  return {
    type: LOADING_RECOMMENDATIONS,
    payload,
  };
}

function success(data) {
  const maxLength = 6;
  const payload = resizeFetchReturn(data, maxLength);
  return { type: SUCCESS_RECOMMENDATIONS, payload };
}

function error(failed) {
  return { type: ERROR_RECOMMENDATIONS, error: failed };
}

export default function recomendationsThunk(path) {
  const newPath = invertPathName(path);
  return (dispatch) => {
    dispatch(loading());
    fetchMainPage(`/${newPath}`)
      .then(
        (response) => dispatch(success(response)),
        (failed) => dispatch(error(failed)),
      ).then(() => dispatch(loading(false)));
  };
}
