const BASE_URL = process.env.REACT_APP_BASE_URL 
export const auth = {
    LOGIN_API : BASE_URL + "/user/login" ,
    SIGNUP_API : BASE_URL + "/user/signup" ,
    SEND_OTP_API : BASE_URL + "/user/sendOtp",
    RESET_PASSWORD_TOKEN_API : BASE_URL + "/user/resetPasswordToken",
    RESET_PASSWORD_API : BASE_URL + "/user/resetPassword",
}
export const profile = {
    CHANGE_AVTAR_API : BASE_URL + "/user/changeAvtarUrl" ,
}