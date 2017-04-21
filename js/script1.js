class Classroom {
    // предположим, что у каждой аудитории есть номер static get _classRoomList() {
    // return Classroom._classRoomList; } static set _classRoomList(value) { _bar =
    // value; }
    constructor(options) {
        //добавить возможность заполнения через массив
        if (options.number) {
           this["number"] = options.number
        } else {
            throw new Error('Needed classroom number')
        }
        if (options.capacity) {
            this["capacity"] = options.capacity
        } else {
            throw new Error('Needed classroom capacity')
        }
        if (options.name) {
            this["name"] = options.name
        } else {
            throw new Error('Needed classroom name')
        }
        if (options.info) {
            this["info"] = options.info
        } else {
            throw new Error('Needed classroom name')
        }
        return this;
    }

    edit(newValue) {
        // if (newValue.number) {
        //    this["number"]= newValue.number;
        // }
        if (newValue.name) {
            this["name"] = newValue.name
        }
        if (newValue.capacity) {
            this["capacity"] = newValue.capacity
        }
        if (newValue.info) {
            this["info"] = newValue.info
        }
        return this;
    }
}

class Lecture {
    constructor(options) {
        if (options.name) {
            this["name"] =  options.name;
        } else {
            throw new Error('Needed lecture name')
        }
        if (options.speaker) {
            //предположим что лектор может быть на нескольких лекциях.
            this["speaker"] = options.speaker;
        } else {
            throw new Error('Needed lecture speaker')
        }
        if (options.dateFrom) {
            this["dateFrom"] = new Date(options.dateFrom).getTime() //переведем в timestamp чтобы оперировать числами
            // будем хранить время от 1970 года без учета timezone new Date(0) будет
            // эквивалентно 01.01.1970 03:00 в нашей временной зоне
        } else {
            throw new Error('Needed lecture time start')
        }
        if (options.duration) {
            this["dateEnd"] = this["dateFrom"] + options.duration * 60 * 1000;
            this["duration"] = options.duration;
        } else {
            throw new Error('Needed lecture duration')
        }
        if (options.classroom) {
            this["classroom"] = options.classroom;
        } else {
            throw new Error('Needed lecture classroom')
        }
        if (options.schools) {
            this["schools"] = options.schools;
        } else {
            throw new Error('Needed schools for this lecture')
        }
        this.valid = true;
        return this;
    }

    setValid(){
        this.valid = true;
        return this.isValid();
    }

    setNotValid(){
        this.valid = false;
        //чтобы не дублировать ошибку в двух методах вызовем уже готовую функцию
        return this.isValid();
    }

    isValid() {
        if (this.valid) {
            return this.valid
        } else {
            console.error(`Для лекции "${this.name}" необходимо изменить аудиторию.
            Аудитория на ${this.classroom.capacity} человек.`);
            return this.valid;
        }
    }
    /**
     * Метод для редактирования лекций
     * 
     * @param {any} newValue 
     * @returns 
     * 
     * @memberOf Lecture
     */
    edit(newValue) {
        if (newValue.name) {
            this["name"] =  newValue.name;
        }
        if (newValue.speaker) {
            this["speaker"] = newValue.speaker;
        }
        if (newValue.dateFrom) {
            this["dateFrom"] = new Date(newValue.dateFrom).getTime()
            //при изменении даты начала дата окончания должна измениться
             this["dateEnd"] = this["dateFrom"] + this.duration * 60 * 1000;
        }
        if (newValue.duration) {
            this["dateEnd"] = this["dateFrom"] + newValue.duration * 60 * 1000;
            this["duration"] = newValue.duration;
        }
        if (newValue.classroom) {
           this["classroom"] = newValue.classroom;
        }
        if (newValue.schools) {
            this["schools"] = newValue.schools;
        }
        return this;
    }

    /**
     * Проверка на соответствие заданной дате
     * 
     * @param {any} dateStart 
     * @param {any} dateEnd 
     * @returns {boolean}
     * 
     * @memberOf Lecture
     */

