"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Classroom = function () {
    // предположим, что у каждой аудитории есть номер static get _classRoomList() {
    // return Classroom._classRoomList; } static set _classRoomList(value) { _bar =
    // value; }
    function Classroom(options) {
        _classCallCheck(this, Classroom);

        //добавить возможность заполнения через массив
        if (options.number) {
            this["number"] = options.number;
        } else {
            throw new Error('Needed classroom number');
        }
        if (options.capacity) {
            this["capacity"] = options.capacity;
        } else {
            throw new Error('Needed classroom capacity');
        }
        if (options.name) {
            this["name"] = options.name;
        } else {
            throw new Error('Needed classroom name');
        }
        if (options.info) {
            this["info"] = options.info;
        } else {
            throw new Error('Needed classroom name');
        }
        return this;
    }

    _createClass(Classroom, [{
        key: "edit",
        value: function edit(newValue) {
            if (newValue.number) {
                this["number"] = newValue.number;
            }
            if (newValue.name) {
                this["name"] = newValue.name;
            }
            if (newValue.capacity) {
                this["capacity"] = newValue.capacity;
            }
            if (newValue.info) {
                this["info"] = newValue.info;
            }
            return this;
        }
    }]);

    return Classroom;
}();

// class Speaker { } let lecture = {   name: 'Название лекции',   lecturer: 'Имя
// и фамилия преподавателя',   dateFrom: '2017-06-06 19:00', // дата начала в
// формате ISO 8601   duration: 90, // Длительность лекции в минутах   place:
// 'Название аудитории',   schools: ['ШРИ', 'ШМД'] // Названия школ, к которым
// относится лекция };

