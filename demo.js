mob2017 = new Mobilization();
// инициализация нашего модуля

school = mob2018.addSchool({name: 'Школа разработки интерфейсов', quantity: 45})

console.log(school)
// School {name: "Школа разработки интерфейсов", quantity: 45}

classroom = mob2018.addClassroom({
    number: 123,
    name: 'Начальная',
    info: 'На 7 этаже нашего велиолепного здания',
    capacity: 30
});

console.log(classroom)

// Classroom {number: 123, capacity: 30, name: "Начальная", info: "На 7 этаже нашего велиолепного здания"}

 var lecture = window.mob2018.addLecture({
    name: 'Лекция 1',
    speaker: 'Dushkin',
    dateFrom: '2017/09/01 18:00',
    duration: 90,
    classroom: 123,
    schools: ['Школа разработки интерфейсов']
});

// Error! Вместимость аудитории меньше чем количество участников

// Изменим вместимость комнаты

mob2018.editClassroom(123,{
    capacity: 50
});

// Classroom {number: 123, capacity: 50, name: "Начальная", info: "На 7 этаже нашего велиолепного здания"}

// попытаемся добавить снова добавить лекцию

 var lecture = window.mob2018.addLecture({
    name: 'Лекция 1',
    speaker: 'Dushkin',
    dateFrom: '2017/09/01 18:00',
    duration: 90,
    classroom: 123,
    schools: ['Школа разработки интерфейсов']
});

console.log(lecture)

// Lecture {name: "Лекция 1", speaker: "Dushkin", dateFrom: 1504278000000, dateEnd: 1504283400000, duration: 90…}

//допустим изменилось количество человек в нашей школе
mob2018.editSchool('Школа разработки интерфейсов', {quantity: 51})

// Error! Для лекции "Лекция 1" необходимо изменить аудиторию.
 //           Аудитория на 50 человек.

// поиск по аудитории
mob2018.findLecturesByClassroom(123);
mob2018.findLecturesBySchool('Школа разработки интерфейсов','2017/09/01');

 //выдаст ошибку 
 /*
 Для лекции "Лекция 1" необходимо изменить аудиторию.
           Аудитория на 50 человек.

Лекция будет выведена но значение valid будет false 
 */