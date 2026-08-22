/* =====================================================
   AOKIRA CYBER SECURITY
   MAIN JAVASCRIPT
===================================================== */

"use strict";


/* =====================================================
   HELPER
===================================================== */

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);


/* =====================================================
   LOADING SCREEN
===================================================== */

let loading = 0;

const loadingBar = $("#loadingBar");
const loadingPercent = $("#loadingPercent");

const loadingInterval = setInterval(() => {

    loading += Math.floor(Math.random() * 8) + 2;

    if (loading >= 100) {
        loading = 100;
        clearInterval(loadingInterval);

        setTimeout(() => {
            $("#loadingScreen").style.opacity = "0";
            $("#loadingScreen").style.pointerEvents = "none";

            setTimeout(() => {
                $("#loadingScreen").remove();
            }, 700);

        }, 400);
    }

    loadingBar.style.width = loading + "%";
    loadingPercent.textContent = loading + "%";

}, 80);


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingElement = $("#typingText");

const typingWords = [
    "SECURE YOUR DIGITAL FUTURE.",
    "DETECT THREATS BEFORE THEY STRIKE.",
    "MONITOR. PROTECT. DEFEND.",
    "WELCOME TO THE AOKIRA NETWORK."
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWriter() {

    const word = typingWords[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            word.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === word.length) {

            deleting = true;

            setTimeout(typeWriter, 1800);

            return;
        }

    } else {

        typingElement.textContent =
            word.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex =
                (wordIndex + 1) % typingWords.length;
        }
    }

    setTimeout(
        typeWriter,
        deleting ? 35 : 65
    );
}

typeWriter();


/* =====================================================
   PAGE NAVIGATION
===================================================== */

const welcomePage = $("#welcomePage");
const securityPage = $("#securityPage");

$("#enterSystem").addEventListener("click", () => {

    welcomePage.classList.add("hidden");

    securityPage.classList.add("visible");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    showNotification(
        "AOKIRA SECURITY SYSTEM INITIALIZED"
    );

    startCounters();

});


