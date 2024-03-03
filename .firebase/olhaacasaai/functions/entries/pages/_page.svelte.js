import { c as create_ssr_component, d as each, f as add_attribute, e as escape } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let userData = [];
  return `${$$result.head += `<!-- HEAD_svelte-t32ptj_START -->${$$result.title = `<title>Home</title>`, ""}<meta name="description" content="Svelte demo app"><!-- HEAD_svelte-t32ptj_END -->`, ""} ${userData.length > 0 ? `<ul>${each(userData, (user) => {
    return `<li><img${add_attribute("src", user.profile_picture, 0)}${add_attribute("alt", user.nickname, 0)}> <p>Nickname: ${escape(user.nickname)}</p> <p>Biografia: ${escape(user.biography)}</p> <p>Data de criação: ${escape(user.created)}</p> </li>`;
  })}</ul>` : `<p data-svelte-h="svelte-ke524t">Aguardando dados...</p>`}`;
});
export {
  Page as default
};
