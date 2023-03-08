//註冊相關
const singupBtn = document.getElementById('singup-btn');
const loginBtn = document.getElementById('login-return');
const singupName = document.getElementById('singup-name');
const singupEmail = document.getElementById('singup-account');
const userName = document.getElementById('username');
//密碼確認
const password = document.getElementById('singup-pwd');
const passworda = document.getElementById('singupa-pwd');
//登入相關
//const login = document.getElementById('login');
const loginEmail = document.getElementById('login-account');
const loginPWD = document.getElementById('login-pwd');
const loginSend = document.getElementById('login-send');
const singupSend = document.getElementById('singup-send');
//登出相關
const logOut = document.getElementById('logout');

//todolist綁訂相關
const container = document.getElementById('container');

singupSend.addEventListener('click',function(e){
    if(login.style= "display:none")
    singup.style = "display:block";   
});
loginBtn.addEventListener('click',function(e){
    if(singup.style = "display:none")
    login.style = "display:block";
})

//註冊axios
singupBtn.addEventListener('click',function(e){
    callSingUp();
});

function callSingUp(){
    axios.defaults.headers.common['Authorization'] = "";
    if(singupName.value =="" || singupEmail.value =="" || password.value =="" || passworda.value ==""){
    alert("欄位不可空白")
    return;
    }else if(password.value != passworda.value){
    alert("兩者密碼不一，請再確認一次")
    return;
    }
    
    let obj = {}
    obj.nickName = singupName.value;
    obj.email = singupEmail.value;
    obj.PWD = password.value;
    obj.PWDa = passworda.value;
    console.log(obj);

    axios.post(`https://todoo.5xcamp.us/users`,{
        "user": {
            "email": obj.email,
            "nickname": obj.nickName,
            "password": obj.PWD,
          }
    })
    .then(function(response){
        if(response.data.message=="註冊成功"){
            alert("恭喜帳號註冊成功!即將前往登入頁面")
            login.style = "display:block"
            singup.style = "display:none"
        }
    })
    .catch(function (error){
        if(error.response.data.message=="註冊發生錯誤"){
            alert("此帳號已被使用，請重新登入");
        }
    })
}
//登入axios
loginSend.addEventListener('click',function(e){
    CallLoginUp();
    e.preventDefault;
});
function CallLoginUp(){
    let obj ={}
    obj.email = loginEmail.value;
    obj.PWD = loginPWD.value;
    console.log(obj);

    axios.post(`https://todoo.5xcamp.us/users/sign_in`,{
        "user": {
          "email": obj.email,
          "password": obj.PWD
        }
    })
    .then(function(response){
        if(axios.defaults.headers.common['Authorization'] = response.headers.authorization){
            alert("登入成功!")
            login.style = "display:none"
            container.style = "display:block"
        }
    })
    .catch(function(error){
        alert("帳號密碼錯誤，請確認是否有註冊或再試一次")
    })
    }


//登出帳號
logOut.addEventListener('click',function(e){
    CallLogout();
});
function CallLogout(){
    axios.delete(`https://todoo.5xcamp.us/users/sign_out`)
    .then(function(response){
        axios.defaults.headers.common['Authorization'] = "";
        alert("登出成功!即將返回首頁");
        container.style = "display:none"
        login.style = "display:block"
        document.getElementById("login-account").value ="";//初始化欄位
        document.getElementById("login-pwd").value ="";


        
    })
    .catch(error=>console.log(error.response))
}
//todolist
const inputText = document.getElementById('inputText');//getElementById
const addBTN = document.getElementById('addBTN');
let todoData = [];//空陣列

//使用者名稱
function userDisplay(){
let url = `https://todoo.5xcamp.us/users/sign_in`;
let APIData = {
    "user": {
        "nickname": nickName
    }
}
axios.post(url,APIData)
     .then((res)=>{
        //console.log(res)
        let nickName = res.data.nickname;
        userName.innerHTML = nickName
     })
     .catch(error=>console.log(error.response))


}







//1.新增
addBTN.addEventListener('click',addTodo);
function addTodo(){
    let todo ={//陣列裡面的物件資訊
     txt: inputText.value,//輸入的事項
     id: new Date().getTime(),//做刪除切換
     checked:'',//判別已完成待完成
    };
    if(todo.txt!=""){//做防呆
        todoData.unshift(todo);//新增
        inputText.value ='';//新增完輸入框清空
    }
    updataList();
}

//7.優化
inputText.addEventListener('keypress',function(e){
    if(e.key =="Enter"){
        addTodo();
    }
});



//2.渲染
const todoList = document.getElementById('todoList');
function render (arr){
    let str ='';//新增一個用來裝HTML結構的str
    arr.forEach(function(l){
        str+=`
        <li data-id="${l.id}">
                <label class="checkbox" for="">
                  <input type="checkbox" ${l.checked}/>
                  <span>${l.txt}</span>
                </label>
                <a href="#" class="delete"></a>
              </li>
        `;
    });
    todoList.innerHTML = str;//將str渲染到innerHTML裡面
}

//3.切換(css樣式)
const tab = document.getElementById('tab');
let toggleStatus = 'all';
tab.addEventListener('click',switchTab);
function switchTab(e){
    toggleStatus = e.target.dataset.tab;//選擇ul的tab
    let tabs = document.querySelectorAll('#tab li');//宣告tabs為ul底下的li
    tabs.forEach(function(l){//3個li跑回圈，先移除所有的active
        l.classList.remove('active');//刪除active狀態
    });
    e.target.classList.add('active');//點擊再裝上active
    updataList();
}

//4.刪除&切換 checked狀態功能
todoList.addEventListener('click', deleteAndChecked);
function deleteAndChecked(e){
    let id = e.target.closest('li').dataset.id;//離最近的來選到li
    //console.log(id);
    if(e.target.classList.value == 'delete'){
        e.preventDefault();//把預設a拿掉
        todoData = todoData.filter(function(l){
            return l.id != id;});
    }
    else{
        //切換 checked狀態功能
        todoData.forEach((i,index)=>{
        if(i.id==id){
            if(todoData[index].checked == "checked"){
                todoData[index].checked ='';
            }else{
                todoData[index].checked = "checked";
            }
        }
        });
    }
    updataList();
}
//5.更新代辦清單
function updataList(){
    let showData = [];
    if (toggleStatus == 'all'){
        showData = todoData;
    }else if (toggleStatus =="work"){
        showData = todoData.filter((i) => i.checked == '');
    }else {
        showData = todoData.filter((i) => i.checked == 'checked');
    }

    const workNum = document.getElementById('workNum');
    let todoLength = todoData.filter((i) => i.checked == '');
    workNum.textContent = todoLength.length;

    render (showData);
}

//初始
updataList();


//6.刪除已完成 todo
const deleteBTN = document.getElementById('deleteBTN');
deleteBTN.addEventListener('click',function(e){
    e.preventDefault();//取消預設
    todoData = todoData.filter((i) => i.checked != 'checked');//要刪除已完成
    updataList();
})