$("#backHome").addEventListener("click", () => {

    securityPage.classList.remove("visible");

    welcomePage.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


$("#learnMore").addEventListener("click", () => {

    $("#enterSystem").click();

});


/* =====================================================
   DASHBOARD NAVIGATION
===================================================== */

$$(".dashboard-link").forEach(button => {

    button.addEventListener("click", () => {

        $$(".dashboard-link").forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        $$(".dashboard-section").forEach(section => {
            section.style.display = "none";
        });

        const target =
            $("#" + button.dataset.target);

        if (target) {
            target.style.display = "block";

            target.classList.remove("reveal");

            void target.offsetWidth;

            target.classList.add("reveal");
        }

    });

});


/* =====================================================
   CLOCK
===================================================== */

function updateClock() {

    const now = new Date();

    const time =
        now.toLocaleTimeString(
            "en-US",
            {
                hour12: false
            }
        );

    const date =
        now.toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

    $("#clock").textContent = time;
    $("#dateDisplay").textContent = date;
}

setInterval(updateClock, 1000);
updateClock();


/* =====================================================
   COUNTERS
===================================================== */

function startCounters() {

    $$(".counter").forEach(counter => {

        if (counter.dataset.started) return;

        counter.dataset.started = "true";

        const target =
            Number(counter.dataset.value);

        let current = 0;

        const step =
            Math.max(1, Math.floor(target / 60));

        const interval = setInterval(() => {

            current += step;

            if (current >= target) {
                current = target;
                clearInterval(interval);
            }

            counter.textContent =
                current.toLocaleString();

        }, 25);

    });


    const circle = $("#scoreProgress");

    setTimeout(() => {

        const circumference = 2 * Math.PI * 80;

        const percent = 98;

        circle.style.strokeDashoffset =
            circumference -
            circumference * percent / 100;

    }, 300);
}


/* =====================================================
   NETWORK ACTIVITY
===================================================== */

function updateNetwork() {

    const value =
        Math.floor(
            Math.random() * 45 + 45
        );

    $("#networkValue").textContent =
        value + "%";

    $("#activityProgress").style.width =
        value + "%";

}

setInterval(updateNetwork, 1800);


/* =====================================================
   THREAT MONITOR
===================================================== */

function updateThreat() {

    const levels = [
        {
            name: "LOW",
            color: "#00ff88"
        },
        {
            name: "MEDIUM",
            color: "#ffd166"
        },
        {
            name: "LOW",
            color: "#00ff88"
        },
        {
            name: "LOW",
            color: "#00ff88"
        }
    ];

    const level =
        levels[
            Math.floor(
                Math.random() * levels.length
            )
        ];

    const element = $("#threatLevel");

    element.textContent =
        level.name;

    element.style.color =
        level.color;

}

setInterval(updateThreat, 3000);


/* =====================================================
   SECURITY EVENTS
===================================================== */

const securityEvents = [
    "Firewall packet inspection completed.",
    "Encrypted network connection verified.",
    "Suspicious traffic blocked.",
    "Malware database synchronized.",
    "Network integrity check completed.",
    "Security protocol heartbeat received.",
    "Unauthorized port scan blocked.",
    "System vulnerability check completed.",
    "Encryption protocol verified.",
    "Threat intelligence updated."
];

function addSecurityEvent(
    text = null,
    type = ""
) {

    const log = $("#eventLog");

    const item =
        document.createElement("div");

    item.className =
        "event-item " + type;

    const time =
        new Date().toLocaleTimeString(
            "en-US",
            {
                hour12: false
            }
        );

    item.innerHTML = `
        <span class="event-time">
            [${time}]
        </span>
        ${text || securityEvents[
            Math.floor(
                Math.random() * securityEvents.length
            )
        ]}
    `;

    log.prepend(item);

    while (log.children.length > 8) {
        log.lastElementChild.remove();
    }
}

for (let i = 0; i < 4; i++) {
    addSecurityEvent();
}

setInterval(() => {
    addSecurityEvent();
}, 2500);


/* =====================================================
   CLEAR EVENTS
===================================================== */

$("#clearEvents").addEventListener(
    "click",
    () => {

        $("#eventLog").innerHTML = "";

        showNotification(
            "SECURITY EVENT LOG CLEARED"
        );

    }
);


/* =====================================================
   PASSWORD STRENGTH
===================================================== */

const passwordInput =
    $("#passwordInput");

passwordInput.addEventListener(
    "input",
    checkPasswordStrength
);

function checkPasswordStrength() {

    const password =
        passwordInput.value;

    let score = 0;

    if (password.length >= 8)
        score += 25;

    if (password.length >= 12)
        score += 20;

    if (/[A-Z]/.test(password))
        score += 15;

    if (/[a-z]/.test(password))
        score += 15;

    if (/[0-9]/.test(password))
        score += 10;

    if (/[^A-Za-z0-9]/.test(password))
        score += 15;

    score = Math.min(score, 100);

    $("#strengthProgress").style.width =
        score + "%";

    let text = "VERY WEAK";

    if (score >= 25)
        text = "WEAK";

    if (score >= 50)
        text = "MEDIUM";

    if (score >= 75)
        text = "STRONG";

    if (score >= 90)
        text = "VERY STRONG";

    $("#strengthText").textContent =
        password
            ? `${text} — ${score}%`
            : "Waiting for password...";

}


/* =====================================================
   SHOW PASSWORD
===================================================== */

$("#showPassword").addEventListener(
    "click",
    () => {

        if (
            passwordInput.type ===
            "password"
        ) {

            passwordInput.type =
                "text";

            $("#showPassword i").className =
                "fa-solid fa-eye-slash";

        } else {

            passwordInput.type =
                "password";

            $("#showPassword i").className =
                "fa-solid fa-eye";
        }

    }
);


/* =====================================================
   PASSWORD GENERATOR
===================================================== */

function generateSecurePassword(length = 20) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "0123456789" +
        "!@#$%^&*()_+-=[]{}<>?";

    let password = "";

    const random =
        new Uint32Array(length);

    crypto.getRandomValues(random);

    random.forEach(number => {

        password +=
            chars[number % chars.length];

    });

    return password;
}


$("#generatePassword").addEventListener(
    "click",
    () => {

        const password =
            generateSecurePassword();

        $("#generatedPassword")
            .textContent = password;

        showNotification(
            "SECURE PASSWORD GENERATED"
        );

    }
);


/* =====================================================
   COPY PASSWORD
===================================================== */

$("#copyPassword").addEventListener(
    "click",
    async () => {

        const password =
            $("#generatedPassword")
                .textContent;

        if (
            password ===
            "CLICK GENERATE"
        ) {

            showNotification(
                "GENERATE A PASSWORD FIRST"
            );

            return;
        }

        try {

            await navigator.clipboard.writeText(
                password
            );

            showNotification(
                "PASSWORD COPIED"
            );

        } catch {

            showNotification(
                "COPY NOT AVAILABLE"
            );

        }

    }
);


/* =====================================================
   SECURITY SCANNER
===================================================== */

let scanning = false;

$("#startScan").addEventListener(
    "click",
    () => {

        if (scanning) return;

        scanning = true;

        const progress =
            $("#scannerProgress");

        const percent =
            $("#scannerPercent");

        let value = 0;

        percent.textContent =
            "SCANNING...";

        const scanMessages = [
            "CHECKING FIREWALL...",
            "CHECKING NETWORK...",
            "CHECKING MALWARE...",
            "CHECKING PORTS...",
            "CHECKING ENCRYPTION...",
            "CHECKING VULNERABILITIES...",
            "FINALIZING..."
        ];

        let messageIndex = 0;

        const interval =
            setInterval(() => {

                value +=
                    Math.floor(
                        Math.random() * 7
                    ) + 2;

                if (value >= 100) {

                    value = 100;

                    clearInterval(interval);

                    progress.style.width =
                        "100%";

                    percent.textContent =
                        "SCAN COMPLETE — SECURE";

                    scanning = false;

                    addSecurityEvent(
                        "Security scan completed. No critical threats found.",
                        ""
                    );

                    showNotification(
                        "SECURITY SCAN COMPLETE"
                    );

                    return;
                }

                progress.style.width =
                    value + "%";

                percent.textContent =
                    scanMessages[
                        messageIndex %
                        scanMessages.length
                    ];

                messageIndex++;

            }, 150);

    }
);


/* =====================================================
   IP CHECK SIMULATOR
===================================================== */

$("#checkIP").addEventListener(
    "click",
    () => {

        const ip =
            $("#ipInput").value.trim();

        const result =
            $("#ipResult");

        if (!ip) {

            result.textContent =
                "PLEASE ENTER AN IP ADDRESS.";

            return;
        }

        const valid =
            /^(\d{1,3}\.){3}\d{1,3}$/.test(ip);

        if (!valid) {

            result.textContent =
                "INVALID IP FORMAT.";

            return;
        }

        result.innerHTML = `
            IP: ${ip}<br>
            STATUS: <span style="color:#00ff88">
            SECURE
            </span><br>
            THREAT SCORE: LOW<br>
            FIREWALL: PROTECTED
        `;

        showNotification(
            "IP SECURITY CHECK COMPLETE"
        );

    }
);


/* =====================================================
   NETWORK SPEED SIMULATOR
===================================================== */

function updateSpeed() {

    const download =
        Math.floor(
            Math.random() * 400 + 100
        );

    const upload =
        Math.floor(
            Math.random() * 100 + 20
        );

    $("#downloadSpeed")
        .textContent =
        download + " Mbps";

    $("#uploadSpeed")
        .textContent =
        upload + " Mbps";
}

setInterval(updateSpeed, 1200);


/* =====================================================
   SYSTEM HEALTH
===================================================== */

function updateHealth() {

    const cpu =
        Math.floor(
            Math.random() * 50 + 20
        );

    const ram =
        Math.floor(
            Math.random() * 35 + 40
        );

    const disk =
        Math.floor(
            Math.random() * 25 + 30
        );

    $("#cpuBar").style.width =
        cpu + "%";

    $("#ramBar").style.width =
        ram + "%";

    $("#diskBar").style.width =
        disk + "%";

    $("#cpuText").textContent =
        cpu + "%";

    $("#ramText").textContent =
        ram + "%";

    $("#diskText").textContent =
        disk + "%";
}

setInterval(updateHealth, 1500);

updateHealth();
updateSpeed();


/* =====================================================
   TERMINAL
===================================================== */

const terminalInput =
    $("#terminalInput");

const terminalOutput =
    $("#terminalOutput");

function terminalPrint(text) {

    const line =
        document.createElement("div");

    line.innerHTML = text;

    terminalOutput.appendChild(line);

    terminalOutput.scrollTop =
        terminalOutput.scrollHeight;
}


function executeCommand(command) {

    command =
        command.trim().toLowerCase();

    if (!command) return;

    terminalPrint(
        `<span style="color:#fff">
        aokira@security:~$ ${command}
        </span>`
    );


    switch (command) {

        case "help":

            terminalPrint(
                "Available commands:"
            );

            terminalPrint(
                "help — show commands"
            );

            terminalPrint(
                "status — system status"
            );

            terminalPrint(
                "scan — start simulated scan"
            );

            terminalPrint(
                "network — network status"
            );

            terminalPrint(
                "clear — clear terminal"
            );

            break;


        case "status":

            terminalPrint(
                "FIREWALL: ACTIVE"
            );

            terminalPrint(
                "MALWARE PROTECTION: CLEAN"
            );

            terminalPrint(
                "NETWORK: SECURE"
            );

            terminalPrint(
                "SECURITY SCORE: 98%"
            );

            break;


        case "scan":

            terminalPrint(
                "Initializing security scan..."
            );

            let scanSteps = [
                "Checking firewall...",
                "Checking network...",
                "Checking malware...",
                "Checking vulnerabilities...",
                "Scan complete. No critical threats."
            ];

            scanSteps.forEach(
                (step, index) => {

                    setTimeout(() => {

                        terminalPrint(step);

                    }, 600 * index);

                }
            );

            break;


        case "network":

            terminalPrint(
                "NETWORK STATUS: SECURE"
            );

            terminalPrint(
                "ENCRYPTION: AES-256"
            );

            terminalPrint(
                "FIREWALL: ACTIVE"
            );

            break;


        case "clear":

            terminalOutput.innerHTML =
                "";

            break;


        default:

            terminalPrint(
                `Command not found: ${command}`
            );

            terminalPrint(
                "Type 'help' for available commands."
            );

    }

}


terminalInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            executeCommand(
                terminalInput.value
            );

            terminalInput.value = "";

        }

    }
);


