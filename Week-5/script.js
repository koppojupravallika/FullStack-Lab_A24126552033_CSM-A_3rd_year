let loginForm = document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();


        let username =
            document.getElementById("username").value.trim();

        let password =
            document.getElementById("password").value.trim();

        let error =
            document.getElementById("error");



        if (username === "" || password === "") {

            error.innerHTML =
                "Please enter username and password.";

            return;

        }


        if (username === "admin" && password === "1234") {

            window.location.href = "success.html";

        }

        else {

            error.innerHTML =
                "Invalid username or password.";

        }

    });

}






/* Get current date and time */

let loginTime =
    document.getElementById("loginTime");


if (loginTime) {

    let now = new Date();

    loginTime.innerHTML =
        now.toLocaleString();

}




let greetingElement =
    document.getElementById("greeting");


if (greetingElement) {

    let currentHour =
        new Date().getHours();

    let greeting;


    if (currentHour < 12) {

        greeting = "Good Morning";

    }

    else if (currentHour < 17) {

        greeting = "Good Afternoon";

    }

    else if (currentHour < 21) {

        greeting = "Good Evening";

    }

    else {

        greeting = "Good Night";

    }


    greetingElement.innerHTML =
        greeting;

}




let timerElement =
    document.getElementById("timer");


if (timerElement) {

    let time = 30;


    let countdown =
        setInterval(function() {

            time--;

            timerElement.innerHTML =
                time;


            /* When timer reaches zero */

            if (time <= 0) {

                clearInterval(countdown);

                window.location.href =
                    "login.html";

            }

        }, 1000);



    
    let backButton =
        document.getElementById("backLoginButton");


    if (backButton) {

        backButton.addEventListener(
            "click",
            function() {

                clearInterval(countdown);

                window.location.href =
                    "login.html";

            }
        );

    }

}