    checkByDataRange(dateStart, dateEnd,strict=false) {
        if (!dateStart  && !dateEnd) {
            return true;
        }
        if (dateStart) {
            var _dateStart = new Date(dateStart).getTime();
        }
        if (dateEnd) {
            var _dateEnd = new Date(dateEnd).getTime();
        }
        if (dateStart && dateEnd) {
            return strict?(this.dateFrom == _dateStart && this.dateEnd == _dateEnd):(this.dateFrom >= _dateStart && this.dateEnd <= _dateEnd);
        } else {
            if (dateStart) {
                return strict?(this.dateFrom == _dateStart):(this.dateFrom >= _dateStart)
            }
            if (dateEnd) {
                return strict?(this.dateEnd == _dateEnd):(this.dateEnd <= _dateEnd);
            }
        }
    }

    /**
     * Проверка на принадлежность данной аудитории
     * 
     * @param {any} classroom 
     * @returns 
     * 
     * @memberOf Lecture
     */
    checkByClassroom(classroom) {
        if (this.classroom.number === classroom) {
            return true;
        } else {
            return false
        }
    }

    /**
     * Проверка на принадлежность школы к лекции
     * 
     * @param {any} schoolName 
     * @returns 
     * 
     * @memberOf Lecture
     */
    checkBySchool(schoolName) {
        schoolName = schoolName.toLowerCase().trim();
        return this.schools.some(school=>{
            if (school.name.toLowerCase().trim() === schoolName) {
                return true;
            } else {
                return false 
            }
        })
    }
}

class School {
    constructor(options) {
        if (options.name) {
            this["name"] = options.name;
        } else {
            throw new Error('Needed school name')
        }
        if (options.quantity) {
            this["quantity"] = options.quantity
        } else {
            throw new Error('Needed school quantity')
        }
        return this;
    }
    /**
     * Редактирование объекта школа
     * 
     * @param {any} newValue 
     * @returns 
     * 
     * @memberOf School
     */
    edit(newValue) {
        if (newValue.name) {
            this.name = newValue.name;
        }
        if (newValue.quantity) {
            this.quantity = newValue.quantity;
        }
        return this
    }
}

class Mobilization {
    constructor() {
        //предположим что у каждой аудитории есть уникальный номер и поэтому для быстрого поиска мы можем орагнизовать объект где ключом будет являть номер аудитории а значения информация об аудитории;
        this._classrooms = {}; 
        this._schools = [];
        this._lectures = [];
    }
    /**
     * Добавление школы
     * 
     * @param {School} data 
     * @returns 
     * 
     * @memberOf Mobilization
     */
    addSchool(data) {
        let dublicateSchool;
        try {
            dublicateSchool = this.getSchool(data.name);
            if (dublicateSchool && dublicateSchool.name) {
                throw new Error(`Школа с таким именем уже существует`)
            } else {
                let _school = new School(data)
                this._schools.push(_school);
                return _school;
            }
        } catch (e) {
            console.error(e.message)
        }
    }
/**
 * Проверка вместимости всех аудиторий на всех лекциях
 * 
 * @private
 * @memberOf Mobilization
 */
    _checkAllCapacity() {
        this._lectures.forEach(lecture=>{
            if (this.capacityCheck(lecture.classroom,lecture.schools)) {
                lecture.setValid()
            } else {
                lecture.setNotValid();
            }
        })
    }
    /**
     * Редактирование школы
     * 
     * @param {String} name 
     * @param {School} newValue 
     * @returns 
     * 
     * @memberOf Mobilization
     */
    editSchool(name, newValue) {
        try {
            let prevValue = this.getSchool(name);
            let dublicateSchoolName;
            if (newValue && newValue.name) {
                dublicateSchoolName = this.getSchool(newValue.name);
                if (dublicateSchoolName) {
                    throw new Error('Школа с данным именем уже существует')
                }
            } else if (Object.keys(newValue)===0) {
                throw new Error(`Нужны данные для редактирования`)
            }
            let newSchool = prevValue.edit(newValue);
            this._checkAllCapacity();
            return newSchool;
        } catch(e) {
            console.error(`${e.message}`)
        }
    }
    /**
     * Получить список школ
     * 
     * @returns 
     * 
     * @memberOf Mobilization
     */
    getSchoolList() {
        return this._schools
    }

