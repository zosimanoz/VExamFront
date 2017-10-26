//this code handles the F5/Ctrl+F5/Ctrl+R


const CheckBrowserRefresh = (e) => {
   
    var keycode;
    if (window.event)
        keycode = window.event.keyCode;
    else if (e)
        keycode = e.which;

    console.log('keycode',e)
    switch (keycode) {
        case 116: //F5 button
            e.returnValue = false;
            e.keyCode = 0;
            return false;
        case 82: //R button
            if (e.ctrlKey) {
                e.returnValue = false;
                e.keyCode = 0;
                return false;
            }
    }
}


export default CheckBrowserRefresh;