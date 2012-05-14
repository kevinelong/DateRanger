/***
 * DateRanger.js
 * returns dateRange objects based on input date;
 *      usually NOW e.g.:
 *           var rangeThisWeek = DateRanger.getThisWeek( new Date() );
 */
var DateRanger = {

    rangeTemplate:{
        fromDate:'1999-01-01',
        toDate:'2099-12-12'},

    dayIntegers:{
        SUNDAY:0, MONDAY:1, TUESDAY:2, WEDNESDAY:3, THURSDAY:4, FRIDAY:5, SATURDAY:6},

    periodLengths:{
        WEEK:7, MONTH:30, QUARTER:90, YEAR:365},

    getThisWeekend:function (inputDate) {
        //returns next Friday-Sunday
        var workingDate = new Date(inputDate);
        workingDate.setHours(0, 0, 0, 0);
        var fromDate = new Date(workingDate);
        while (this.dayIntegers.FRIDAY != fromDate.getDay()) {
            fromDate.setDate(fromDate.getDate() + 1);
        }
        var toDate = new Date(fromDate);
        while (this.dayIntegers.SUNDAY != toDate.getDay()) {
            toDate.setDate(toDate.getDate() + 1);
        }
        return {fromDate:fromDate, toDate:toDate};
    },

    getThisMonth:function (inputDate) {
        //returns range from today through last day of month

        var workingDate = new Date(inputDate);
        workingDate.setHours(0, 0, 0, 0);

        var fromDate = new Date(workingDate);
        var toDate = new Date(fromDate);
        var month = workingDate.getMonth();

        while (month == toDate.getMonth()) {
            toDate.setDate(toDate.getDate() + 1);
        }

        toDate.setDate(toDate.getDate() - 1);

        return {fromDate:fromDate, toDate:toDate};
    },

    getThisWeek:function (inputDate) {
        var fromDate = new Date(inputDate);
        fromDate.setHours(0, 0, 0, 0);
        var toDate = new Date(fromDate);
        toDate.setDate(toDate.getDate() + this.periodLengths.WEEK);
        return {fromDate:fromDate, toDate:toDate};
    },


};//END DateRanger

