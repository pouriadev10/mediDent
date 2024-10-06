const NameHandling = async name => {
  name += "";
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name != 'undefined') {
      if (name == '' || name.length == 0) {
        error.massage = 'this field is required';
        error.status = false;
      } else if (name.length < 3) {
        error.massage = 'enter at least 3 characters';
        error.status = false;
      } else if (name.length >= 128) {
        error.massage = 'maximum length is 128';
        error.status = false;
      } else {
        error.massage = '';
        error.status = true;
      }
    } else {
      error.massage = 'this field is required';
      error.status = false;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }


  return error;
};

const StatementHandling = async name => {
  name += "";
  var error = {
    massage: '',
    status: true,
  };
  console.log("zz")
  console.log(name)
  if (name == "" || name == 'undefined') {
    console.log("zz")
    return error;
  } else {
    console.log("zz")
    if (name) {
      if (name != 'undefined') {
        if (name == '' || name.length == 0) {
          error.massage = 'this field is required';
          error.status = false;
        } else if (name.length < 1) {
          error.massage = 'enter at least 1 characters';
          error.status = false;
        } else if (name.length >= 10) {
          error.massage = 'maximum length is 10';
          error.status = false;
        } else {
          error.massage = '';
          error.status = true;
        }
      } else {
        error.massage = 'this field is required';
        error.status = false;
      }
    } else {
      error.massage = 'this field is required';
      error.status = false;
    }
  }



  return error;
};


const newState = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name == '' || name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name.length != 2) {
      error.massage = 'enter 2 char';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const state = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name == '' || name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    }
    else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const PostalCode = async name => {
  var error = {
    massage: '',
    status: true,
  };
  name += ""
  if (name) {
    if (name == '' || name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name.length != 5) {
      error.massage = 'enter 5 char';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const PhoneHandling = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name == "") {
    error.massage = 'Phone is required';
    error.status = false;
  }
  else if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name.length != 10) {
      error.massage = 'enter valid phone number(len = 10)';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }


  return error;
};
const ssn = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name == "") {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name.length != 4) {
      error.massage = 'enter valid ssn';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }


  return error;
};

const EmailOrPhoneHandling = async (email, phone) => {
  var error = {
    massage: '',
    status: true,
  };
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if ((email == "" || email == null) && (phone == "" || phone == null)) {
    error.massage = 'enter email or phone number';
    error.status = false;
    error.type = "phone"
  }

  else if ((email != "" || email != null) && (phone == "" || phone == null)) {
    if (email) {
      if (email.match(mailformat)) {
        error.massage = '';
        error.status = true;
        error.type = "email"
      } else {
        error.massage = 'enter valid email address';
        error.status = false;
        error.type = "email"
      }
    } else {
      error.massage = 'enter valid email address';
      error.type = "email"
      error.status = false;
    }
  } else if ((email == "" || email == null) && (phone != "" || phone != null)) {

    if (phone.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
      error.type = "phone"
    } else if (phone.length != 10) {
      error.massage = 'enter valid phone number(len = 10)';
      error.type = "phone"
      error.status = false;
    } else {
      error.massage = '';
      error.type = "phone"
      error.status = true;
    }

  } else {
    if (email) {
      if (email.match(mailformat)) {
        error.massage = '';
        error.status = true;
        error.type = "email"

        if (phone.length == 0) {
          error.massage = 'this field is required';
          error.status = false;
          error.type = "phone"
        } else if (phone.length != 10) {
          error.massage = 'enter valid phone number(len = 10)';
          error.type = "phone"
          error.status = false;
        } else {
          error.massage = '';
          error.type = "phone"
          error.status = true;
        }

      } else {
        error.massage = 'enter valid email address';
        error.status = false;
        error.type = "email"
      }
    } else {
      error.massage = 'enter valid email address';
      error.type = "email"
      error.status = false;
    }



  }



  return error;
};

const EmailHandling = async name => {
  var error = {
    massage: '',
    status: true,
  };
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (name == "") {
    error.massage = 'E-mail is required';
    error.status = false;
  }
  else if (name) {
    if (name.match(mailformat)) {
      error.massage = '';
      error.status = true;
    } else {
      error.massage = 'enter valid email address';
      error.status = false;
    }
  } else {
    error.massage = 'enter valid email address';
    error.status = false;
  }

  return error;
};