$$(".command-info button").forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                executeCommand(
                    button.dataset.command
                );

            }
        );

    }
);


/* =====================================================
   THEME
===================================================== */

$("#themeButton").addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-theme"
        );

        const icon =
            $("#themeButton i");

        if (
            document.body.classList.contains(
                "light-theme"
            )
        ) {

            icon.className =
                "fa-solid fa-sun";

            showNotification(
                "LIGHT MODE ENABLED"
            );

        } else {

            icon.className =
                "fa-solid fa-moon";

            showNotification(
                "DARK CYBER MODE ENABLED"
            );

        }

    }
);


/* =====================================================
   NOTIFICATION
===================================================== */

let notificationTimer;

function showNotification(message) {

    const notification =
        $("#notification");

    $("#notificationText")
        .textContent = message;

    notification.classList.add("show");

    clearTimeout(notificationTimer);

    notificationTimer =
        setTimeout(() => {

            notification.classList.remove(
                "show"
            );

        }, 3000);
}


/* =====================================================
   MOUSE GLOW
===================================================== */

const mouseGlow =
    $(".mouse-glow");

document.addEventListener(
    "mousemove",
    event => {

        mouseGlow.style.left =
            event.clientX + "px";

        mouseGlow.style.top =
            event.clientY + "px";

    }
);


