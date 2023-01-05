const ethRPC = 'https://mainnet.infura.io/v3/e3706a59ed38418095f619d56df648e0'
function sleep(milisecs) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, milisecs);
    })
}

function randomOTP() {
    const n = Math.random() * 10000
    return Math.floor(n)
}
var optCode = 0;

$(document).ready(() => {
    const w3 = new Web3(web3?.currentProvider || ethRPC)

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation');

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms).forEach((form) => {
        form.addEventListener('submit', (event) => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    $("#input-address").on("input", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const value = $(this).val()
        if (w3.utils.isAddress(value)) {
            $('#input-address-feedback').text('')
            $('#input-address-feedback').addClass('valid-feedback')
            $('#input-address-feedback').removeClass('invalid-feedback')
            e.target.setCustomValidity('')
        } else {
            $('#input-address-feedback').text('Invalid Address!')
            $('#input-address-feedback').addClass('invalid-feedback')
            $('#input-address-feedback').removeClass('valid-feedback')
            e.target.setCustomValidity('Invalid Address')
        }
    });
    $("#input-amount").on("input", function (e) {
        e.preventDefault();
        e.stopPropagation();
        const value = $(this).val()
        if(isNaN(+value)) {
            $('#input-otp-feedback').text('Invalid amount')
            $('#input-amount-feedback').addClass('invalid-feedback')
            $('#input-amount-feedback').removeClass('valid-feedback')
            e.target.setCustomValidity('Amount should be number')
        } else {
            $('#input-amount-feedback').text('')
            $('#input-amount-feedback').addClass('valid-feedback')
            $('#input-amount-feedback').removeClass('invalid-feedback')
            e.target.setCustomValidity('')
        }
    });
    $('#input-otp').on('input', function (e) {
        const value = $(this).val()
        if(value != optCode) {
            $('#input-otp-feedback').text('Invalid OTP code!')
            $('#input-otp-feedback').addClass('invalid-feedback')
            $('#input-otp-feedback').removeClass('valid-feedback')
            e.target.setCustomValidity('Invalid OTP code!')
        } else {
            $('#input-otp-feedback').text('')
            $('#input-otp-feedback').addClass('valid-feedback')
            $('#input-otp-feedback').removeClass('invalid-feedback')
            e.target.setCustomValidity('')
        }
        e.preventDefault();
        e.stopPropagation();
    })
    $('#transaction-form').submit(async function (e) {
        if (e.target.checkValidity()) {
            $('#transaction-form-loading-spineer').removeClass('visually-hidden')
            $('#transaction-form > button[type=submit]').hide()

            await sleep(2000)
            $('#transaction-form-loading-spineer').addClass('visually-hidden')
            $('#transaction-form > button[type=submit]').show()
            optCode = randomOTP()
            await sleep(700)
            alert('Your OPT is ' + optCode)
            $(this).addClass('d-none')
            $('#otp-form').removeClass('d-none')
        }
    })
    $('#otp-form').submit(async function (e) {
        if (!this.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            $('#otp-form-loading-spineer').removeClass('visually-hidden')
            $('#otp-form > button[type=submit]').hide()
            await sleep(2000)
            alert('Amount has been sent successfully.')
            $('#otp-form-loading-spineer').addClass('visually-hidden')
            $('#otp-form > button[type=submit]').show()
        }
    })
})
