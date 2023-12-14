import axiosApp from "../../axios/axiosApp"

// typse 
import { TgetProfileData } from "../../types/ProfileTypes"
import { prfilePageSET_PROFILE_DATA, prfilePageSET_EDIT_MODE, prfilePageSET_AVATAR, prfilePageCHANGE_USER_NAME } from "./actionTypes"


interface Tacss {
    type: number
}
export const acss = (): Tacss => {
    return {
        type: 0
    }
}


//////////////////     REST 

export const getProfileData = () => {
    return async ( dispatch: any ) => {
        try {
            const request = await axiosApp.get(`profile/${ localStorage.getItem("userName") }?token=${ localStorage.getItem("token")}`)
            const response = request.data
            localStorage.setItem("userAvatar", response.avatar )
            dispatch( setProfileData(response) )
        } catch (error) {
            console.error(" Get Profile data error ( ProfileAction ) ", error )
        }
        
    }
}

export const sendChangedProfileData = ( userName: string, avatar: any ) => {
    let profileData = new FormData();
        profileData.set("nickname", userName )
        profileData.set("avatar", avatar )
        profileData.set("token", localStorage.getItem("token") || '{}'  )



    // let wholeId: string = "123"
    // let localId: string = "0"
    // let info: string = "fileOrImage"
    // let type: string = "type"
    
    // let dataFD = new FormData();
    // dataFD.append("wholeId", wholeId)

    // dataFD.append("localId", localId)
    // dataFD.append("info", info)
    // dataFD.append("type", type)

    // dataFD.append("localId", localId)
    // dataFD.append("info", info)
    // dataFD.append("type", type)
    


    return async ( dispatch: any ) => {
        
        try {
            const request = await axiosApp.put(`edit/profile`, profileData  , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })
            const response = request.data

            if ( !response.error ) {
                localStorage.setItem("userName", userName )
            }
        } catch (error) {
            console.error(" Send Changed Profile data error ( ProfileAction ) ", error )
        }
    }
}


export const sendTestData = () => {
    
}


//////////////////////   Setters 
interface TsetProfileData {
    type: typeof prfilePageSET_PROFILE_DATA,
    profileData: TgetProfileData
}
const setProfileData = ( profileData: TgetProfileData ): TsetProfileData => {
    return {
        type: prfilePageSET_PROFILE_DATA,
        profileData
    }
}

interface TchangeEditMode {
    type: typeof prfilePageSET_EDIT_MODE
}
export const changeEditMode = (): TchangeEditMode => {
    return {
        type: prfilePageSET_EDIT_MODE
    }
}

//////////   SET IMAGE TYPE !!!!!!!!!!!

interface TsetAvatar {
    type: typeof prfilePageSET_AVATAR,
    image: any
}
export const setAvatar = ( image: any ): TsetAvatar => {
    return {
        type: prfilePageSET_AVATAR,
        image
    }
} 

interface TchangeUserName {
    type: typeof prfilePageCHANGE_USER_NAME,
    userName: string
}
export const changeUserName = ( userName: string ): TchangeUserName => {
    return {
        type: prfilePageCHANGE_USER_NAME,
        userName
    }
}

export type ActionsType = TsetProfileData | TchangeEditMode | TsetAvatar | TchangeUserName