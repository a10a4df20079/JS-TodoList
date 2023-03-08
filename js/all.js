const nikeName = document.querySelector("#login-name");
const account = document.querySelector("#login-account");
const password = document.querySelector("#login-pwd");
const signUpBtn = document.querySelector('#sign-send');
const logInBtn = document.querySelector('.login-send');
//console.log(nikeName,account,signUpBtn);
signUpBtn.addEventListener('click',function(e){
   callSingUp()//執行函式內容
})
logInBtn.addEventListener('click',function(e){
    
})


function callSingUp(){
   if(account.value==""||password.value==""){
    alert("請填寫正確資訊");
    return;
   } 
   let obj = {};
   obj.email = account.value;
   obj.password = password.value;
   console.log(obj);
   axios.post('https://hex-escape-room.herokuapp.com/api/user/signup', obj)
   .then(function(response){
    if(response.data.message=="帳號註冊成功"){
        alert("恭喜帳號註冊成功!請重新登入!");
    }else{
        alert("此帳號已重複，請重新填寫")
    };
   })
   .catch(function(error){
    console.log(error);
   });

}