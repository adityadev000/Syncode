const BASE_URL = process.env.REACT_APP_BASE_URL 
export const auth = {
    LOGIN_API : BASE_URL + "/user/login" ,
    SIGNUP_API : BASE_URL + "/user/signup" ,
    SEND_OTP_API : BASE_URL + "/user/sendOtp",
    RESET_PASSWORD_TOKEN_API : BASE_URL + "/user/resetPasswordToken",
    RESET_PASSWORD_API : BASE_URL + "/user/resetPassword",
}
export const profile = {
    CHANGE_AVTAR_API : BASE_URL + "/user/changeAvtar" ,
    UPDATE_PROFILE_API : BASE_URL + "/user/updateProfile" ,
    GET_USER_DETAILS_API : BASE_URL + "/user/getUserDetails" ,
}
export const project = {
    GET_PROJECT_DETAILS_API : BASE_URL + "/project/getProjectDetails" ,
    GET_FILE_CONTENT_API : BASE_URL + "/project/getFileContent" ,
    CREATE_PROJECT_API : BASE_URL + "/project/createProject" ,
    RENAME_PROJECT_NAME_API : BASE_URL + "/project/renameProjectName" ,
    RENAME_FILE_NAME_API : BASE_URL + "/project/renameFileName" ,
    RENAME_FOLDER_NAME_API : BASE_URL + "/project/renameFolderName" ,
}