export const Sel = {
  nav: {
    login: '#login2',
    logout: '#logout2',
    welcome: '#nameofuser',
    cart: '#cartur',
    home: 'a.nav-link:has-text("Home")',
  },
  cart: {
    row: 'tr.success',
    total: '#totalp',
    deleteBtn: 'a:has-text("Delete")',
    pageWrapper: '#page-wrapper'
  },
  loginModal: {
    root: '#logInModal',
    username: '#loginusername',
    password: '#loginpassword',
    submit: 'button:has-text("Log in")',
    close: '#logInModal button:has-text("Close")',
  },
  product: {
    cards: '#tbodyid .card',
    cardTitle: '#tbodyid .card-block .card-title a',
    next: '#next2',
    prev: '#prev2',
  },
  productDetail: {
    title: '.name',
    addToCart: 'a:has-text("Add to cart")',
  },
} as const;
