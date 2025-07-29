const todolist = [
            "Belajar HTML",
            "Belajar CSS",
            "Belajar JavaScript",
            "Belajar DOM Manipulation"
        ];

        function clearTodolist() {
            const todolistBody = document.getElementById("todolistBody");
            while (todolistBody.firstChild) {
                todolistBody.removeChild(todolistBody.firstChild);
            }
        }

        function removeTodoList(index){
            todolist.splice(index, 1);
            displayTodolist();
        }

        function addTodoList(index, todo) {
            const tr = document.createElement("tr");
            const tdButton = document.createElement("td");
            tr.appendChild(tdButton);

            const buttonDone = document.createElement("input");
            buttonDone.type = "button";
            buttonDone.value = "Done";
            buttonDone.onclick = function () {
                removeTodoList(index);
            };
            tdButton.appendChild(buttonDone);

            const tdTodo = document.createElement("td");
            tdTodo.textContent = todo;
            tr.appendChild(tdTodo);

            const todolistBody = document.getElementById("todolistBody");
            todolistBody.appendChild(tr);
        }

        function displayTodolist() {
            clearTodolist(); // Hapus isi tabel sebelum menampilkan ulang

            for (let i = 0; i < todolist.length; i++) {
                const todo = todolist[i];

                const searchText = document.getElementById("search").value.toLowerCase();

                if(todo.toLowerCase().includes(searchText)){
                    addTodoList(i, todo);
                }
            }
        }

        document.forms['TodoForm'].onsubmit = function (event) {
            event.preventDefault();

            const todo = document.forms['TodoForm']['todo'].value;
            todolist.push(todo);

            document.forms['TodoForm'].reset();

            console.info(todolist);
            displayTodolist();
        };

        const searchInput = document.getElementById("search");
        // searchInput.onchange = function () {
        //     console.info("onchange");
        // }

        searchInput.onkeyup = function () {
            console.info("On Key Up");
            displayTodolist();
        }

        searchInput.onkeydown = function () {
            console.info("oOn Key Down");
            displayTodolist();
        }

        displayTodolist();
