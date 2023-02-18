'use strict'
let $ = document, valueTodo
//دسترسی به تمامی المنت های مورد نظرمان
let inputElem = $.querySelector('input');
let ulContainer = $.querySelector('ul');
let formElem = $.querySelector('form');
//ساخت یک منبع برای ذخیره دیتا
let todoArray = ['اموزش زبان', 'تمرین برنامه نویسی', 'خرید وسایل خانه']


//ساخت یک دیتا با گرفتن مقدار اینپوت
function addTodo(valueTodo) {
    todoArray.push(valueTodo)
    generateTodo(todoArray)
    saveToLocalStorage(todoArray)

}

//حذف یادداشت با کلیک بر روی ایکون حذف
function deleteTodo(event) {
    if (event.target.tagName == 'I') {
        let valueTodo = event.target.previousElementSibling.innerHTML

        todoArray = fetchData()
        let findIndexTodo = todoArray.findIndex(todoItem => {
            if (todoItem === valueTodo) {
                return todoItem
            }
        })

        todoArray.splice(findIndexTodo, 1)
        saveToLocalStorage(todoArray)
        generateTodo(todoArray)
    }
}


//ساخت یادداشت یا زدن کلید اینتر
function receiveValue(event) {
    valueTodo = inputElem.value.trim()

    if (event.keyCode === 13) {
        addTodo(valueTodo)
        inputElem.value = ''
    }
}

//save data in db
function saveToLocalStorage(array) {
    localStorage.setItem('myTodos', JSON.stringify(array))
}

//fetch data from db
function fetchData() {
    todoArray = JSON.parse(localStorage.getItem('myTodos')) || []
    return todoArray
}

//update dom
function generateTodo(todoArray) {
    ulContainer.innerHTML = ''
    todoArray.forEach(todoValue => {
        ulContainer.insertAdjacentHTML('beforeend', `
        <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${todoValue}</span>
        <i class="fa fa-trash-o delete" onclick='deleteTodo(${event})'></i>
      </li>`)
    })
}

//show data in dom when loading windows
function addTodoWithLoadWindow() {
    todoArray = fetchData()
    generateTodo(todoArray)
}
//حذف عملکرد طبیعی فرم و رفرش صفحه
formElem.addEventListener('submit', (event) => {
    event.preventDefault()
})

//اعمال رویداد کی داوون بر اینپوت
inputElem.addEventListener('keydown', receiveValue)

//delete todo
ulContainer.addEventListener('click', deleteTodo)

window.addEventListener('load', () => {
    addTodoWithLoadWindow()
})
