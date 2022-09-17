const createAppTitle = (title) => {
  const appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
};

const createTodoItemForm = () => {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';

  buttonWrapper.append(button);
  form.append(input, buttonWrapper);

  return {
    form,
    input,
    button,
  };
};

const createTodoList = () => {
  const list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
};

const createTodoItem = (name) => {
  const item = document.createElement('li');
//  кнопки помещаем в элемент, который красиво покажет их в одной группе
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');

//  устанавливаем стили для элемента списка, а так же для размещения кнопок
//  в его правой части с помощью flex
  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.textContent = name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

//  вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
  buttonGroup.append(doneButton, deleteButton);
  item.append(buttonGroup);

//  приложению нужен доступ к самому элементу и кнопкам, что бы обрабатывать события нажатия
  return {
    item,
    doneButton,
    deleteButton,
  };
};

const createTodoApp = (container, title = 'Список дел') => {
  // container = document.getElementById(container)
  const todoAppTitle = createAppTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = createTodoList();

  container.append(todoAppTitle, todoItemForm.form, todoList);

  //браузер создаёт событие submit на форме по нажатию на Enter или на кнопку создания дела
  todoItemForm.form.addEventListener('submit', (event) => {
    //эта кнопка необходима, что бы предотвратить стандартное действие браузера
    //в данном случае мы не хотим что бы страница перезагружалась при отправке формы
    event.preventDefault();

    //  игнорируем создание элемента, если пользователь ничего не ввёл в поле
    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = createTodoItem(todoItemForm.input.value);

    //добавляем обработчик на кнопки
    todoItem.doneButton.addEventListener('click', () => {
      todoItem.item.classList.toggle('list-group-item-success');
    });
    todoItem.deleteButton.addEventListener('click', () => {
      if (confirm('Вы уверены?')) {
        todoItem.item.remove();
      }
    });
    //  создаём и добавляем в список новое дело с названием из поля для ввода
    todoList.append(todoItem.item);
    // обнуляем значение в поле, что бы не пришлось стирать его вручную
    todoItemForm.input.value = '';
  });
};

window.createTodoApp = createTodoApp;
