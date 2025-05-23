# Тест-кейсы для раздела "Контакты"

[[toc]]

## Переход в раздел

- В меню должен отображаться раздел "Контакты"
- При клике на пункт меню "Контакты" происходит переход на страницу с контактами
- URL страницы содержит "/contacts"

## Содержимое страницы

- На странице отображается заголовок "Контакты"
- На страницe отображается кнопка "Добавить"
- На странице отображается таблица с контактами

## Кнопка "Добавить

- При клике на кнопку "Добавить" открывается не заполненная форма создания и редактирования контакта

## Форма создания и редактирования контакта

- В случае создания нового контакта форма должна быть пустой
- В случае редактирования контакта форма должна быть заполнена данными редактируемого контакта
- Форма создания и редактирования контакта должна содержать поля: "ФИО", "Мобильный телефон", "Откуда контакт", "Социальные сети", "Описание"
- При создании нового контакта форма содержит кнопку "Создать"
- При редактировании контакта форма содержит кнопку "Сохранить"
- При клике на кнопку "Создать" происходит открытие таблицы "Контакты", которая содержит созданный контакт
- При клике на кнопку "Сохранить" происходит открытие таблицы "Контакты", которая содержит обновленный контакт

## Поле "ФИО"

- Поле "ФИО" является текстовым
- Поле "ФИО" содержит валидацию на пустое значение
- Поле "ФИО" имеет валидацию на максимальное количество символов (50)

## Поле "Мобильный телефон"

- Поле "Мобильный телефон" является текстовым и не обязательным к заполнению
- Поле "Мобильный телефон" имеет валидацию на максимальное количество символов (50)

## Поле "Откуда контакт"

- Поле "Откуда контакт" является списком из [платформ](/docs/order-platform.html) и не обязательным к заполнению

## Поле "Социальные сети"

- Поле "Социальные сети" является текстовым и не обязательным к заполнению
- Поле "Социальные сети" имеет валидацию на максимальное количество символов (500)

## Поле "Описание"

- Поле "Описание" является текстовым и не обязательным к заполнению
- Поле "Описание" имеет валидацию на максимальное количество символов (3000)

## Таблица контактов

- Таблица контактов содержит колонки: "ФИО", "Мобильный телефон", "Социальные сети", "Описание", "Откуда контакт"
- Каждая строка таблицы содержит иконку контекстного меню
- При клике на иконку контекстного меню открывается выпадающее меню с пунктами: "Редактировать", "Удалить"
- При клике на пункт "Редактировать" открывается форма редактирования и создания контакта
- При клике на пункт "Удалить" открывается модальное окно с подтверждением удаления контакта
- Таблица контактов содержит пагинацию
- Пагинация содержит выбор страницы
- Пагинация содержит выбор количества контактов на странице
- Пагинация содержит иконку переключения на предыдущую страницу
- Пагинация содержит иконку переключения на следующую страницу
- Пагинация содержит иконку переключения на первую страницу
- Пагинация содержит иконку переключения на последнюю страницу
- В пагинации по умолчанию отображается 10 контактов на странице

## Модальное окно "Предупреждение об удалении"

- Модальное окно содержит текст "Вы уверены, что хотите удалить контакт?"
- Модальное окно содержит кнопку "Удалить" и иконку закрытия модального окна
- При клике на кнопку "Удалить" контакт удаляется и таблица контактов обновляется
- При клике на иконку закрытия происходит закрытие модального окна без удаления контакта

## Фильтры

| Название поля   | Тип фильтра       |
| --------------- | ----------------- |
| ФИО             | Вхождение в текст |
| Мобильный номер | Вхождение в текст |
| Социальные сети | Вхождение в текст |
| Описание        | Вхождение в текст |
| Откуда контакт  | Выбор из списка   |