    getSchool(name) {
        //переделать логику ошибки и добавления школы
        name = name.toLowerCase().trim();
        let _school = this._schools.find(school => {
                if (name === school.name.toLowerCase()) {
                    return school;
                }
            })
        if (_school) {
            return _school
        } else {
            console.error(`Такой школы нет в списке`)
            return _school
        }
    }
    /**
     * Добавление аудитории
     * 
     * @param {Classroom} data 
     * @returns 
     * 
     * @memberOf Mobilization
     */
    addClassroom(data) {
        if (this._classrooms[data.number]) {
            throw new Error('Аудитория с таким номером уже существует')
        } else {
            let classroom = new Classroom(data)
            this._classrooms[classroom.number] = classroom;
            return classroom;
        }
    }
    /**
     * Редактирование аудитории
     * 
     * @param {any} number 
     * @param {any} newValue 
     * @returns 
     * 
     * @memberOf Mobilization
     */
    editClassroom(number, newValue) {
        let prevValue = this.getClassroom(number);
        let newClassroom = prevValue.edit(newValue);
        this._checkAllCapacity();
        return newClassroom;
    }

    /**
     * Поиск аудитории по номеру
     * 
     * @param {any} number 
     * @returns 
     * 
     * @memberOf Mobilization
     */
    getClassroom(number) {
        const classrooms = this.getClassroomList()
        if (classrooms[number]) {
            return classrooms[number];
        } else {
            new Error('Такой аудитории нет в списке')
        }
    }
    /**
     * Получить список аудиторий
     * 
     * @returns 
     * 
     * @memberOf Mobilization
     */
    getClassroomList() {
        if (this._classrooms) {
            return this._classrooms;
        } else {
            throw new Error(`Список аудиторий пустой`)
        }
    }

    /**
     * Добавить лекцию
     * 
     * @param {Lection} data 
     * @returns 
     * 
     * @memberOf Mobilization
     */
    addLecture(data) {
        let lecture = new Lecture(data);
        let _classroom = this.getClassroom(lecture.classroom);
        if (_classroom) {
            lecture.classroom = _classroom; // связываем объекты
        } else {
            throw new Error(`Такой аудитории нет в списке`)
        }
        let _schools = lecture.schools.map(school => {
                let _school = this.getSchool(`${school}`)
                if (_school) {
                    return _school
                } else {
                    throw new Error(`Школы ${school} не существует`);
                }
            })
        if (_schools) {
            lecture.schools = _schools
        }
        if (this.lectureValidate(lecture)) {
            this._lectures.push(lecture);
            return lecture
        }
    }
    //редактирование лекции однозначно определить лекцию можно по дате и по аудитории 
    //либо по дате и по школе
    /**
     * Редактирование лукции
     * 
     * @param {Object} searchParams - dateStart and dateEnd arguments and school or classroom name
     * @param {Lecture} newValue 
     * @returns 
     * 
     * @memberOf Mobilization
     */
    editLecture(searchParams,newValue) {
        let {dateStart,dateEnd, school,classroom} = searchParams;
        let lecture;
        if (dateStart) {
            if (school) {
                lecture = this.findLecturesBySchool(school,dateStart,dateEnd,true)[0]
            } else if (classroom) {
                lecture = this.findLecturesByClassroom(classroom,dateStart,dateEnd,true)[0]
            }
            if (lecture) {
                lecture.editing = true;
                let prevValue = Object.assign({},lecture)
                let newLecture = lecture.edit(newValue);
                //если после изменения лекция не прошла валидацию, то возвращаем обратно
                if (!this.lectureValidate(newLecture)) {
                    lecture.edit(prevValue);
                    throw new Error('Произошла ошибка при попытке изменить лекцию')
                } else {
                    return newLecture;
                }
            } else {
                throw new Error('По вашему запросу лекций не найдено')
            }
        } else {
            throw new Error('Не указана дата проведения лекции')
        }
    }
    /**
     * Валидация лекции по аудитории, вместимости, и по школе
     * 
     * @param {any} lecture 
     * @returns 
     * 
     * @memberOf Mobilization
     */
    lectureValidate(lecture) {
        let capacity = this.capacityCheck(lecture.classroom, lecture.schools);
        if (capacity === false) {
            console.error(`Вместимость аудитории меньше чем количество участников`)
        }
        let lecturesInClassRoom = this.findLecturesByClassroom(lecture.classroom.number,lecture.dateFrom,lecture.dateEnd);
        if (lecturesInClassRoom.length>=1) {
            console.error(`В этой аудитории уже планируется лекция`)
        }
        let lect;
        let lecturesForSchool = lecture.schools.some(school=>{
            lect = this.findLecturesBySchool(school.name,lecture.dateFrom,lecture.dateEnd)
            if (lect.length>0) {
                console.error(`Для ${school.name}  уже есть лекция`)
                return true
            }
        })
        if (!lecturesForSchool && capacity && lecturesInClassRoom.length===0) {
            lecture.editing = false
            return true
        } else {
            return false
        }
    }

    
    /**
     * Поиск лекции по названию школы и необязательные параметры даты
     * 
     * @param {string} schoolName 
     * @param {Date} [dateStart] 
     * @param {Date} [dateEnd] 
     * @param {any} [strict] - Строгий поиск по дате
     * @returns 
     * 
     * @memberOf Mobilization
     */
    findLecturesBySchool(schoolName,dateStart,dateEnd,strict) {
        //метод реализует поиск по школе при необязательных параметрах даты
        //проверка для всех привязанных школ
        return this._lectures.filter(lecture=>{
            if (lecture.checkBySchool(schoolName) && !lecture.editing && lecture
            && lecture.checkByDataRange(dateStart,dateEnd,strict) /*&& lecture.isValid() */) {
                lecture.isValid()
                return lecture;
            }
        })
    }

