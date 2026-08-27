import {SERVICE_URL} from './constants/Services';

export function getAiBase() {
  const cms = String(SERVICE_URL || '').replace(/\/$/, '');
  return cms ? `${cms}/v1/ai` : '';
}

export function generateHeaders() {
  const token =
    (typeof localStorage !== 'undefined' &&
      (localStorage.getItem('accessToken') || localStorage.getItem('token'))) ||
    '';
  return {
    'Content-Type': 'application/json',
    ...(token ? {Authorization: `Bearer ${token}`} : {}),
  };
}

export function generateErrorMessage(res, data) {
  if (res.status === 401) {
    return 'Sign in to Studio to generate.';
  }
  if (res.status === 429) {
    return data.error || data.message || 'Daily generate limit reached.';
  }
  return data.error || data.message || `Generation failed (${res.status})`;
}
