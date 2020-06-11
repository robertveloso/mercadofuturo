export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_IN_FAILURE',
  };
}

/* SignUp */
export function signUpRequest({
  handle,
  email,
  document,
  password,
  handleNext,
}) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      handle,
      email,
      document,
      password,
      handleNext,
    },
  };
}

export function signUpSuccess(token, user) {
  return {
    type: '@auth/SIGN_UP_SUCCESS',
    payload: { token, user },
  };
}

export function signUpFailure() {
  return {
    type: '@auth/SIGN_UP_FAILURE',
  };
}

/* addClient */
export function addClient({ first_name, last_name, phone }) {
  return {
    type: '@auth/ADD_CLIENT_REQUEST',
    payload: { first_name, last_name, phone },
  };
}

export function addClientFinished() {
  return {
    type: '@auth/ADD_CLIENT_FINISHED',
  };
}

/* addCompany */
export function addCompany({
  company_name,
  description,
  address,
  site,
  phone,
}) {
  return {
    type: '@auth/ADD_COMPANY_REQUEST',
    payload: { company_name, description, address, site, phone },
  };
}

export function addCompanyFinished() {
  return {
    type: '@auth/ADD_COMPANY_FINISHED',
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
