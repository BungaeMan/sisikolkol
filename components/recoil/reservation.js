import {atom} from "recoil"

export const ReservationStatus = atom({
    key:"reservationStatus",
    default: {
        id: null
    },
});