document.getElementById('nons').addEventListener('click', function(event){
    password1 = document.getElementById('pwd1').value;
    password2 = document.getElementById('pwd').value;
    if(password1!==password2){
        event.preventDefault();
        document.getElementById('pwdalert').classList.remove('d-none');
    }
})

document.getElementById('pwd1').addEventListener('keyup', function(event){
    password1 = document.getElementById('pwd1').value;
    password2 = document.getElementById('pwd').value;
    if(password1!==password2){
        document.getElementById('pwdalert').classList.remove('d-none');
    }
    else if(password1!=='' && password1===password2){
        document.getElementById('pwdalert').classList.add('d-none');
        document.getElementById('pwdsuccess').classList.remove('d-none');
    }
    else if(password1==='' && password2===''){
        document.getElementById('pwdalert').classList.add('d-none');
        document.getElementById('pwdsuccess').classList.add('d-none');
    }
  
})
document.getElementById('pwd').addEventListener('keyup', function(event){
    password1 = document.getElementById('pwd1').value;
    password2 = document.getElementById('pwd').value;
    if(password1!=='' && password1!==password2){
        document.getElementById('pwdalert').classList.remove('d-none');
    }
    else if(password1!=='' && password1===password2){
        document.getElementById('pwdalert').classList.add('d-none');
        document.getElementById('pwdsuccess').classList.remove('d-none');
    }
    else if(password1==='' && password2===''){
        document.getElementById('pwdalert').classList.add('d-none');
        document.getElementById('pwdsuccess').classList.add('d-none');
    }
  
})



document.getElementById('pwd1').addEventListener('focus', function(event){   
password1 = document.getElementById('pwd1').value;
password2 = document.getElementById('pwd').value;
if(password1!==password2){
    document.getElementById('pwdsuccess').classList.add('d-none');
    document.getElementById('pwdalert').classList.remove('d-none');
}
else if(password1!=='' && password1===password2){
    document.getElementById('pwdalert').classList.add('d-none');
    document.getElementById('pwdsuccess').classList.remove('d-none');
}
})

document.getElementById('pwd').addEventListener('focus', function(event){   
    password1 = document.getElementById('pwd1').value;
    password2 = document.getElementById('pwd').value;
    if(password1!==password2){
        document.getElementById('pwdsuccess').classList.add('d-none');
        document.getElementById('pwdalert').classList.remove('d-none');
    }
    else if(password1!=='' && password1===password2){
        document.getElementById('pwdalert').classList.add('d-none');
        document.getElementById('pwdsuccess').classList.remove('d-none');
    }
    })