//if (( window.location.toString().indexOf("http") === -1 ) && (console !== undefined)) {

    DateRanger.tests = {
        ThisMonth:function () {
            var testDate = new Date(2012, 5 - 1, 9, 12, 12, 12, 12);
            var result = DateRanger.getThisMonth(testDate);
            var fromString = result.fromDate.toString();
            var toString = result.toDate.toString();
            var fromExpectedString = "Wed May 09 2012 00:00:00 GMT-0700 (Pacific Daylight Time)";
            var toExpectedString = "Thu May 31 2012 00:00:00 GMT-0700 (Pacific Daylight Time)";
            var passed = (fromString == fromExpectedString && toString == toExpectedString );
                console.log("input " + testDate);
                console.log("from " + result.fromDate);
                console.log("to   " + result.toDate);
                console.log('expect "' + fromExpectedString + '"');
                console.log('expect "' + toExpectedString + '"');
            return (passed);
        },
        ThisWeekend:function () {
            var testDate = new Date(2012, 5 - 1, 9, 12, 12, 12, 12);
            var result = DateRanger.getThisWeekend(testDate);
            var fromString = result.fromDate.toString();
            var toString = result.toDate.toString();
            var fromExpectedString = "Fri May 11 2012 00:00:00 GMT-0700 (Pacific Daylight Time)";
            var toExpectedString = "Sun May 13 2012 00:00:00 GMT-0700 (Pacific Daylight Time)";
            var passed = (fromString == fromExpectedString && toString == toExpectedString );
                console.log("input " + testDate);
                console.log("from " + result.fromDate);
                console.log("to   " + result.toDate);
                console.log('expect "' + fromExpectedString + '"');
                console.log('expect "' + toExpectedString + '"');
            return (passed);
        },

        ThisWeekendPathological:function () {
            var testDate = new Date(2012, 12 - 1, 31, 23, 59, 59, 999);
            var result = DateRanger.getThisWeekend(testDate);
            var fromString = result.fromDate.toString();
            var toString = result.toDate.toString();
            var fromExpectedString = "Fri Jan 04 2013 00:00:00 GMT-0800 (Pacific Standard Time)";
            var toExpectedString = "Sun Jan 06 2013 00:00:00 GMT-0800 (Pacific Standard Time)";
            var passed = (fromString == fromExpectedString && toString == toExpectedString );
                console.log("input " + testDate);
                console.log("from " + result.fromDate);
                console.log("to   " + result.toDate);
                console.log('expect "' + fromExpectedString + '"');
                console.log('expect "' + toExpectedString + '"');
            return (passed);
        },

        Week:function () {
            var testDate = new Date(2012, 5 - 1, 9, 12, 12, 12, 12);
            var result = DateRanger.getThisWeek(testDate);
            var fromString = result.fromDate.toString();
            var toString = result.toDate.toString();
            var fromExpectedString = "Wed May 09 2012 00:00:00 GMT-0700 (Pacific Daylight Time)";
            var toExpectedString = "Wed May 16 2012 00:00:00 GMT-0700 (Pacific Daylight Time)";
            var passed = (fromString == fromExpectedString && toString == toExpectedString );
                console.log("input " + testDate);
                console.log("from " + result.fromDate);
                console.log("to   " + result.toDate);
                console.log('expect "' + fromExpectedString + '"');
                console.log('expect "' + toExpectedString + '"');
            return (passed);
        }
    };

    DateRanger.test = function () {
        for (var t in this.tests) {
            console.log((this.tests[t]() ? "PASS" : "FAIL" ) + ":" + t + "\n");
        }
    };

    DateRanger.test();
//};

/*
 input Wed May 09 2012 12:12:12 GMT-0700 (Pacific Daylight Time)
 from Wed May 09 2012 00:00:00 GMT-0700 (Pacific Daylight Time)
 to   Thu May 31 2012 00:00:00 GMT-0700 (Pacific Daylight Time)
 expect "Wed May 09 2012 00:00:00 GMT-0700 (Pacific Daylight Time)"
 expect "Thu May 31 2012 00:00:00 GMT-0700 (Pacific Daylight Time)"
 PASS:ThisMonth

 input Wed May 09 2012 12:12:12 GMT-0700 (Pacific Daylight Time)
 from Fri May 11 2012 00:00:00 GMT-0700 (Pacific Daylight Time)
 to   Sun May 13 2012 00:00:00 GMT-0700 (Pacific Daylight Time)
 expect "Fri May 11 2012 00:00:00 GMT-0700 (Pacific Daylight Time)"
 expect "Sun May 13 2012 00:00:00 GMT-0700 (Pacific Daylight Time)"
 PASS:ThisWeekend

 input Mon Dec 31 2012 23:59:59 GMT-0800 (Pacific Standard Time)
 from Fri Jan 04 2013 00:00:00 GMT-0800 (Pacific Standard Time)
 to   Sun Jan 06 2013 00:00:00 GMT-0800 (Pacific Standard Time)
 expect "Fri Jan 04 2013 00:00:00 GMT-0800 (Pacific Standard Time)"
 expect "Sun Jan 06 2013 00:00:00 GMT-0800 (Pacific Standard Time)"
 PASS:ThisWeekendPathological

 input Wed May 09 2012 12:12:12 GMT-0700 (Pacific Daylight Time)
 from Wed May 09 2012 00:00:00 GMT-0700 (Pacific Daylight Time)
 to   Wed May 16 2012 00:00:00 GMT-0700 (Pacific Daylight Time)
 expect "Wed May 09 2012 00:00:00 GMT-0700 (Pacific Daylight Time)"
 expect "Wed May 16 2012 00:00:00 GMT-0700 (Pacific Daylight Time)"
 PASS:Week
 */