const AmountHandling = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (isNaN(name)) {
    error.massage = 'Enter a number';
    error.status = false;
    return error
  }

  name = eval(name);
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name <= 1) {
      error.massage = 'enter a number greater than 1';
      error.status = false;
    } else if (name >= 10000) {
      error.massage = 'enter a number smaller than 10000$';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};
  
  const PaymentOption = async name => {
    var error = {
      massage: '',
      status: true,
    };
    if (name = "") {
      error.massage = 'Select one ';
      error.status = false;
      return error
    }
  name = eval(name);

  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name <= 1) {
      error.massage = 'enter a number greater than 1';
      error.status = false;
    } else if (name >= 10000) {
      error.massage = 'enter a number smaller than 10000$';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const PercentHandling = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (isNaN(name)) {
    error.massage = 'Enter a number';
    error.status = false;
    return error
  }

  name = eval(name);

  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (isNaN(name)) {
      error.massage = 'Please enter Numeric value';
      error.status = false;

    } else if (name <= 0) {
      error.massage = 'enter a number greater than 0%';
      error.status = false;
    } else if (name > 100) {
      error.massage = 'enter a number smaller than 100%';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const TermHandling = async name => {
  name = eval(name);
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (name <= 0) {
      error.massage = 'enter a number greater than 0';
      error.status = false;
    } else if (name > 100) {
      error.massage = 'enter a number smaller than 500';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const MemberHandling = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'SELECT ANY MEMBER';
      error.status = false;
    }
  } else {
    error.massage = 'SELECT ANY MEMBER';
    error.status = false;
  }

  return error;
};
const DateHandling = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};
const SelectItem = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {

    if (name.length == 0) {

      error.massage = 'Select any item';
      error.status = false;
    }

  }


  else {

    error.massage = 'Select any item';
    error.status = false;
  }

  return error;
};
const UploadFileIMG = async name => {
  var error = {
    massage: 'Select any image',
    status: false
  };
  if (name)
    var error = {
      massage: '',
      status: true,
    };
  if (name) {
    if (name.name.search(".jpg") == -1 && name.name.search(".png") == -1) {
      error.massage = 'Select *.jpg or *.png File';
      error.status = false;
    }
  } else {
    error.massage = 'Select any image';
    error.status = false;
  }

  return error;
};
const UploadFilePDF = async name => {
  if (name)
    var error = {
      massage: '',
      status: true,
    };
  if (name) {
    if (name.name.search(".pdf") == -1) {
      error.massage = 'Select PDF File';
      error.status = false;
    }
  } else {
    error.massage = 'Select any file';
    error.status = false;
  }

  return error;
};

const PasswordHandling = async name => {

  name = name + ""

  var error = {
    massage: '',
    status: true,
  };

  if (name != 'undefined') {


    if (name == '' || name.length == 0) {

      error.massage = 'this field is required';
      error.status = false;
    } else if (name.length < 8) {

      error.massage = 'enter at least 8 characters';
      error.status = false;
    } else if (name.length >= 128) {

      error.massage = 'maximum length is 128';
      error.status = false;
    } else {

      error.massage = '';
      error.status = true;
    }
  } else {

    error.massage = 'this field is required';
    error.status = false;
  }

  if (name.length == 3) {
    error.massage = '';
    error.status = true;
  }

  return error;
};


const BirthDateHandling = async name => {
  var error = {
    massage: '',
    status: true,
  };

  if (name) {

    var year = name.split("-")[0]
    var month = name.split("-")[1]
    var day = name.split("-")[2]


    const age = new Date().getFullYear() - year;
    if (name == '' || name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    } else if (age <= 18) {
      error.massage = 'Enter a valid birthDate';
      error.status = false;
    } else if ((age) >= 100) {
      error.massage = 'Enter a valid birthDate';
      error.status = false;
    } else {
      error.massage = '';
      error.status = true;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const BankAccounts = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    }
    if (isNaN(name)) {
      error.massage = 'value should be a number';
      error.status = false;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

const StatementValid = async name => {
  var error = {
    massage: '',
    status: true,
  };
  if (name) {
    if (name.length == 0) {
      error.massage = 'this field is required';
      error.status = false;
    }
    if (name.length < 5) {
      error.massage = 'this field needs to be at least 5 chars.';
      error.status = false;
    }
  } else {
    error.massage = 'this field is required';
    error.status = false;
  }

  return error;
};

export const Error = {
  NameHandling,
  PhoneHandling,
  EmailHandling,
  AmountHandling,
  PercentHandling,
  TermHandling,
  MemberHandling,
  PasswordHandling,
  ssn,
  state,
  BirthDateHandling,
  PostalCode,
  SelectItem,
  UploadFilePDF,
  UploadFileIMG,
  DateHandling,
  BankAccounts,
  StatementValid,
  StatementHandling,
  EmailOrPhoneHandling,
  PaymentOption
};