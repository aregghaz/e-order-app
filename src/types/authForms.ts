export type SignUpFormValues = {
  user: string
  email: string
  password: string
  agree: boolean
  newsletter: boolean
}

export type SignInFormValues = {
  phone: string
  password: string
  confirm: boolean
}
export interface IProfile {
  firstName: string
  lastName: string
  fatherName: string
  address: {
    // "country": "string",
    // "state": "string",
    // "city": "string",
    address_1: string
    address_2: string
    postCode: string
    phoneNumber1: string
    ///   phoneNumber2: string,
    // "gpsCoordinates": {
    //     "latitude": "string",
    //     "longitude": "string"
    // }
  }
  inn: string
  birthDate: string
  citizenship: {
    citizenship: string
    passport: string
    issuedBy: string
    issueDate: string
    // "passportPhoto": [
    //     {
    //         "id": "string",
    //         "originalName": "string",
    //         "filename": "string",
    //         "path": "string",
    //         "mimetype": "string",
    //         "size": 0,
    //         "order": 0,
    //         "createdAt": "2023-08-25T09:12:24.462Z",
    //         "updatedAt": "2023-08-25T09:12:24.462Z"
    //     }
    // ]
  }
  email: string
  // "photo": {
  //     "id": "string",
  //     "originalName": "string",
  //     "filename": "string",
  //     "path": "string",
  //     "mimetype": "string",
  //     "size": 0,
  //     "order": 0,
  //     "createdAt": "2023-08-25T09:12:24.462Z",
  //     "updatedAt": "2023-08-25T09:12:24.462Z"
  // }
}
export const IPropsData = {
  customer: {
    person: '',
    address: {},
    birthDate: '',
    citizenship: '',
    email: '',
    fatherName: '',
    firstName: '',
    inn: '',
    issueDate: '',
    issuedBy: '',
    lastName: '',
    passport: '',
  },
  id: '',
}
