// Another way to toggle hidden fields

const selector = document.getElementById("contact-kind")

const selectOption = ()=> {
    const selection = selector.value
    const prevField = document.querySelector('.show')
    const activeField = document.getElementById(selection)

    if(prevField){
        prevField.classList.add('hidden')
        prevField.classList.remove('show')
    };
    activeField.classList.remove("hidden")
    prevField.classList.add('show')
}