    /**
     * Поиск лекции по номеру аудитории и необязательные параметры даты
     * 
     * @param {string} schoolName 
     * @param {Date} [dateStart] 
     * @param {Date} [dateEnd] 
     * @param {any} [strict] - Строгий поиск по дате
     * @returns 
     * 
     * @memberOf Mobilization
     */
    findLecturesByClassroom(classroom,dateStart,dateEnd,strict) {
        return this._lectures.filter(lecture=>{
            if (lecture.checkByClassroom(classroom) && !lecture.editing
            && lecture.checkByDataRange(dateStart,dateEnd,strict) /*&& lecture.isValid() */) {
                lecture.isValid()
                return lecture;
            }
        })
    }
    /**
     * Подсчет количества человек в школах
     * 
     * @param {School|School[]} schools 
     * @returns {Number}
     * 
     * @memberOf Mobilization
     */
    _calculateQuantity(schools) {
        let quantity = 0;
        if (Array.isArray(schools)) {
            schools.forEach(function (school) {
                if (school.name) {
                    quantity += school.quantity;
                } else {
                    quantity += this.getSchool(school).quantity;
                }
            }, this);
        } else {
            quantity += this.getSchool(school).quantity;
        }
        return quantity;
    }

    /**
     * 
     * 
     * @param {Classroom|string} classroom 
     * @param {School| School[]} schools 
     * @returns 
     * 
     * @memberOf Mobilization
     */

    capacityCheck(classroom, schools) {
        //сделать входными параметрами объекты School and Classrooms
        let classroomCapacity
        if (classroom.capacity) {
            classroomCapacity = classroom.capacity
        } else {
            classroomCapacity = this.getClassroom(classroom).capacity;
        }
        let quantity = this._calculateQuantity(schools)
        return classroomCapacity >= quantity;
    }

    saveState() {
        if (window.localStorage) {
            localStorage.setItem('mob_classrooms',JSON.stringify(this._classrooms))
            localStorage.setItem('mob_schools',JSON.stringify(this._schools))
            localStorage.setItem('mob_lectures',JSON.stringify(this._lectures))
        }
    }
    restoreState() {
        // if (window.localStorage) {
        //     localStorage.getItem('mob_classrooms')
        //     localStorage.getItem('mob_schools')
        //     localStorage.getItem('mob_lectures')
        // }
    }
}
