{
    let e = document.getElementById("mtext")
    if (e!=null){
        e.addEventListener('keyup',showdate);
        e.addEventListener('paste', showdate);
        if (e.value===""){
            e.value = new Date().getTime();
            showdate();
            e.focus();
            e.setSelectionRange(0, e.value.length);
        }
    }
}

function showdate() {
    let input = document.getElementById("mtext").value;
    let out = convertToDate(input);
    if (out != "") {
        document.getElementById("result").textContent = out;
    }
    return true;
}
function time_ago(time) {
    switch (typeof time) {
        case 'number':
            break;
        case 'string':
            time = +new Date(time);
            break;
        case 'object':
            if (time.constructor === Date) time = time.getTime();
            break;
        default:
            time = +new Date();
    }
    var time_formats = [
        [60, 'seconds', 1], // 60
        [120, '1 minute ago', '1 minute from now'], // 60*2
        [3600, 'minutes', 60], // 60*60, 60
        [7200, '1 hour ago', '1 hour from now'], // 60*60*2
        [86400, 'hours', 3600], // 60*60*24, 60*60
        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
        [604800, 'days', 86400], // 60*60*24*7, 60*60*24
        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
        token = 'ago',
        list_choice = 1;

    if (seconds == 0) {
        return 'Just now'
    }
    if (seconds < 0) {
        seconds = Math.abs(seconds);
        token = 'from now';
        list_choice = 2;
    }
    var i = 0,
        format;
    while (format = time_formats[i++])
        if (seconds < format[0]) {
            if (typeof format[2] == 'string')
                return format[list_choice];
            else
                return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
        }
    return time;
}

function convertToDate(intext) {
    let inp = intext.match(`(\\d+)`)
    if (inp == null) {
        return "";
    }
    let unit = ""
    inp = inp[1];
    if (inp.length == 19) {
        inp = inp / 1000000;
        unit = "nanoseconds";
    } else if (inp.length == 10) {
        inp = inp * 1000;
        unit = "seconds";
    } else if (inp.length == 13) {
        inp = inp / 1;
        unit = "milliseconds";
    } else {
        let inDate = new Date(intext);
        if (inDate instanceof Date && isNaN(inDate)){
            return "";
        }
        return inDate.getTime();
    }
    let theDate = new Date(inp);
    let dateString = theDate.toUTCString();
    return `${dateString} (${time_ago(theDate)}) unit:${unit}`;
}