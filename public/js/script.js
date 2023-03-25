const form = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

form.addEventListener('submit',(event) => {

    event.preventDefault();
    const address = input.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?search=${address}`).then((respose) => {

        return respose.json();
    }).then((res) => {

        if(res.error)
        {
           messageOne.textContent = res.error;
        }
        else
        {
           messageOne.textContent = res.location;
           messageTwo.textContent = res.weather;
        }
    }).catch((error) => {

        console.log(error);
    })

});