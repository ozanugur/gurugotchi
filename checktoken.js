const fetch = require('node-fetch');

async function checkToken(accessToken) {
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
  const data = await response.json();

  if (response.ok) {
    console.log('Token is valid:', data);
  } else {
    console.error('Error validating token:', data);
  }
}

// Replace with your access token
const accessToken = 'ya29.c.c0AY_VpZhannH4tu6SMCMV5SwEMe-R6G4whrQ06O_89GeE8GYeRdeic3RCZ-QvSrh8ML7LIE-yAXYdg_KGjvutsU13QeIShJMt6cbfx5CORtFj2oe5VI8H8OgztEHapdQK2ZsGyg10V_npVnAfj5VDL8XC9flYDnGaMbFXgFXPVs1uyJIc-CQJI6esLPhuWfxvfDRkrcZ8YrGKoFqC8eFBkBoA0wnxn5zp0nljgLrKXjIRLQcznf2oe2IdCOAp2bZXjJ0UnIxzgZhjqPmdMiYW_NWRncBL3ZXjra4ylIDAgCsnDAe8R0O3ZJXdhTphMhuUmswh91wm2iW5s0W_Uvppx-zM40h_mPO4gWjPeunYkRZe7EPoV9M5XjEE384Cy8FlBui-BVYvStr1X2-_dxy1hMx373qIa-i0t7eyejYBjRdZYJWV_bIYuu6Jh3r80dZ7B391n6fIrkkWJ0FXm0QZyIkxy8hrY_cI9qRdm5X6uOXuxk_Ixj_2kB9-9by-47Ih2v1xnMryiukdX5sIIw3VZ1glYozt0nltyc0y5WpiaoW5i5XX-V_fgdi_alngOl-Fc8Xk42yucFraFUM9MQv6YRQIjvzJidOfYj_Zv6FhajuOdMvs4bx9f1729QoromqdcQjikSSc-uS6z015dc42Vw7Sa3axUVkpw3OFqV8sdQYZqf8d2BFs28FQOW8UUg2cRFpxVVagvOs_uv0I5hj-58ycr5oiMmBYjcSSikJlbQzOqsWnBoqmv2f4ytfWl8mrqUabWUofUvhUge9_XW-w3_2fqumQx3m6Fok7I9aqFQjlmaIkFZkv_be24pYkJj4BoxM0rb1if6vsBZnz-g1zocuk5ZrZVr6bkv8ljc_3xrdYoOWyOUbWVvRBm8uIU8fvwwm-ouaqrZsyptufZtnVXvWkkQjZ_8OukB08z6crMjxanf1dfX98xn9MvMldJ7WVqYvwtz1o_ez2ut8ZruWOX5BZyY-fs5xjpjIlVnl1mi7eaQXyfcak8lq';
checkToken(accessToken);
