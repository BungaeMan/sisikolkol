import {atom} from "recoil"

export const LoginStatus = atom({
    key:"loginStatus",
    default: false,
});

export const UserInfo = atom({
    key:"userInfo",
    default: {
        id: "",
        nickName: "",
    },
});