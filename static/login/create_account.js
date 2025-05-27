const loginInputs = []
const passwordInputs = []

for (input of document.querySelectorAll('input')) {
    // console.log(input)
    loginInputs.push(input.id)
    if (input.type == "password") {
        passwordInputs.push(input)
    }
}

// console.log(passwordInputs)

function validateInput(id) {
    let input = document.getElementById(id)

    if (input === undefined) {
        console.error(`Input not found: ${id}`)
        return false
    }

    // console.log(input)

    switch (input.dataset.check) {
        case "email":
            console.log("EMAIL")
            break
        case "password":
            console.log("PASSWORD")
            break
        default:
            console.error(`check type '${loginInputs[index].dataset.check}' does not exist!`)
    }
}

console.log(loginInputs)
// console.log(loginInputs[0].dataset.check)