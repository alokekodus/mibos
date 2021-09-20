// Phone number validation
(function ($) {
  $.fn.inputFilter = function (inputFilter) {
    return this.on(
      "input keydown keyup mousedown mouseup select contextmenu drop",
      function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        }
      }
    );
  };
})(jQuery);

$(document).ready(function () {
      
  // Phone only accepts number
  $("#phone").inputFilter(function (value) {
    return (
      /^\d*$/.test(value) && (value === "" || parseInt(value) <= 9999999999)
    );
  });

  //   Wow initiate
  new WOW().init();

  // Form submit script
  $("#contactForm").validate({
    rules: {
      name: "required",
      email: "required",
      phone: "required",
      message: "required",
    },
    messages: {
      name: "Name required",
      email: "Email required",
      phone: "Phone number required",
      message: "Message required",
    },
    errorElement: "em",
    errorPlacement: function (error, element) {
      // Add the `invalid-feedback` class to the error element
      error.addClass("invalid-feedback");
      error.insertAfter(element);
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass("is-invalid").removeClass("is-valid");
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).addClass("is-valid").removeClass("is-invalid");
    },

    // Submit form using AJAX
    submitHandler: function (form) {},
  });
});
