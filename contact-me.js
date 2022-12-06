// TODO
document.addEventListener("DOMContentLoaded",function(){

    //DOM references to the fields I want to validate
        const firstName = document.getElementById("first-name")
        const lastName = document.getElementById("last-name")
        const email = document.getElementById("email")
        const form = document.querySelector("form")
        const website = document.getElementById("website")
        const jobTitle = document.getElementById("job-title")
        const language = document.querySelector("select#language")
        const selectEl = document.getElementById('contact-kind');
        const textArea = document.querySelector("textarea.textarea")
   
        function checkStringLength(inputValue){
            if (inputValue.value.length < 3){
                allValid = false;
                inputValue.validity.valid = false;
                inputValue.classList.add("invalid")
                inputValue.setCustomValidity(`Name entered is too short, it's only ${inputValue.value.length} charachters`)
                inputValue.reportValidity()
            } else {
                allValid = true;
                inputValue.validity.valid = true;
                inputValue.classList.remove("invalid")
                inputValue.setCustomValidity("")
            }
        }
        function checkMessageLength(inputValue){
            if (inputValue.value.length < 3){
                allValid = false;
                inputValue.validity.valid = false;
                inputValue.classList.add("invalid")
                inputValue.setCustomValidity(`Message entered is too short, it's only ${inputValue.value.length} charachters`)
                inputValue.reportValidity()
            } else {
                allValid = true;
                inputValue.validity.valid = true;
                inputValue.classList.remove("invalid")
                inputValue.setCustomValidity("")
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
        function checkWebsite(e){
            console.log("Check website function")
            console.log("input value", website.value)            
            regex = /https?\:\/\/.+\..+/
            if(website.value.match(regex)){
                allValid = true
                website.validity.valid = true;
                website.classList.remove("invalid")
                website.setCustomValidity("")
                //console.log("True")
            } else{
                allValid = false
                website.validity.valid = false;
                website.classList.add("invalid")
                website.setCustomValidity(`Please enter a valid website`)
                website.reportValidity()
                //console.log("False")
            }
            if(!allValid){
                e.preventDefault()
                console.log("Bad input")
            };
        }  
       
        function checkLanguage(e){
            console.log("check language function")
            console.log("language value", language.value)
            if (language.value === 'choose'){
                console.log("matches choose")
                allValid = false
                language.validity.valid = false;
                //language.classList.add("invalid")
                //language.required = true;
                language.setCustomValidity('Must select an option');
                return;
            } else{
                console.log("doesnt match choose")
                allValid = true
                language.validity.valid = true;
                language.classList.remove("invalid")
                language.setCustomValidity("")
            }
            if(!allValid){
                e.preventDefault()
                console.log("Bad input")
            };
        }
    //Check validation
        function checkValidation(e){
            allValid = false;
            checkStringLength(firstName)
            checkStringLength(lastName)
            checkEmail(email)
            checkMessageLength(textArea)
            //checkWebsite(website)
            //Safeguard to prevent the page from reloading        
            if(!allValid){
                e.preventDefault()
                console.log("Bad input")
            };
        
        }
    //Select option for job opportunity
        const selectOption = function(){
            if (selectEl.value === 'choose'){
                //allValid = false
                //selectEl.setCustomValidity('Must select an option');
                //selectEl.classList.add("invalid")
                return;
            }
            console.log("selectEl", selectEl)
            const jobEl = document.querySelector('#job');
            const talkEl = document.querySelector('#talk')
            if (selectEl.value === 'job'){
                selectEl.classList.remove("invalid")
                website.addEventListener("change",(e) => {
                    checkWebsite(e)})
                jobEl.classList.remove('hide');
                talkEl.classList.add('hide');
                jobEl.querySelector('input').required = true;
                talkEl.querySelector('option').required = false;
                allValid = true
                selectEl.setCustomValidity('');
                return;
                
            } else {
                selectEl.classList.remove("invalid")
                console.log("language listener", language)
                console.log("selectEl", selectEl.innerText)
                jobEl.classList.add('hide');
                talkEl.classList.remove('hide');
                jobEl.querySelector('input').required = false;
                talkEl.querySelector('option').required = true;
                checkLanguage()
                language.addEventListener("change",(e) => {
                    checkLanguage(e)})
                allValid = true
                selectEl.setCustomValidity('');
            }
        };
        const selectOptionSubmit = function(){
            if (selectEl.value === 'choose'){
                allValid = false
                selectEl.setCustomValidity('Must select an option');
                selectEl.classList.add("invalid")
                return;
            }
            if(!allValid){
                e.preventDefault()
                console.log("Bad input")
            };
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
        textArea.addEventListener("change", (e) => {
            checkValidation(e)
        }) 
        selectOption()
        selectEl.addEventListener('change',selectOption)
        form.addEventListener('submit', (e) => {
            checkValidation(e)
            selectOptionSubmit()
            console.log("submit")
        })  
    });