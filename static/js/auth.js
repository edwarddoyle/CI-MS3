// SHOW / HIDE PASSWORD ON ICON CLICK
document.querySelectorAll('.icon-eye').forEach(item => {
    item.addEventListener('click', event => {
        let passwordBox = item.previousSibling.previousSibling;
        console.log(passwordBox)
        const type = passwordBox.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordBox.setAttribute('type', type);
        if (item.classList.contains('icon-eye')) {
            item.classList.replace('icon-eye', 'icon-eye-slash');
        } else if (item.classList.contains('icon-eye-slash')) {
            item.classList.replace('icon-eye-slash', 'icon-eye');
        }
    })
})

