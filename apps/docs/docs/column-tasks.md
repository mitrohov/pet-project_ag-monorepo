# Задачи колонки

[[toc]]

## Содержание задачи

Карточка задачи содержит:

- Заголовок
- Сокращенное описание задачи
- Статус задачи
- Иконку редактирования задачи. При клике на иконку редактирования задачи открывается модальное окно для редактирования задачи
- Карточка задачи имеет цветную границу с левой стороны цвет которой соответствует статусу задачи
- Карточка задачи содержит иконку удаления задачи. При клике на иконку удаления задачи открывается модальное окно для подтверждения удаления задачи
- Карточку задачи можно перенести в другую колонку с помощью drag and drop. При переносе задачи в другую колонку происходит связывание задачи с выбранной колонкой

## Создание задачи

Для создания новой задачи необходимо перейти на доску и кликнуть по кнопке "Новая задача" в нужной колонке.

При клике по кнопке "Новая задача" открывается модальное окно.

При клике по кнопке "Сохранить" в колонке создается новая задача.

## Редактирование задачи

Для редактирования задачи необходимо перейти на доску и кликнуть по нужной задаче.

При клике по задаче открывается модальное окно с полями задачи.

При клике по кнопке "Сохранить" в изменения применяются к задаче.

## Модальное окно и форма создания и редактирования новой задачи

Модальное окно содержит:

- Заголовок "Новая задача"
- Иконку закрытия модального окна. При клике по иконке закрытия модального окна происходит закрытие модального окна без изменений

При создании задачи модальное окно содержит кнопку "Создать"

При клике по кнопке "Создать" происходит открытие модального окна с формой создания и редактирования задачи

При редактировании задачи модальное окно содержит кнопку "Сохранить"

При клике по кнопке "Сохранить" происходит открытие модального окна с формой создания и редактирования задачи

### Форма модального окна создания и редактирования задачи

Форма модального окна содержит поля:

| Название поля    | Тип поля | Обязательное поле | Доп описание                                                                                                                                            |
| ---------------- | -------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Заголовок задачи | Текст    | Да                | Наименование задачи полностью отображается в колонке. Поле "Заголовок задачи" имеет валидацию на максимальное количество символов (50).                 |
| Описание задачи  | Текст    | Да                | Если описание есть, тогда оно будет частично отображаться в колонке. Поле "Описание задачи" имеет валидацию на максимальное количество символов (10000) |
| Статус           | Список   | Да                | Список статусов содержит наименование колонок с доски "Задачи по статусам"                                                                              |

## Модальное окно удаления задачи

Модальное окно содержит:

- Текст "Вы уверены, что хотите удалить задачу?"
- Кнопку "Удалить" и иконку закрытия модального окна. При клике на кнопку "Удалить" задача удаляется и страница доски обновляется

При клике на иконку закрытия происходит закрытие модального окна без удаления задачи.

## Изменение статуса задачи

Находясь на любой доске, кроме доски "Задачи по статусам" изменение статуса задачи производится через форму
редактирования задачи.

Находясь на доске ["Задачи по статусам"](/docs/task-statuses.html) для изменения статуса задачи можно перетянуть задачу в нужную колонку,
а так же изменить статус через форму редактирования задачи после клика по задаче.

## Изменение колонки для задачи

Чтобы переместить задачу в другую колонку необходимо перетащить ее в другую колонку.

## Создание нового статусам для задач

Для создания нового статуса для задач необходимо кликнуть по кнопке "Добавить статус задач" или перейти на доску ["Задачи по статусам"](/docs/task-statuses.html) и кликнуть по кнопке "Добавить статус задач".
