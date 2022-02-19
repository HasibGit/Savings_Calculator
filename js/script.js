
// Checks validity of the user inputs

function isValidInput(input, element) {
    const errorField = document.getElementById(element + '-error');
    // not a number
    if (isNaN(input)) {
        errorField.innerText = "* Input value needs to be a number";
        return false;
    }
    else {

        // empty input field
        if (input.length == 0) {
            errorField.innerText = "* Input field cannot be empty";
            return false;
        }


        const value = parseFloat(input);
        // negative value
        if (value < 0) {
            errorField.innerText = "* Input value needs to be a positive number";
            return false;
        }
        else {
            // percentage value out of range
            if (element == 'save' && value > 100) {
                errorField.innerText = "* Percentage value needs to be inbetween 0 and 100";
                return false;
            }

            errorField.innerText = "";
            return true;
        }
    }
}


// Validations involved in the calculation of saving amount

function saveValidation(savePercentage) {
    const errorField = document.getElementById('save-error');
    const income = document.getElementById('income').value;
    const balance = document.getElementById('balance').innerText;

    let con1 = isValidInput(income, 'income');
    let con2 = false;
    if (!isNaN(balance) && balance.length > 0) {
        console.log('Hree');
        con2 = true;
    }

    if (con1 && con2) {
        const savingAmount = (parseFloat(income) * savePercentage) / 100;
        if (savingAmount > parseFloat(balance)) {
            errorField.innerText = "* Insufficient fund. Savings cannot exceed balance.";
            return false;
        }
        else {
            errorField.innerText = "";
            return true;
        }
    }
    else {
        errorField.innerText = "* Income or balance is not set properly";
        return false;
    }
}


// clear the input fields values

function clearInputField(elementId) {
    document.getElementById(elementId).value = '';
}


// reset all fields 

function resetFields() {
    clearInputField('income');
    clearInputField('food');
    clearInputField('rent');
    clearInputField('clothes');
    clearInputField('save-percentage');


    document.getElementById('expense').innerHTML = `<svg
    style="height: 25px; width: 25px; color: red;" xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
</svg>`;

    document.getElementById('balance').innerHTML = `<svg
    style="height: 25px; width: 25px; color: red;" xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
</svg>`;

    document.getElementById('savings').innerHTML = `<svg
    style="height: 25px; width: 25px; color: red;" xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
</svg>`;

    document.getElementById('remains').innerHTML = `<svg
    style="height: 25px; width: 25px; color: red;" xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
</svg>`;
}


// Balance and expense calculation 

document.getElementById('calculate-btn').addEventListener('click', function () {
    const income = document.getElementById('income').value;
    const food = document.getElementById('food').value;
    const rent = document.getElementById('rent').value;
    const clothes = document.getElementById('clothes').value;

    const con1 = isValidInput(income, 'income');
    const con2 = isValidInput(food, 'food');
    const con3 = isValidInput(rent, 'rent');
    const con4 = isValidInput(clothes, 'clothes');

    if (con1 && con2 && con3 && con4) {
        const expenses = parseFloat(food) + parseFloat(rent) + parseFloat(clothes);

        const errorField = document.getElementById('debit-credit-error');
        if (expenses > parseFloat(income)) {
            errorField.innerText = "* Your expense cannot exceed your total income."
        }
        else {
            errorField.innerText = "";
            document.getElementById('expense').innerText = expenses;
            const balance = parseFloat(income) - expenses;

            document.getElementById('balance').innerText = balance;
        }
    }
})



// Savings and remainingBalance calculation 

document.getElementById('save=btn').addEventListener('click', function () {
    let savePercentage = document.getElementById('save-percentage').value;

    if (isValidInput(savePercentage, 'save'));

    savePercentage = parseFloat(savePercentage);

    if (saveValidation(savePercentage)) {
        const income = document.getElementById('income').value;

        const balance = parseFloat(document.getElementById('balance').innerText);

        const savingAmount = (income * savePercentage) / 100;

        document.getElementById('savings').innerText = savingAmount;

        const remainingBalance = balance - savingAmount;

        document.getElementById('remains').innerText = remainingBalance;
    }
})


// Clear all fields 

document.getElementById('reset').addEventListener('click', function () {
    resetFields();
})
