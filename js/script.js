"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Classroom = function () {
    // предположим, что у каждой аудитории есть номер 
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
            // if (newValue.number) {
            //    this["number"]= newValue.number;
            // }
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

var Lecture = function () {
    function Lecture(options) {
        _classCallCheck(this, Lecture);

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
        if (options.classroom) {
            this["classroom"] = options.classroom;
        } else {
            throw new Error('Needed lecture classroom');
        }
        if (options.schools) {
            this["schools"] = options.schools;
        } else {
            throw new Error('Needed schools for this lecture');
        }
        this.valid = true;
        return this;
    }

    _createClass(Lecture, [{
        key: "setValid",
        value: function setValid() {
            this.valid = true;
            return this.isValid();
        }
    }, {
        key: "setNotValid",
        value: function setNotValid() {
            this.valid = false;
            //чтобы не дублировать ошибку в двух методах вызовем уже готовую функцию
            return this.isValid();
        }
    }, {
        key: "isValid",
        value: function isValid() {
            if (this.valid) {
                return this.valid;
            } else {
                console.error("\u0414\u043B\u044F \u043B\u0435\u043A\u0446\u0438\u0438 \"" + this.name + "\" \u043D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u043E \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044E.\n            \u0410\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F \u043D\u0430 " + this.classroom.capacity + " \u0447\u0435\u043B\u043E\u0432\u0435\u043A.");
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

    }, {
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

    }, {
        key: "checkByDataRange",
        value: function checkByDataRange(dateStart, dateEnd) {
            var strict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            if (!dateStart && !dateEnd) {
                return true;
            }
            if (dateStart) {
                var _dateStart = new Date(dateStart).getTime();
            }
            if (dateEnd) {
                var _dateEnd = new Date(dateEnd).getTime();
            }
            if (dateStart && dateEnd) {
                return strict ? this.dateFrom == _dateStart && this.dateEnd == _dateEnd : this.dateFrom >= _dateStart && this.dateEnd <= _dateEnd;
            } else {
                if (dateStart) {
                    return strict ? this.dateFrom == _dateStart : this.dateFrom >= _dateStart;
                }
                if (dateEnd) {
                    return strict ? this.dateEnd == _dateEnd : this.dateEnd <= _dateEnd;
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

    }, {
        key: "checkByClassroom",
        value: function checkByClassroom(classroom) {
            if (this.classroom.number === classroom) {
                return true;
            } else {
                return false;
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

    }, {
        key: "checkBySchool",
        value: function checkBySchool(schoolName) {
            schoolName = schoolName.toLowerCase().trim();
            return this.schools.some(function (school) {
                if (school.name.toLowerCase().trim() === schoolName) {
                    return true;
                } else {
                    return false;
                }
            });
        }
    }]);

    return Lecture;
}();

var School = function () {
    function School(options) {
        _classCallCheck(this, School);

        if (options.name) {
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
    /**
     * Редактирование объекта школа
     * 
     * @param {any} newValue 
     * @returns 
     * 
     * @memberOf School
     */


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
    function Mobilization() {
        _classCallCheck(this, Mobilization);

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


    _createClass(Mobilization, [{
        key: "addSchool",
        value: function addSchool(data) {
            var dublicateSchool = void 0;
            try {
                dublicateSchool = this.getSchool(data.name);
                if (dublicateSchool && dublicateSchool.name) {
                    throw new Error("\u0428\u043A\u043E\u043B\u0430 \u0441 \u0442\u0430\u043A\u0438\u043C \u0438\u043C\u0435\u043D\u0435\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442");
                } else {
                    var _school = new School(data);
                    this._schools.push(_school);
                    return _school;
                }
            } catch (e) {
                console.error(e.message);
            }
        }
        /**
         * Проверка вместимости всех аудиторий на всех лекциях
         * 
         * @private
         * @memberOf Mobilization
         */

    }, {
        key: "_checkAllCapacity",
        value: function _checkAllCapacity() {
            var _this = this;

            this._lectures.forEach(function (lecture) {
                if (_this.capacityCheck(lecture.classroom, lecture.schools)) {
                    lecture.setValid();
                } else {
                    lecture.setNotValid();
                }
            });
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

    }, {
        key: "editSchool",
        value: function editSchool(name, newValue) {
            try {
                var prevValue = this.getSchool(name);
                var dublicateSchoolName = void 0;
                if (newValue && newValue.name) {
                    dublicateSchoolName = this.getSchool(newValue.name);
                    if (dublicateSchoolName) {
                        throw new Error('Школа с данным именем уже существует');
                    }
                } else if (Object.keys(newValue) === 0) {
                    throw new Error("\u041D\u0443\u0436\u043D\u044B \u0434\u0430\u043D\u043D\u044B\u0435 \u0434\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F");
                }
                var newSchool = prevValue.edit(newValue);
                this._checkAllCapacity();
                return newSchool;
            } catch (e) {
                console.error("" + e.message);
            }
        }
        /**
         * Получить список школ
         * 
         * @returns 
         * 
         * @memberOf Mobilization
         */

    }, {
        key: "getSchoolList",
        value: function getSchoolList() {
            return this._schools;
        }
    }, {
        key: "getSchool",
        value: function getSchool(name) {
            var _schools = this.getSchoolList();
            name = name.toLowerCase().trim();
            var _school = _schools.find(function (school) {
                if (name === school.name.toLowerCase()) {
                    return school;
                }
            });
            return _school;
        }
        /**
         * Добавление аудитории
         * 
         * @param {Classroom} data 
         * @returns 
         * 
         * @memberOf Mobilization
         */

    }, {
        key: "addClassroom",
        value: function addClassroom(data) {
            if (this.getClassroom(data.number)) {
                throw new Error('Аудитория с таким номером уже существует');
            } else {
                var classroom = new Classroom(data);
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

    }, {
        key: "editClassroom",
        value: function editClassroom(number, newValue) {
            try {
                var prevValue = this.getClassroom(number);
                var newClassroom = prevValue.edit(newValue);
                this._checkAllCapacity();
                return newClassroom;
            } catch (e) {
                console.error(e.message);
            }
        }

        /**
         * Поиск аудитории по номеру
         * 
         * @param {any} number 
         * @returns 
         * 
         * @memberOf Mobilization
         */

    }, {
        key: "getClassroom",
        value: function getClassroom(number) {
            var classrooms = this.getClassroomList();
            return classrooms[number];
        }
        /**
         * Получить список аудиторий
         * 
         * @returns 
         * 
         * @memberOf Mobilization
         */

    }, {
        key: "getClassroomList",
        value: function getClassroomList() {
            return this._classrooms;
        }

        /**
         * Добавить лекцию
         * 
         * @param {Lection} data 
         * @returns 
         * 
         * @memberOf Mobilization
         */

    }, {
        key: "addLecture",
        value: function addLecture(data) {
            var _this2 = this;

            var lecture = new Lecture(data);
            var _classroom = this.getClassroom(lecture.classroom);
            if (_classroom) {
                lecture.classroom = _classroom; // связываем объекты
            } else {
                throw new Error("\u0422\u0430\u043A\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u043D\u0435\u0442 \u0432 \u0441\u043F\u0438\u0441\u043A\u0435");
            }
            var _schools = lecture.schools.map(function (school) {
                var _school = _this2.getSchool("" + school);
                if (_school) {
                    return _school;
                } else {
                    throw new Error("\u0428\u043A\u043E\u043B\u044B " + school + " \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442");
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

    }, {
        key: "editLecture",
        value: function editLecture(searchParams, newValue) {
            var dateStart = searchParams.dateStart,
                dateEnd = searchParams.dateEnd,
                school = searchParams.school,
                classroom = searchParams.classroom;

            var lecture = void 0;
            if (dateStart) {
                if (school) {
                    lecture = this.findLecturesBySchool(school, dateStart, dateEnd, true)[0];
                } else if (classroom) {
                    lecture = this.findLecturesByClassroom(classroom, dateStart, dateEnd, true)[0];
                }
                if (lecture) {
                    // при поиске данная лекция не должна учитываться
                    lecture.editing = true;
                    var prevValue = Object.assign({}, lecture);
                    var newLecture = lecture.edit(newValue);
                    //если после изменения лекция не прошла валидацию, то возвращаем обратно
                    if (!this.lectureValidate(newLecture)) {
                        lecture.edit(prevValue);
                        throw new Error('Произошла ошибка при попытке изменить лекцию');
                    } else {
                        return newLecture;
                    }
                } else {
                    throw new Error('По вашему запросу лекций не найдено');
                }
            } else {
                throw new Error('Не указана дата проведения лекции');
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

    }, {
        key: "lectureValidate",
        value: function lectureValidate(lecture) {
            var _this3 = this;

            var capacity = this.capacityCheck(lecture.classroom, lecture.schools);
            if (capacity === false) {
                console.error("\u0412\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u044C \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u043C\u0435\u043D\u044C\u0448\u0435 \u0447\u0435\u043C \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u043E\u0432");
            }
            var lecturesInClassRoom = this.findLecturesByClassroom(lecture.classroom.number, lecture.dateFrom, lecture.dateEnd);
            if (lecturesInClassRoom.length >= 1) {
                console.error("\u0412 \u044D\u0442\u043E\u0439 \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u0438 \u0443\u0436\u0435 \u043F\u043B\u0430\u043D\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u043B\u0435\u043A\u0446\u0438\u044F");
            }
            var lect = void 0;
            var lecturesForSchool = lecture.schools.some(function (school) {
                lect = _this3.findLecturesBySchool(school.name, lecture.dateFrom, lecture.dateEnd);
                if (lect.length > 0) {
                    console.error("\u0414\u043B\u044F " + school.name + "  \u0443\u0436\u0435 \u0435\u0441\u0442\u044C \u043B\u0435\u043A\u0446\u0438\u044F");
                    return true;
                }
            });
            if (!lecturesForSchool && capacity && lecturesInClassRoom.length === 0) {
                lecture.editing = false;
                return true;
            } else {
                return false;
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

    }, {
        key: "findLecturesBySchool",
        value: function findLecturesBySchool(schoolName, dateStart, dateEnd, strict) {
            //метод реализует поиск по школе при необязательных параметрах даты
            //проверка для всех привязанных школ
            return this._lectures.filter(function (lecture) {
                if (lecture.checkBySchool(schoolName) && !lecture.editing && lecture && lecture.checkByDataRange(dateStart, dateEnd, strict) /*&& lecture.isValid() */) {
                        lecture.isValid();
                        return lecture;
                    }
            });
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

    }, {
        key: "findLecturesByClassroom",
        value: function findLecturesByClassroom(classroom, dateStart, dateEnd, strict) {
            return this._lectures.filter(function (lecture) {
                if (lecture.checkByClassroom(classroom) && !lecture.editing && lecture.checkByDataRange(dateStart, dateEnd, strict) /*&& lecture.isValid() */) {
                        lecture.isValid();
                        return lecture;
                    }
            });
        }
        /**
         * Подсчет количества человек в школах
         * 
         * @param {School|School[]} schools 
         * @returns {Number}
         * 
         * @memberOf Mobilization
         */

    }, {
        key: "_calculateQuantity",
        value: function _calculateQuantity(schools) {
            var quantity = 0;
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
            var quantity = this._calculateQuantity(schools);
            return classroomCapacity >= quantity;
        }
    }]);

    return Mobilization;
}();