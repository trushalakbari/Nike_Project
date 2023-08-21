export default function Validation(data, type) {

    const err = []

    const { firstName, lastName, email, password, fullName, role } = data

    if (type == "register") {

        // For FirstName 
        if (!firstName) {
            err.push({ key: "firstName", message: "Please Enter FirstName" })
        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(firstName))) {
            err.push({ key: "firstname", message: "Invalid firstName" })
        }


        // For LastName 
        if (!lastName) {
            err.push({ key: "lastName", message: "Please Enter lastName " })

        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(lastName))) {

            err.push({ key: "lastName", message: "Invalid lastName" })
        }



        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }
    } else if (type === "admin-register") {

        if (!fullName) {
            err.push({ key: "firstName", message: "Please Enter FirstName" })
        } else if (!(/^[a-zA-Z '.-]{2,10}$/.test(firstName))) {
            err.push({ key: "firstname", message: "Invalid firstName" })
        }

        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        }
        else if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }

        if (!role) {
            err.push({ key: "role", message: "Please Enter Role" })
        }
        else if (role.length <= 2 && (/^([^0-9]*)$/.test(role))) {
            err.push({ key: "role", message: "Invalid role" })
        }

    }
    else {
        // For Email
        if (!email) {
            err.push({ key: "email", message: "Please Enter email" })
        }
        else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            err.push({ key: "email", message: "Inavalid Email" })
        }

        //For Password
        if (!password) {
            err.push({ key: "password", message: "Please Enter password" })
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password))) {
            err.push({ key: "password", message: "Password is To Weak Plaese Enter Strong Password " })
        }
    }
    return err
}




