
// ----------------------------------------------------------------Tooltip-------------------------------------------------------------------

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
// ----------------------------------------------------------------File Upload-----------------------------------------------------------
$(document).ready(function () {
    var $group = $('.input-group');
    var $file = $group.find('input[type="file"]')
    var $browse = $group.find('[data-action="browse"]');
    var $fileDisplay = $group.find('[data-action="display"]');
    var $reset = $group.find('[data-action="reset"]');


    var resetHandler = function (e) {
        if ($file.length === 0) {
            return;
        }

        $file[0].value = '';
        if (!/safari/i.test(navigator.userAgent)) {
            $file[0].type = '';
            $file[0].type = 'file';
        }
        $file.trigger('change');
    };

    var browseHandler = function (e) {
        //If you select file A and before submitting you edit file A and reselect it it will not get the latest version, that is why we  might need to reset.
        //resetHandler(e);
        $file.trigger('click');

    };

    $browse.on('click', function (e) {
        if (event.which != 1) {
            return;
        }
        browseHandler();
    });
    $fileDisplay.on('click', function (e) {
        if (event.which != 1) {
            return;
        }
        browseHandler();
    });
    $reset.on('click', function (e) {
        if (event.which != 1) {
            return;
        }

        resetHandler();
    });

    $file.on('change', function (e) {
        var files = [];
        if (typeof e.currentTarget.files) {
            for (var i = 0; i < e.currentTarget.files.length; i++) {
                files.push(e.currentTarget.files[i].name.split('\\/').pop())
            }
        } else {
            files.push($(e.currentTarget).val().split('\\/').pop())
        }
        $fileDisplay.val(files.join('; '))
    })
});
// ----------------------------------------------------------------Range Slider-----------------------------------------------------------
const inputElements = document.querySelectorAll('[type="range"]');

const handleInput = (inputElement) => {
    let isChanging = false;

    const setCSSProperty = () => {
        const percent =
            ((inputElement.value - inputElement.min) /
                (inputElement.max - inputElement.min)) *
            100;
        inputElement.style.setProperty("--webkitProgressPercent", `${percent}%`);
    }

    // Set event listeners
    const handleMove = () => {
        if (!isChanging) return;
        setCSSProperty();
    };
    const handleUpAndLeave = () => isChanging = false;
    const handleDown = () => isChanging = true;

    inputElement.addEventListener("mousemove", handleMove);
    inputElement.addEventListener("mousedown", handleDown);
    inputElement.addEventListener("mouseup", handleUpAndLeave);
    inputElement.addEventListener("mouseleave", handleUpAndLeave);
    inputElement.addEventListener("click", setCSSProperty);

    // Init input
    setCSSProperty();
}

inputElements.forEach(handleInput)

// ----------------------------------------------------------------Datepicker-----------------------------------------------------------
$(function () {
    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    });
});



// ----------------------------------------------------------------Day View-----------------------------------------------------------
function updateClock() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
  
    // Compose the string for display
    var currentTimeString = currentHours + ":" + currentMinutes;
  
    $("#clock").html(currentTimeString);
  
    var position = $("#selectable").position();
    var hour_height = 46;
    var hour_offset = parseInt(currentHours) - 7;
    var hour_pos = hour_height * hour_offset;
    var min_height = hour_height / 60;
    var min_pos = Math.round(parseInt(currentMinutes) * min_height);
    var new_pos = parseInt(position.top) + hour_pos + min_pos;
    console.log(new_pos);
    $("#time_hr").css({
      top: new_pos + 'px'
    });
  }
  
  $(function() {
    updateClock();
    setInterval('updateClock()', 60000);
    var currentCol;
    var date;
    var hrs = [];
  
    $("#selectable").selectable({
      filter: "td div.available",
      start: function(event, ui) {
        $("td").removeClass("ui-selected");
      },
      stop: function(event, ui) {
        $('td div.available.ui-selected').each(function() {
          date = $(this).attr('data-date');
          var hr = $(this).closest('tr').attr('data-hour');
          hrs.push(hr);
        });
        if ($('td div.available.ui-selected').length > 0) {
          var min = Math.min.apply(Math, hrs);
          $("#result").html(date + " - " + hrs);
        }
        //Reset selector. 
        currentCol = undefined;
      },
      selecting: function(event, ui) {
        hrs = [];
        if (currentCol === undefined) {
          currentCol = $(ui.selecting).closest('td').attr('data-col');
        }
        $("td div.available.ui-selecting").closest("td:not([data-col=" + currentCol + "])").each(function() {
          $(this).closest("div.available.ui-selecting").removeClass("ui-selecting");
        });
      }
    });
  });
// -----------------------------------------------------------Month Calendar---------------------------------------------------------------------
/*calendar*/
$(function() {
    $("#monthCalendar").datepicker({
      inline: true,
      showOtherMonths: true,
      selectOtherMonths: false,
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    });
  });
