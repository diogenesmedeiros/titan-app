import { c as create_ssr_component, f as add_attribute } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email;
  let password;
  return `${$$result.head += `<!-- HEAD_svelte-1ds1qyu_START -->${$$result.title = `<title>About</title>`, ""}<meta name="description" content="About this app"><!-- HEAD_svelte-1ds1qyu_END -->`, ""} <form><label for="email" data-svelte-h="svelte-iu7ao8">email:</label> <input type="email" id="email"${add_attribute("value", email, 0)}> <label for="password" data-svelte-h="svelte-s76q14">password:</label> <input type="password" id="password"${add_attribute("value", password, 0)}> <button type="submit" data-svelte-h="svelte-1sqbsai">Enviar</button></form>`;
});
export {
  Page as default
};
