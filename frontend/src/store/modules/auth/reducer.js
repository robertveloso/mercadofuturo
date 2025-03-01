import produce from 'immer';

const INITIAL_STATE = {
  user_id: null,
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.user_id = action.payload.user.id;
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_UP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_UP_SUCCESS': {
        draft.user_id = action.payload.user.id;
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_UP_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/ADD_CLIENT_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/ADD_CLIENT_FINISHED': {
        draft.loading = false;
        break;
      }
      case '@auth/ADD_COMPANY_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/ADD_COMPANY_FINISHED': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.user_id = null;
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
