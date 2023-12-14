import axiosApp from "../../axios/axiosApp"
import axios from 'axios'
import { CodeMirrorTestPageSET_MODE, CodeMirrorTestPageSET_NEW_DOCKER_CODE } from "./actionTypes"


export interface TsetMode {
    type: typeof CodeMirrorTestPageSET_MODE,
    mode: string
}
export const setMode = ( mode: string ): TsetMode => {
    return {
        type: CodeMirrorTestPageSET_MODE,
        mode
    }
}


export const postCode = async ( code: string, pr_ln: string ) => {
        try {
            const request = await axiosApp.post(`http://127.0.0.1:5000/code/${ pr_ln }`, {
                code: code
            })
            const response = request.data;
            console.log(response)
            return response
        } catch (error) {
            console.error( "Post code to docker codeMirror error " , error)
            return error
        }
    
}
// export const postCode = ( code: string, pr_ln: string ) => {
//     console.log("AAAA")
//     return async ( dispatch: any ) => {
//         try {
//             console.log("BBBB")
//             const request = await axios.post(`http://127.0.0.1:5000/code/${ pr_ln }`, {
//                 code: code
//             })
//             const response = request.data;
//             console.log(response)
//             dispatch( setNewDockerCode(response.output) )
//         } catch (error) {
//             console.error( "Post code to docker codeMirror error " , error)
//             dispatch( setNewDockerCode("Error") )
//         }
//     }
// }
interface IsetNewDockerCode {
    type: typeof CodeMirrorTestPageSET_NEW_DOCKER_CODE,
    code: string
}

const setNewDockerCode = ( code: string ): IsetNewDockerCode => {
    return {
        type: CodeMirrorTestPageSET_NEW_DOCKER_CODE,
        code: code
    }
}


export type TCodeMirrorAction = TsetMode | IsetNewDockerCode