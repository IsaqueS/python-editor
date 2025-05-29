const loginInputs = []
const passwordInputs = []
const finalElement = document.getElementById("login-button")

for (input of document.querySelectorAll('input')) {
    // console.log(input)
    loginInputs.push(input.id)
    if (input.type == "password") {
        passwordInputs.push(input.id)
    }
}

function focusNextInput(index) {
    if (loginInputs.length > index + 1) {
        document.getElementById(loginInputs[index + 1]).focus()
    } else {
        finalElement.focus()
    }
}

function validateAllInputs() {
    let loginInfo = {
        email: null,
        password: null
    }

    // let passwords = new Map()

    for (inputId of loginInputs) {
        let input = document.getElementById(inputId)
        // console.log(inputId)
        
        if (passwordInputs.includes(inputId)) {
            // passwords.set(input.value, (passwords.get(input.value) || 0) + 1)
            loginInfo.password = input.value
        } else if (input.dataset.check == "email") {
            if (input.value.includes("@")) {
                loginInfo.email = input.value.toLowerCase()
            } else {
                return "Email está incorreto."
            }
        }
    }

    // if (passwords.size > 1) {
    //     return "As senhas são diferentes"
    // }

    return loginInfo
}

async function login() {
    let result = validateAllInputs()

    if (typeof result === "string") {
        alert(result)
        return false
    }

    // console.log("Trying to send to the server...")
    // console.log(JSON.stringify(result))

    try {
        const response = await fetch("/login/data/", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(result)
            }
        )

        if (!response.ok) {
            throw new Error(`HTTP ERROR: ${response.status}`)
        }

        const responseData = await response.json()

        console.log(responseData)


    } catch (error) {
        console.error(error.message)
    }
}

function validateInput(id) {
    let input = document.getElementById(id)

    if (input === undefined) {
        console.error(`Input not found by id: ${id}`)
        return false
    }

    const index = loginInputs.indexOf(id)

    // console.log(input)

    switch (input.dataset.check) {
        case "email":
            if (input.value.includes("@")) {
                focusNextInput(index)
            } else {
                alert("O email não é valido, será que você digitou errado?")
                return false
            }
            break
        case "password":
            console.log("PASSWORD")

            focusNextInput(index)

            break
        default:
            console.error(`check type '${loginInputs[index].dataset.check}' does not exist!`)
    }
}

// console.log(loginInputs)
// console.log(loginInputs[0].dataset.check)
console.log(passwordInputs)