/* =====================================================
   MATRIX DIGITAL RAIN
===================================================== */

const matrixCanvas =
    $("#matrixCanvas");

const matrixCtx =
    matrixCanvas.getContext("2d");

let matrixWidth;
let matrixHeight;
let matrixColumns;
let matrixDrops;

const matrixCharacters =
    "01アイウエオカキクケコサシスセソAOKIRA<>[]{}";

function resizeMatrix() {

    matrixWidth =
        matrixCanvas.width =
        window.innerWidth;

    matrixHeight =
        matrixCanvas.height =
        window.innerHeight;

    matrixColumns =
        Math.floor(matrixWidth / 15);

    matrixDrops =
        Array(matrixColumns)
            .fill(1);
}

resizeMatrix();

window.addEventListener(
    "resize",
    resizeMatrix
);


function drawMatrix() {

    matrixCtx.fillStyle =
        "rgba(2,5,9,.07)";

    matrixCtx.fillRect(
        0,
        0,
        matrixWidth,
        matrixHeight
    );

    matrixCtx.font =
        "13px monospace";

    matrixCtx.fillStyle =
        "#00f7ff";

    for (
        let i = 0;
        i < matrixDrops.length;
        i++
    ) {

        const char =
            matrixCharacters[
                Math.floor(
                    Math.random() *
                    matrixCharacters.length
                )
            ];

        matrixCtx.fillText(
            char,
            i * 15,
            matrixDrops[i] * 15
        );

        if (
            matrixDrops[i] * 15 >
            matrixHeight &&
            Math.random() > .975
        ) {
            matrixDrops[i] = 0;
        }

        matrixDrops[i]++;
    }

    requestAnimationFrame(drawMatrix);
}

