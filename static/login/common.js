function storeToken(token) {
    const date = new Date()

    date.setMonth(date.getMonth() + 1)

    const expires = "expires=" + date.toUTCString()

    document.cookie = `token=${token}; ` + expires + "; path=/; SameSite=Lax"
}

function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    // Does this cookie string begin with the name we want?
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }

  return null;
}