export type MyCoursesPropsType = {
    access?: boolean
    id: number
    section_name: string
    isEdit: boolean
}

export interface TMyCoursesSquares {
    access?: boolean
    class_name: string
    id: number
    isEdit: boolean
}
//======================================
export type TCourseComponent = {
    avatar: string
    course_name: string
    scope: string
    id: number
    moderated: string
    about: string
    exp_before: string
    exp_after: string
}




////////////////////////////////////////////  Fourth stage reducer array types 


//////    Test  & Theory 

export interface TTestDataTestAndTheory {
    access?: boolean
    id: number
    test: boolean

    info_title: string
    info_text: Array<string>
    answer: any
    // rightAnswer: number
    info: Array<Iinfo>
    
}

export interface IAddingContent {
    type: string
    // text: string
    // image?: any
    // video?: any
    // code?: string
    content: any
}

export interface Iinfo {
    id: number
    info: string
    type: string
    pr_ln?: string
}
/// save
// export interface TTestDataTestAndTheory {
//     access?: boolean
//     answer: string
//     info_text: Array<string>
//     rightAnswer: number
//     test: boolean
//     testId: number
// }
//======================

