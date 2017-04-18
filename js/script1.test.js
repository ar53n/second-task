//желательно  возвращать вновь созданные объекты через клон

class ClassRoom {
    // предположим, что у каждой аудитории есть номер static get _classRoomList() {
    // return ClassRoom._classRoomList; } static set _classRoomList(value) { _bar =
    // value; }
    constructor(options) {
        //добавить возможность заполнения через массив
        if (options.number) {
            var classroom = {number: options.number}
        } else {
            throw new Error('Needed classroom number')
        }
        if (options.capacity) {
            classroom["capacity"] = options.capacity
        } else {
            throw new Error('Needed classroom capacity')
        }
        if (options.name) {
            classroom["name"] = options.name
        } else {
            throw new Error('Needed classroom name')
        }
        if (options.info) {
            classroom["info"] = options.info
        } else {
            throw new Error('Needed classroom name')
        }
        return classroom;
    }
}

new ClassRoom({
    number: 454,
    name: 'dwdw',
    info: 'dwdwd',
    capacity: 30
})
// class Speaker { } let lecture = {   name: 'Название лекции',   lecturer: 'Имя
// и фамилия преподавателя',   dateFrom: '2017-06-06 19:00', // дата начала в
// формате ISO 8601   duration: 90, // Длительность лекции в минутах   place:
// 'Название аудитории',   schools: ['ШРИ', 'ШМД'] // Названия школ, к которым
// относится лекция };

class Lecture {
    //проверка чтобы у одной школы не было двух лекций в одно время
    constuctor(options) {
        // идеальный вариант конструктора, что при проверке всех наших критериев он
        // выдаст на список возможных аудиторий, если это необходимо поэтому мы проверим
        // на наличие всех полей но не будем выкидывать исключения
        let lecture = {}
        if (options.name) {
            lecture = {name: options.name}
        } else {
            throw new Error('Needed lecture name')
        }
        if (options.speaker) {
            //предположим что лектор может быть на нескольких лекциях.
            lecture["speaker"] = options.speaker;
        } else {
            throw new Error('Needed lecture speaker')
        }
        if (options.dateFrom) {
            lecture["dateFrom"] = new Date(options.dateFrom).getTime() //переведем в timestamp чтобы оперировать числами
            // будем хранить время от 1970 года без учета timezone new Date(0) будет
            // эквивалентно 01.01.1970 03:00 в нашей временной зоне
        } else {
            throw new Error('Needed lecture time start')
        }
        if (options.duration) {
            lecture["dateEnd"] = lecture["dateFrom"] + options.duration * 60 * 1000;
            lecture["duration"] = options.duration;
        } else {
            throw new Error('Needed lecture duration')
        }
        if (options.classroom /*&& ClassRoom.getClassRoom(options.classroom)*/ ) {
            //сделать метод на валидацию данных
            lecture["classroom"] = options.classroom;
        } else {
            throw new Error('Needed lecture classroom')
        }
        if (options.schools) {
            lecture["schools"] = options.schools;
            // capacityCheck(options.classroom, options.schools);
        } else {
            throw new Error('Needed schools for this lecture')
        }
        return lecture;
    }

}

class School {
    //добавить возможность добавления через массив
    constructor(schoolName, quantity) {
        let school = {}
        if (schoolName) {
            //не может быть двух школ с одинаковым названием
            school["name"] = schoolName;
        } else {
            throw new Error('Needed school name')
        }
        if (quantity) {
            school["quantity"] = quantity
        } else {
            throw new Error('Needed school quantity')
        }
        return school;
    }
}

new School('Школа разработки интерфейсов',45)

class Mobilization {
    // скроем реализацию создания объектов через фасад
    constructor() {
        this._classrooms = {}; //предположим что у каждой аудитории есть уникальный номер и поэтому для быстрого поиска мы можем орагнизовать объект где ключом будет являть номер комнаты а значения информация о комнате;
        this._schools = [];
        this._lectures = [];
    }

    addSchool(data) {
        let school = new ClassRoom(data);
        this._schools.push(school);
        return school;
    }

    getSchoolList() {
        return this._schools
    }

    getSchool(name) {
       return this._schools.forEach(school => {
            if (name === school.name) {
                return school;
            } else {
                throw new Error('Такой школы нет')
            }
        })
    }

    addClassroom(data) {
        let classroom= new ClassRoom(data)
        this._classrooms[classroom.number] = classroom;
    }

    getClassRoom(number) {
        if (classRoomList[number]) {
            return classRoomList[number];
        } else {
            new Error('Такой аудитории нет в списке')
        }
    }

    getClassRoomList() {
        return this._classrooms;
    }



    addLecture(data) {
        let lecture = new Lecture(data);
        if (this.lectureValidate(lecture)) {
            this._lectures.push(lecture);
        }
    }
    
    lectureValidate(lecture) {
        this.capacityCheck(lecture.classroom,lecture.schools);
        let lectures = this.findLecturesByDataRange(lecture.dateFrom,lecture.dateEnd);
    }

    findLecturesByDataRange(dateStart, dateEnd) {
        let lectures = this._lectures.filter(lecture => {
            if (lecture.dateStart >= dateStart && lecture.dateEnd <= dateEnd) {
                return lecture;
            }
        })
        return lectures;
    }

    findLecturesByClassRoom(classroom) {
        let lectures = this._lectures.filter(lecture => {
            if (lecture.classroom === classroom) {
                return lecture;
            }
        })
        return lectures;
    };

    findLecturesBySchool(school) {
        let lectures = this._lectures.filter(lecture => {
            if (lecture.school === school) {
                return lecture;
            }
        })
        return lectures;
    };



    capacityCheck(classroom, schools) {
        let classroomCapacity = this.getClassRoom(number).capacity;
        let quantity = 0;
        if (Array.isArray(schools)) {
            this._schools.forEach(function (school) {
                quantity += this.getSchool(school).quantity;
            }, this);
        } else {
            quantity += this.getSchool(school).quantity;
        }
        return classroomCapacity >= quantity;
    }
}