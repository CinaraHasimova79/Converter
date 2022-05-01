converter1 = document.querySelectorAll('.converter1');
converter2 = document.querySelectorAll('.converter2');
firstinput = document.querySelector('.firstinput');
secondinput = document.querySelector('.secondinput');
paragraf1 = document.querySelector('.paragraf1');
paragraf2 = document.querySelector('.paragraf2');

con1val = 'RUB';
con2val = 'USD';
target = 0;


function convert(con1val, con2val, target) {
    let a = con1val;
    let b = con2val;
    let c = target;

    if (c == 0 || c == 1) {
        fetch(`https://api.exchangerate.host/latest?base=${a}&symbols=${b}`)
            .then(res => res.json())
            .then(data => {
                if (firstinput.value.includes(',') == true) {
                    firstinput.value = firstinput.value.split(',').join('.');
                }
                if (isNaN(firstinput.value)) {
                    errorsend('Please include a number');
                }
                secondinput.value = firstinput.value * data.rates[b];
            })
            .catch(error => {
                errorsend('Something went wrong');
                console.log(error);
            })

    } else if (c == 2) {
        fetch(`https://api.exchangerate.host/latest?base=${b}&symbols=${a}`)
            .then(res => res.json())
            .then(data => {
                if (secondinput.value.includes(',') == true) {
                    secondinput.value = secondinput.value.split(',').join('.');
                }
                if (isNaN(secondinput.value)) {
                    errorsend('Please include a number');
                }
                firstinput.value = secondinput.value * data.rates[a];
            })
            .catch(error => {
                errorsend('Something went wrong');
                console.log(error);
            })
    }
}
convert(con1val, con2val, target);

function displaycur(con1val, con2val) {

    let a = con1val;
    let b = con2val;

    fetch(`https://api.exchangerate.host/latest?base=${b}&symbols=${a}`)
        .then(res => res.json())
        .then(data => {
            paragraf2.innerHTML = `1 ${b} = ${data.rates[a]} ${a}`;
        })
        .catch(error => {
            errorsend('Something went wrong');
            console.log(error);
        })

    fetch(`https://api.exchangerate.host/latest?base=${a}&symbols=${b}`)
        .then(res => res.json())
        .then(data => {
            paragraf1.innerHTML = `1 ${a} = ${data.rates[b]} ${b}`;
        })
        .catch(error => {
            errorsend('Something went wrong');
            console.log(error);
        })
}
displaycur(con1val, con2val)

firstinput.addEventListener('keyup', () => {
    target = 1;
    convert(con1val, con2val, target);

})
secondinput.addEventListener('keyup', () => {
    target = 2;
    convert(con1val, con2val, target)
})

converter1.forEach(but1 => {
    but1.addEventListener('click', () => {
        converter1.forEach(btn1 => {
            btn1.classList.remove('con1')
        })
        but1.classList.add('con1');
        con1val = but1.innerText;
        convert(con1val, con2val, target);
        displaycur(con1val, con2val);
    })
});

converter2.forEach(but2 => {
    but2.addEventListener('click', () => {
        converter2.forEach(btn2 => {
            btn2.classList.remove('con2')
        })
        but2.classList.add('con2');
        con2val = but2.innerText;
        convert(con1val, con2val, target);
        displaycur(con1val, con2val);
    })
});