export interface TgetProfileData {
    Owner: boolean
    avatar: string
    courses: Array<TgetProfileDataCourses>
}

export type TgetProfileDataCourses = {
    avatar: string
    course_name: string
    id: number
    progress: number
}