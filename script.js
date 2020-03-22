const getDOM = selector => () => {
  return document.querySelector(selector);
};

// Values DOM nodes
const dom = {
  main: {
    name: getDOM('#main #name'),
    mail: getDOM('#main #mail'),
    img: getDOM('#main #img'),
    role: getDOM('#main #role'),
    connects: getDOM('#main #connects'),
    links: getDOM('#main #links')
  },
  projects: getDOM('#projects'),
  logo: getDOM('#projects-page #logo')
};

function assignDOM(dom, value, options) {
  console.log('dom, value, img:', dom, value, img);

  if (options?.isImg) {
    dom.src = value;
    return;
  }

  if (options?.isAdjacent) {
    dom.insertAdjacentHTML('afterbegin', value);
  }

  dom.innerHTML = value;
}

// Assigning

// MAIN

assignDOM(dom.main.name(), main.name);
assignDOM(dom.main.mail(), main.mail);
dom.main.mail().href = `mailto:${main.mail}?Subject=Hello%20again`;
assignDOM(dom.main.img(), main.img, { isImg: true });
assignDOM(dom.main.role(), main.role);
// assignDOM(dom.main.links(), main.links)

// External Links (ICONS)
const connectsDOM = main.connects
  .map(
    ({ name, iconName, link }) =>
      `<a href=${link} target="_blank"><ion-icon name="${iconName}" title="${name}"></ion-icon></a>`
  )
  .join('\n');
assignDOM(dom.main.connects(), connectsDOM);

// Internal Links
const getLinks = links =>
  links
    .map(({ name, link }) => `<a href="${link}" class="text-pink-500" >${name}</a>`)
    .map((link, index, links) => index === links.length - 1 ? link: `${link} - `)
    .join('\n');
assignDOM(dom.main.links(), getLinks(main.links));

// PROJECTS
dom.logo().insertAdjacentHTML('afterbegin', `<img src=${main.img} class="rounded-lg m-5 p-1" />`);

function getProject(heading, desc, img, links) {
  const projectDOM = [];

  const linksHTML = getLinks(links);
  const headingDOM = `<h1>${heading}</h1>`;
  const descDOM = `<p>${desc}</p>`;
  const imgDOM = `<img src=${img} />`;

  projectDOM.push('<div class="h-screen bg-pink-500">', imgDOM, headingDOM, descDOM, linksHTML, '</div>');

  dom.projects().insertAdjacentHTML('afterbegin', projectDOM.join('\n'));
}

projects.forEach(({ img, heading, description, links }) =>
  getProject(heading, description, img, links)
);
