
class Calendar {

    constructor() {
        this.DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        this.MONTHS = ["January", "February", "March", "April"
            , "May", "June", "July", "August", "September", "October"
            , "November", "December"];
    }

    getDateFromStr(str) {
        var y = Number.parseInt(str.substring(0, 4));
        var m = Number.parseInt(str.substring(4, 6));
        var d = Number.parseInt(str.substring(6, 8));

        var date = new Date(y, m - 1, d, 1, 1, 1);
        return date;
    }

    // return "20180718"
    getDateStr(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        if (m < 10) {
            m = "0" + m;
        }
        if (d < 10) {
            d = "0" + d;
        }
        return y + m + d;
    }


    getDayName(date) {
        return this.DAYS[date.getDay()];
    }

    getMonthArr(month = null, year = null) {
        if (month == null || year == null) {
            var now = new Date();

            if (year == null) {
                year = now.getFullYear();
            }

            if (month == null) {
                month = now.getMonth() + 1;
            }
        }

        var res = [];
        var day = 1;
        while (day <= 31) {
            var date = new Date(year, month - 1, day);
            var monthTemp = date.getMonth();
            if (monthTemp == month - 1) {
                res.push(date);
            }
            day++;
        }
        return res;
    }


    // return by calendar weeks start from monday
    getMonthArrByWeek(month = null, year = null) {
        var dates = this.getMonthArr(month, year);

        var res = [];
        var week = [];

        var countInWeek = 1;
        //first day
        var cur = dates[0].getDay();

        for (var i in dates) {
            countInWeek++;

            var d = dates[i];
            var day = d.getDay();

            if (day == cur) {
                week.push(d);
            }


            // create new row
            if (day == 0 || i == dates.length - 1) {
                //fill empty
                if (countInWeek < 8) {
                    for (var k = 0; k < 8 - countInWeek; k++) {
                        // first week
                        if (res.length <= 1) {
                            week.unshift(null);
                        }
                        // last week
                        else {
                            week.push(null);
                        }
                    }
                }

                if (day != cur) {
                    week.push(d);
                }

                res.push(Object.assign(week, {}));

                week = [];
                cur = 1;
                countInWeek = 1;
                continue;
            }

            cur++;
        }

        return res;
    }

}

export default new Calendar();

//var calendar = new Calendar();


// var month = calendar.getMonthArr(5);

// for (var i in month) {
//     var d = month[i];
//     console.log(calendar.getDayName(d), calendar.getDateStr(d));
// }