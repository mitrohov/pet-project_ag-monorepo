# Расписание

[[toc]]

## Переход в раздел

В меню должен отображаться раздел "Расписание"

При клике на пункт меню "Расписание" происходит переход на страницу с расписанием уроков и событий

## Содержимое страницы

Страница содержит:

- Поле "Начало недели для печати"
- Иконку для загрузки word файла
- Поле "Категории событий"
- Поле "Ученики"
- Календарь

## Икона для загрузки word файла для печати

Клик по иконке приводит к загрузке расписания в формате docs.

Расписание в формате docs содержит уроки и события на 7 дней начиная с выбранного дня в поле "Начало недели для печати".

## Поле "Начало недели для печати"

При клике на поле "Начало недели для печати" открывается календарь для выбора даты.

После открытия календаря для выбора даты становится доступным ручной ввод даты в поле.

## Экспорт расписания в формате docs

Над календарем располагается иконка экспорта, которая позволяет экспортировать расписание в формате docs по клику на иконку экспорта.

Для экспорта необходимо выбрать первый день недели (которую хотим экспортировать) в поле "Начало недели для печати".

Файл docs реализован для печати расписания на выбранной неделе.

## Фильтрация событий по категориям {#filters-event-calendar}

## Категории событий

Поле "Категории событий" является список с выбором категорий событий

Поле "Категории событий" поддерживает множественный выбор категорий событий

Под экспортом располагается список "Выбранные категории" для отображения событий из выбранных категорий событий.

Выбранные категории по умолчанию устанавливаются в [настройках](/docs/settings.html). При обновлении страницы с расписанием
автоматически выбираются категории из [настроек](/docs/settings.html).

Если исключить из списка любую категорию, ее события прекращают отображаться в календаре.

В расписании при выборе категории событий в календаре начинают отображаться события данной категории.

Если исключить из списка любую категорию, ее события прекращают отображаться в календаре.

## Фильтрация уроков по учениках

Поле "Ученики" является список с выбором учеников

Поле "Ученики" поддерживает множественный выбор учеников

В Поле "Ученики" во время загрузки страницы автоматически подставляются все существующие ученики

Под списком "Выбранные категории" располагается список "Выбранные ученики" для отображения уроков выбранных учеников.

В расписании при выборе ученика в календаре начинают отображаться уроки данного ученика.

Если исключить из списка любого ученика, то его уроки прекращают отображаться в календаре.

## Управление календарем

### Вид календаря

Календарь имеет кнопку для переключения режима отображения

В календаре доступно 3 вида отображения: месяц, неделя, день

При клике на кнопку переключения режима и клике на нужный вид отображение календаря переключается на выбранный вид

В каждом виде календаря количество отображаемой информации разное в зависимости от того какое количество информации помещается.

Доступно переключение между данными разными видами календаря.

Все карточки событий имеют цвет согласно цвету [категории события](/docs/event-category.html) у [события](/docs/event.html).

Все карточки уроков имеют цвет согласно цвету [ученика](/docs/student.html).

### Переключение вида

#### Месяц

Если выбран вид месяца, тогда доступен выбор отображаемого месяца.

В этом виде на карточке присутствует только ученик для уроков или заголовок для событий.

В дне помещается не более 3 карточек уроков или событий.

Если событий или уроков в дне больше 3, то вместо 4ой карточки отображается кнопка "+ еще события".

При клике на кнопку "+ еще события" открывается вид календаря "День" с отображением всех событий и уроков на выбранный день.

В календаре присутствует кнопка для выбора месяца.

#### Неделя

По умолчанию календарь имеет вид текущей недели.

Если выбран вид недели, тогда доступен выбор отображаемой недели.

В дне помещается не более 3 карточек уроков или событий.

Если событий или уроков в дне больше 3, то вместо 4ой карточки отображается кнопка "+ еще события".

При клике на кнопку "+ еще события" открывается вид календаря "День" с отображением всех событий и уроков на выбранный день.

В календаре присутствует кнопка для выбора недели.

В этом виде на карточке присутствует:

**1я строка.**

- Название события / Ученик (в зависимости от того отображается событие или урок).
- Количество оставшихся оплаченных уроков на момент текущего урока или X если к уроку не привязана оплата (только для уроков).

**2я строка.**

- Время урока / события.
- Пройдет ли урок по расписанию. Галочка если урок по расписанию и X если урок был перенесен (только для уроков).

**3я строка.**

- Подготовлен ли урок. Галочка если урок подготовлен и X если урок не подготовлен.
- Подготовлено ли домашнее задание. Галочка если домашнее задание подготовлен и X если не подготовлено.

#### День

Если выбран вид дня, тогда доступен выбор отображаемого дня.

В карточке урока присутствует фио ученика, количество доступных уроков по оплате которая привязана к уроку, время
урока, иконка подготовлен ли урок, иконка подготовлено ли домашнее задание.

В карточке события присутствует название события и время события.

В календаре присутствует кнопка для выбора дня.

## Календарь. Карточки уроков и событий

Все карточки событий имеют цвет согласно цвету [категории события](/docs/event-category.html) у [события](/docs/event.html).

Все карточки уроков имеют цвет согласно цвету [ученика](/docs/student.html).

При клике на карточку открывается модальное окно с дополнительной информацией о событии или урока с иконками редактирования и удаления

При клике на иконку редактирования в новом модальном окне открывается форма редактирования
[урока](/docs/lesson.html) или [события](/docs/event.html).

При клике на "Сохранить" в форме редактирования урока или события, данные сохраняются и модальное окно закрывается, а календарь обновляется

При клике на иконку удаления в информации о событии или уроке открывается модальное окно для подтверждения удаления

При клике на "Удалить" в форме подтверждения урок или событие удаляется, а календарь обновляется

## Дополнительная информация о событии / уроке

При клике на карточку открывается модальное окно с дополнительной информацией о событии / уроке.

## Редактирование события / урока

При клике на карточку открывается модальное окно с иконкой редактирования.

При клике на иконку редактирования в новом модальном окне открывается форма
[урока](/docs/lesson.html) или [события](/docs/event.html). Календарь и событие / урок обновляется при клике на "Сохранить".

## Удаление события / урока

При клике на карточку открывается модальное окно с иконкой удаления.

При клике на иконку удаления в новом модальном окне окно для подтверждения удаления
[урока](/docs/lesson.html) или [события](/docs/event.html). Календарь и событие / урок удаляет при клике на "Удалить"
в форме подтверждения.
