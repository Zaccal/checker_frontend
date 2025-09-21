export const PUBLIC_PATHS = [
  '/auth/forgot-password',
  '/auth/magic-link/verify',
  '/auth/otp-code/verify',
  '/auth/reset-password',
  '/auth/forgot-password/',
  '/login',
  '/',
]

export const ICON_RENDER_LIMIT = 128
export const VERIFICATION_AUTH_CODE = 'VERIFICATION_EMAIL_ISNT_ENABLED'

export const SIDEBAR_STATE_KEY = 'sidebar:state'

export const passwordRequirements = [
  { regex: /.{8,}/, text: 'At least 8 characters' },
  {
    regex: /[0-9!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\;/']/,
    text: 'At least 1 number or symbol',
  },
  { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
  { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
]

export const TAGS_QUERY_KEY = 'tags'
export const LISTS_QUERY_KEY = 'lists'