var Lecture = function () {
    //проверка чтобы у одной школы не было двух лекций в одно время
    function Lecture(options) {
        _classCallCheck(this, Lecture);

        // идеальный вариант конструктора, что при проверке всех наших критериев он
        // выдаст на список возможных аудиторий, если это необходимо поэтому мы проверим
        // на наличие всех полей но не будем выкидывать исключения
        if (options.name) {
            this["name"] = options.name;
        } else {
            throw new Error('Needed lecture name');
        }
        if (options.speaker) {
            //предположим что лектор может быть на нескольких лекциях.
            this["speaker"] = options.speaker;
        } else {
            throw new Error('Needed lecture speaker');
        }
        if (options.dateFrom) {
            this["dateFrom"] = new Date(options.dateFrom).getTime(); //переведем в timestamp чтобы оперировать числами
            // будем хранить время от 1970 года без учета timezone new Date(0) будет
            // эквивалентно 01.01.1970 03:00 в нашей временной зоне
        } else {
            throw new Error('Needed lecture time start');
        }
        if (options.duration) {
            this["dateEnd"] = this["dateFrom"] + options.duration * 60 * 1000;
            this["duration"] = options.duration;
        } else {
            throw new Error('Needed lecture duration');
        }
        if (options.classroom /*&& Classroom.getClassroom(options.classroom)*/) {
                //сделать метод на валидацию данных
                this["classroom"] = options.classroom;
            } else {
            throw new Error('Needed lecture classroom');
        }
        if (options.schools) {
            this["schools"] = options.schools;
            // capacityCheck(options.classroom, options.schools);
        } else {
            throw new Error('Needed schools for this lecture');
        }
        return this;
    }

    _createClass(Lecture, [{
        key: "edit",
        value: function edit(newValue) {
            if (newValue.name) {
                this["name"] = newValue.name;
            }
            if (newValue.speaker) {
                this["speaker"] = newValue.speaker;
            }
            if (newValue.dateFrom) {
                this["dateFrom"] = new Date(newValue.dateFrom).getTime();
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
                // capacityCheck(newValue.classroom, newValue.schools);
            }
            return this;
        }
        /**
         * 
         * Проверка на вместимость аудитории для всех школ на этой лекции
         * @static
         * @param {Classroom} [classroom=this.classroom] 
         * @param {School|School[]} [schools=this.schools] 
         * @returns {boolean}
         * 
         * @memberOf Lecture
         */
        // static capacityCheck(classroom=this.classroom,schools=this.schools) {
        //     let classroomCapacity = classroom.capacity;
        //     let quantity = 0;
        //     if (Array.isArray(schools)) {
        //         this._schools.forEach(function (school) {
        //                 quantity += schools.quantity;
        //             }, this);
        //     } else {
        //         quantity += schools.quantity;
        //     }
        //     return classroomCapacity >= quantity;
        // }

        /**
         * 
         * 
         * @param {any} dateStart 
         * @param {any} dateEnd 
         * @returns 
         * 
         * @memberOf Lecture
         */

    }, {
        key: "checkByDataRange",
        value: function checkByDataRange(dateStart, dateEnd) {
            if (dateStart) {
                var _dateStart = new Date(dateStart).getTime();
            }
            if (dateEnd) {
                var _dateEnd = new Date(dateEnd).getTime();
            }
            if (dateStart && dateEnd) {
                return this.dateStart >= _dateStart && this.dateEnd <= _dateEnd;
            } else {
                if (dateStart) {
                    return this.dateStart >= _dateStart;
                }
                if (dateEnd) {
                    return this.dateEnd <= _dateEnd;
                }
            }
        }
    }, {
        key: "checkByClassroom",
        value: function checkByClassroom(classroom) {
            if (this.classroom.name.toLowerCase() === classroom.toLowerCase().trim()) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        key: "checkBySchool",
        value: function checkBySchool(school) {
            if (this.school === school) {
                return true;
            } else {
                return false;
            }
        }
    }]);

    return Lecture;
}();

var School = function () {
    //добавить возможность добавления через массив
    function School(options) {
        _classCallCheck(this, School);

        if (options.name) {
            //не может быть двух школ с одинаковым названием
            this["name"] = options.name;
        } else {
            throw new Error('Needed school name');
        }
        if (options.quantity) {
            this["quantity"] = options.quantity;
        } else {
            throw new Error('Needed school quantity');
        }
        return this;
    }

    _createClass(School, [{
        key: "edit",
        value: function edit(newValue) {
            if (newValue.name) {
                this.name = newValue.name;
            }
            if (newValue.quantity) {
                this.quantity = newValue.quantity;
            }
            return this;
        }
    }]);

    return School;
}();

var Mobilization = function () {
    // скроем реализацию создания объектов через фасад
    function Mobilization() {
        _classCallCheck(this, Mobilization);

        this._classrooms = {}; //предположим что у каждой аудитории есть уникальный номер и поэтому для быстрого поиска мы можем орагнизовать объект где ключом будет являть номер аудитории а значения информация об аудитории;
        this._schools = [];
        this._lectures = [];
    }

    _createClass(Mobilization, [{
        key: "addSchool",
        value: function addSchool(data) {
            var dublicateSchool = void 0;
            try {
                dublicateSchool = this.getSchool(data.name);
            } catch (e) {
                if (dublicateSchool && dublicateSchool.name) {
                    throw new Error("\u0428\u043A\u043E\u043B\u0430 \u0441 \u0442\u0430\u043A\u0438\u043C \u0438\u043C\u0435\u043D\u0435\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442");
                } else {
                    var _school = new School(data);
                    this._schools.push(_school);
                    return _school;
                }
            }
        }
    }, {
        key: "editSchool",
        value: function editSchool(name, newValue) {
            var prevValue = this.getSchool(name);
            return prevValue.edit(newValue);
        }
    }, {
        key: "getSchoolList",
        value: function getSchoolList() {
            return this._schools;
        }
    }, {
        key: "getSchool",
        value: function getSchool(name) {
            var _school = this._schools.find(function (school) {
                if (name.toLowerCase().trim() === school.name.toLowerCase()) {
                    return school;
                }
            });
            if (_school) {
                return _school;
            } else {
                console.error(new Error('Такой школы нет'));
            }
        }
    }, {
        key: "addClassroom",
        value: function addClassroom(data) {
            if (this._classrooms[data.number]) {
                throw new Error('Комната с таким номером уже существует');
            } else {
                var classroom = new Classroom(data);
                this._classrooms[classroom.number] = classroom;
                return classroom;
            }
        }
    }, {
        key: "editClassroom",
        value: function editClassroom(number, newValue) {
            var prevValue = this.getClassroom(number);
            return prevValue.edit(newValue);
        }
    }, {
        key: "getClassroom",
        value: function getClassroom(number) {
            var classrooms = this.getClassroomList();
            if (classrooms[number]) {
                return classrooms[number];
            } else {
                new Error('Такой аудитории нет в списке');
            }
        }
    }, {
        key: "getClassroomList",
        value: function getClassroomList() {
            if (this._classrooms) {
                return this._classrooms;
            } else {
                throw new Error("\u0421\u043F\u0438\u0441\u043E\u043A \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0439 \u043F\u0443\u0441\u0442\u043E\u0439");
            }
        }
    }, {
        key: "addLecture",
        value: function addLecture(data) {
            var _this = this;

            var lecture = new Lecture(data);
            var _classroom = this.getClassroom(lecture.classroom);
            if (_classroom) {
                lecture.classroom = _classroom; // связываем объекты
            } else {
                throw new Error("\u0422\u0430\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u043D\u0435\u0442 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435");
            }
            var _schools = lecture.schools.map(function (school) {
                var _school = _this.getSchool("" + school);
                if (_school) {
                    return _school;
                } else {
                    new Error("\u0428\u043A\u043E\u043B\u044B " + school + " \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442");
                }
            });
            if (_schools) {
                lecture.schools = _schools;
            }
            if (this.lectureValidate(lecture)) {
                this._lectures.push(lecture);
                return lecture;
            }
        }
    }, {
        key: "lectureValidate",
        value: function lectureValidate(lecture) {
            var _this2 = this;

            var capacity = this.capacityCheck(lecture.classroom, lecture.schools);
            if (capacity === false) {
                console.error(new Error("\u0412\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u043C\u0435\u043D\u044C\u0448\u0435 \u0447\u0435\u043C \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432"));
            }
            var lecturesInClassRoom = this.findLecturesByClassroom(lecture.classroom.name, lecture.dateFrom, lecture.dateEnd);
            if (lecturesInClassRoom.length >= 1) {
                console.error(new Error("\u0412 \u044D\u0442\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0443\u0436\u0435 \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u043B\u0435\u043A\u0446\u0438\u044F"));
            }
            var lect = void 0;
            var lecturesForSchool = lecture.schools.some(function (school) {
                lect = _this2.findLecturesBySchool(school.name, lecture.dateFrom, lecture.dateEnd);
                if (lect.length === 0) {
                    return lect;
                } else {
                    console.error(new Error("\u0414\u043B\u044F " + school.name + "  \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u043B\u0435\u043A\u0446\u0438\u044F"));
                }
            });
            return lect.length === 0 && capacity && lecturesInClassRoom.length === 0;
        }
    }, {
        key: "findLecturesBySchool",
        value: function findLecturesBySchool(schoolName, dateStart, dateEnd) {
            //метод реализует поиск по школе при необязательных параметрах даты
            //проверка для всех привязанных школ
            return this._lectures.map(function (lecture) {
                if (lecture.checkBySchool(schoolName) && lecture.checkByDataRange(dateStart, dateEnd)) {
                    return lecture;
                }
            });
        }
    }, {
        key: "findLecturesByClassroom",
        value: function findLecturesByClassroom(classroom, dateStart, dateEnd) {
            return this._lectures.map(function (lecture) {
                if (lecture.checkByClassroom(classroom) && lecture.checkByDataRange(dateStart, dateEnd)) {
                    return lecture;
                }
            });
        }
    }, {
        key: "capacityCheck",
        value: function capacityCheck(classroom, schools) {
            //сделать входными параметрами объекты School and Classrooms
            var classroomCapacity = void 0;
            if (classroom.capacity) {
                classroomCapacity = classroom.capacity;
            } else {
                classroomCapacity = this.getClassroom(classroom).capacity;
            }
            var quantity = 0;
            if (Array.isArray(schools)) {
                this._schools.forEach(function (school) {
                    if (school.name) {
                        quantity += this.getSchool(school.name).quantity;
                    } else {
                        quantity += this.getSchool(school).quantity;
                    }
                }, this);
            } else {
                quantity += this.getSchool(school).quantity;
            }
            return classroomCapacity >= quantity;
        }
    }]);

    return Mobilization;
}();