drawMatrix();


/* =====================================================
   NETWORK PARTICLE BACKGROUND
===================================================== */

const networkCanvas =
    $("#networkCanvas");

const networkCtx =
    networkCanvas.getContext("2d");

let particles = [];

function resizeNetwork() {

    networkCanvas.width =
        window.innerWidth;

    networkCanvas.height =
        window.innerHeight;

    particles = [];

    const amount =
        Math.min(
            100,
            Math.floor(
                window.innerWidth /
                12
            )
        );

    for (let i = 0; i < amount; i++) {

        particles.push({
            x: Math.random() *
                networkCanvas.width,

            y: Math.random() *
                networkCanvas.height,

            vx:
                (Math.random() - .5)
                * .5,

            vy:
                (Math.random() - .5)
                * .5,

            size:
                Math.random() * 2 + 1
        });

    }
}

resizeNetwork();

window.addEventListener(
    "resize",
    resizeNetwork
);


function drawNetwork() {

    networkCtx.clearRect(
        0,
        0,
        networkCanvas.width,
        networkCanvas.height
    );


    particles.forEach(
        particle => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;


            if (
                particle.x < 0 ||
                particle.x >
                networkCanvas.width
            ) {
                particle.vx *= -1;
            }


            if (
                particle.y < 0 ||
                particle.y >
                networkCanvas.height
            ) {
                particle.vy *= -1;
            }


            networkCtx.beginPath();

            networkCtx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            networkCtx.fillStyle =
                "#00f7ff";

            networkCtx.fill();

        }
    );


    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );

            if (distance < 130) {

                networkCtx.beginPath();

                networkCtx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                networkCtx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                networkCtx.strokeStyle =
                    `rgba(
                        0,
                        247,
                        255,
                        ${1 - distance / 130}
                    )`;

                networkCtx.lineWidth = .5;

                networkCtx.stroke();

            }

        }

    }

    requestAnimationFrame(drawNetwork);
}

drawNetwork();


/* =====================================================
   KEYBOARD SHORTCUT
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            securityPage.classList.contains(
                "visible"
            )
        ) {

            $("#backHome").click();

        }

        if (
            event.key === "/" &&
            securityPage.classList.contains(
                "visible"
            )
        ) {

            terminalInput.focus();

        }

    }
);


/* =====================================================
   INITIAL SYSTEM MESSAGE
===================================================== */

setTimeout(() => {

    showNotification(
        "AOKIRA SYSTEM READY"
    );

}, 3500);
