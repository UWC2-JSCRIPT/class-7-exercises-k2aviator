document.addEventListener("DOMContentLoaded",function(){

//DOM references to the fields I want to validate
    const firstName = document.getElementById("first-name")
    const lastName = document.getElementById("last-name")
    const email = document.getElementById("email")
    const form = document.querySelector("form")

    function checkStringLength(inputValue){
        if (inputValue.value.length < 3){
            allValid = false;
            inputValue.validity.valid = false;
            inputValue.classList.add("invalid")
            inputValue.setCustomValidity(`Name entered is too short, it's only ${inputValue.value.length} charachters`)
            inputValue.reportValidity()
            //console.log("incorrect:", inputValue.value)
            //console.log(inputValue.value.length)
        } else {
            allValid = true;
            inputValue.validity.valid = true;
            inputValue.classList.remove("invalid")
            inputValue.setCustomValidity("")
            //console.log("ok:", inputValue.value)
            //console.log(inputValue.value.length)
        }
    }

    function checkEmail(inputValue){
        regex = /\w+@\w+\.\w+/
        if(inputValue.value.match(regex)){
            allValid = true
            inputValue.validity.valid = true;
            inputValue.classList.remove("invalid")
            inputValue.setCustomValidity("")
            //console.log("True")
        } else{
            allValid = false
            inputValue.validity.valid = false;
            inputValue.classList.add("invalid")
            inputValue.setCustomValidity(`Please enter a valid email`)
            inputValue.reportValidity()
            //console.log("False")
        }
    }

//Check validation
    function checkValidation(e){
        allValid = false;
        checkStringLength(firstName)
        checkStringLength(lastName)
        checkEmail(email)
        //Safeguard to prevent the page from reloading        
        if(!allValid){
            e.preventDefault()
            console.log("Bad input")
        };
    
    }
//Work with hidden fields
    const selectEl = document.getElementById('contact-kind');

    const setSelectValidity = function(){
        if (selectEl.value === 'choose'){
            selectEl.setCustomValidity('Must select an option');
            return;
        }
        const businessEl = document.querySelector('.business');
        const technicalEl = document.querySelector('.technical')

        if (selectEl.value === 'business'){
            businessEl.classList.remove('hide');
            technicalEl.classList.add('hide');
            businessEl.querySelector('input').required = true;
            technicalEl.querySelector('input').required = false;
        } else {
            businessEl.classList.add('hide');
            technicalEl.classList.remove('hide');
            businessEl.querySelector('input').required = false;
            technicalEl.querySelector('input').required = true;
        }
    };


//Need to listen to submit action 
//Use (e) to grab event object

    firstName.addEventListener("change", (e) => {
        checkValidation(e)
    }) 
    lastName.addEventListener("change", (e) => {
        checkValidation(e)
    })
    email.addEventListener("change", (e) => {
        checkValidation(e)
    })  
    selectEl.addEventListener('change',setSelectValidity)

    form.addEventListener('submit', (e) => {
        checkValidation(e)
        setSelectValidity
    })
});